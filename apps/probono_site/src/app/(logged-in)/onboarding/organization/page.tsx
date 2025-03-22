import React from 'react';
import {redirect} from 'next/navigation';
import Image from 'next/image';
import NavigateNext from '@material-design-icons/svg/round/navigate_next.svg';
import {AnimatedLayoutContainer} from 'geostats-ui';
import prisma from '@/lib/prisma.ts';
import createOrganizationAction from '@/lib/actions/create-organization-action.ts';
import OrganizationCreationForm from '@/components/organization-creation-form.tsx';
import {
	consumeOrganizationInvitation,
	getOrganizationInvitation,
} from '@/lib/models/organization-invitation.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import {SubmitButton} from '@/components/submit-button.tsx';
import {auth0} from '@/lib/auth0.ts';

export type OrganizationOnboardingPageProps = {
	readonly searchParams: {
		readonly inviteId?: string;
	};
};

export default async function OrganizationOnboardingPage(
	props: OrganizationOnboardingPageProps,
) {
	const {searchParams} = props;
	const session = await auth0.getSession();

	if (!session) {
		throw new Error('Could not retrieve auth0 session.');
	}

	const {inviteId} = searchParams;

	const user = await prisma.user.findUnique({
		where: {
			authId: session.user.sub,
		},
	});

	if (!user) {
		const href = inviteId
			? `/onboarding/user?inviteId=${inviteId}`
			: '/onboarding/user';
		return redirect(href);
	}

	const invite = inviteId
		? await getOrganizationInvitation(inviteId)
		: undefined;

	const action = createOrganizationAction.bind(null, user.id);

	async function joinOrganizationAction() {
		'use server';

		const user = await getUserFromSession();

		if (!user) {
			const href = inviteId
				? `/onboarding/user?inviteId=${inviteId}`
				: '/onboarding/user';
			return redirect(href);
		}

		const invite = inviteId
			? await getOrganizationInvitation(inviteId)
			: undefined;

		if (!invite) {
			return redirect('/onboarding/organization');
		}

		try {
			await consumeOrganizationInvitation(invite.id, user.id);
		} catch {
			redirect(`/invite/${inviteId}`);
		}

		redirect('/my');
	}

	return (
		<AnimatedLayoutContainer>
			{invite ? (
				<>
					<h1 className='mb-4 text-2xl text-stone-50'>
						Fuiste invitado a{' '}
						<strong>{invite.organization.name}</strong>
					</h1>
					{invite.organization.logoUrl && (
						<Image
							src={invite.organization.logoUrl}
							alt={`${invite.organization.name} logo`}
							width={256}
							height={256}
							className='mx-auto mb-4 h-32'
						/>
					)}
					<p className='mb-4'>
						Fuiste invitado a unirte a{' '}
						<strong>{invite.organization.name}</strong> por{' '}
						<strong>
							{invite.sender.givenName}{' '}
							{invite.sender.familyName}{' '}
						</strong>
						. Al unirte serás capaz de modificar los detalles de la
						organización, ayudando a completar su perfil dentro de
						la plataforma.
					</p>
					<form
						action={joinOrganizationAction}
						className='flex w-full justify-end'
					>
						<SubmitButton
							icon={<NavigateNext />}
							iconPlacement='right'
						>
							Únirme
						</SubmitButton>
					</form>
				</>
			) : (
				<>
					<h1 className='text-2xl text-stone-50'>
						Datos de tu organización
					</h1>
					<p className='mb-2 text-stone-300'>
						También necesitamos algunos datos sobre tu organización.
					</p>

					<OrganizationCreationForm action={action} />
				</>
			)}
		</AnimatedLayoutContainer>
	);
}
