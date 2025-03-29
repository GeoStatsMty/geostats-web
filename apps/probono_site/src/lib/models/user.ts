import {cache} from 'react';
import {cookies} from 'next/headers';
import {Prisma, User} from '@prisma/client';
import {type UserInit, type UserUpdate} from '@/lib/schemas/user.ts';
import prisma from '@/lib/prisma.ts';
import {auth0, management} from '@/lib/auth0.ts';
import {
	deleteOrganizations,
	getUsersDependantOrganizations,
} from '@/lib/models/organization.ts';
import OrganizationGetPayload = Prisma.OrganizationGetPayload;

/**
 * Retrieves the active organization for the current user.
 *
 * @async
 * @template Args - The type of arguments for retrieving the organization.
 * @param {Args} [args] - Optional arguments for retrieving the organization.
 * @returns {Promise<OrganizationGetPayload<Args>>} - A promise that resolves with the active organization.
 * @throws {Error} - If the user is not authenticated.
 */
export const getUsersActiveOrganization = cache(
	async <Args extends Omit<Prisma.OrganizationDefaultArgs, 'where'>>(
		args?: Args,
	): Promise<OrganizationGetPayload<Args>> => {
		const session = await auth0.getSession();

		if (!session) {
			throw new Error('Not authenticated');
		}

		const cookieStore = await cookies();

		const organizationId = cookieStore.get('organizationId');

		if (organizationId) {
			const organization = Number.parseInt(organizationId.value, 10);

			const activeOrganization = await prisma.organization.findUnique({
				...args,
				where: {
					id: organization,
					owners: {
						some: {
							authId: session.user.sub,
						},
					},
				},
			});

			if (activeOrganization) {
				return activeOrganization as OrganizationGetPayload<Args>;
			}
		}
		// If we didn't find an organization with the id specified in the cookie associated with this user,
		// lets instead use the first organization we find for this user.

		return (await prisma.organization.findFirstOrThrow({
			...args,
			where: {
				owners: {
					some: {
						authId: session.user.sub,
					},
				},
			},
		})) as OrganizationGetPayload<Args>;
	},
);

export const getOrganizationById = cache(
	async <Args extends Omit<Prisma.OrganizationDefaultArgs, 'where'>>(
		id: number,
		args?: Args,
	): Promise<OrganizationGetPayload<Args> | null> => {
		const organization = await prisma.organization.findUnique({
			...args,
			where: {
				id,
			},
		});

		// Retornar null si no se encuentra la organización
		return organization
			? (organization as OrganizationGetPayload<Args>)
			: null;
	},
);

/**
 * Retrieve user information from Auth0 session.
 *
 * @async
 * @function getUserFromSession
 * @param {Array} args - The optional NextRequest and NextResponse objects to be used for getSession, if available.
 * @returns {Promise<User | null>} - The user object if session exists, otherwise null.
 */
export const getUserFromSession = cache(async () => {
	const session = await auth0.getSession();

	if (!session) {
		return null;
	}

	return prisma.user.findUnique({
		where: {
			authId: session.user.sub,
		},
		include: {
			_count: {
				select: {
					organizations: true,
				},
			},
		},
	});
});

/**
 * Fetches the organizations associated with the current user.
 *
 * @function getCurrentUserOrganizations
 * @async
 * @returns {Promise<Organization[] | null>} - A promise that resolves to an array of organizations or null if the user is not authenticated.
 * @throws {Error} - If the user cannot be found or if an error occurs during the database query.
 */
export const getCurrentUserOrganizations = cache(async () => {
	const session = await auth0.getSession();
	if (!session) {
		return null;
	}

	const user = prisma.user.findUniqueOrThrow({
		where: {
			authId: session.user.sub,
		},
		select: {
			organizations: {
				select: {
					id: true,
					name: true,
					logoUrl: true,
				},
			},
		},
	});

	return user.organizations();
});

/**
 * Creates a new user with the given authId and initialization data.
 *
 * @param {string} authId - The unique identifier of the user in the central authentication system.
 * @param {UserInit} init - The initialization data for the user.
 *
 * @return {Promise<User>} - A promise that resolves with the created user object.
 */
export async function createUser(
	authId: string,
	init: UserInit,
): Promise<User> {
	return prisma.$transaction(async tx => {
		const user = await management.users.get({
			id: authId,
		});

		return tx.user.create({
			data: {
				...init,
				authId,
				email: user.data.email,
			},
		});
	});
}

/**
 * Deletes a user from the system.
 *
 * @param {number} id - The ID of the user to delete.
 *
 * @return {Promise<void>} - A promise that resolves when the user is successfully deleted.
 */
export async function deleteUser(id: number): Promise<void> {
	const {authId} = await prisma.user.findUniqueOrThrow({
		where: {
			id,
		},
		select: {
			authId: true,
		},
	});

	await management.users.delete({
		id: authId,
	});

	// Get all organizations related to this user, along with their number of owners.
	const organizationsToDelete = await getUsersDependantOrganizations(id);

	if (organizationsToDelete.length > 0) {
		// Filter to only organizations which have a single owner (this user), and map to their ids.
		const organizationsToDeleteIds = organizationsToDelete.map(
			({id}) => id,
		);

		await deleteOrganizations(organizationsToDeleteIds);
	}

	await prisma.$transaction([
		prisma.userReauthentication.deleteMany({
			where: {
				userId: id,
			},
		}),
		prisma.organizationInvitation.deleteMany({
			where: {
				senderId: id,
			},
		}),
		prisma.user.delete({
			where: {
				id,
			},
		}),
	]);
}

/**
 * Updates a user in the database and in the authentication service.
 *
 * @param {number} id - The user ID.
 * @param {object} update - The properties to be updated.
 * @param {string} [update.email] - The new email address for the user.
 * @param {string} [update.password] - The new password for the user.
 * @returns {Promise<void>} - A Promise that resolves when the user is updated.
 */
export async function updateUser(
	id: number,
	update: UserUpdate,
): Promise<void> {
	await prisma.$transaction(async tx => {
		const {authId} = await tx.user.findUniqueOrThrow({
			where: {
				id,
			},
			select: {
				authId: true,
			},
		});

		if (update.email) {
			await management.users.update(
				{
					id: authId,
				},
				{
					email: update.email,
				},
			);
		}

		await tx.user.update({
			where: {
				id,
			},
			data: update,
		});
	});
}
