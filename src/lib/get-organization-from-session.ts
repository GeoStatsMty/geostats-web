import {getSession} from '@auth0/nextjs-auth0';
import {redirect} from 'next/navigation';
import {type Organization} from '@prisma/client';
import {getPersonOrganizationByAuthId} from '@/lib/get-person-organization-by-auth-id.ts';

/**
 * Retrieve the logged-in person data using the request's session.
 * @param {string} redirectTo - The path to redirect if there is no currently logged-in user is null.
 * @return {Promise<Organization>} - The logged-in person if session and person exist.
 */
export default async function getOrganizationFromSession(
	redirectTo = '/',
): Promise<Organization> {
	const session = await getSession();

	if (session === null || session === undefined) {
		return redirect(redirectTo);
	}

	const organization = await getPersonOrganizationByAuthId(session.user.sub as string);

	if (organization === null) {
		return redirect(redirectTo);
	}

	return organization;
}