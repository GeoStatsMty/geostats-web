import React from 'react';
import {redirect} from 'next/navigation';
import {
	consumeOrganizationInvitation,
	isInvitationValid,
} from '@/lib/models/organization-invitation.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import {auth0} from '@/lib/auth0.ts';
import {NextLinkButton} from '@/components/next-link-button.tsx';

export type InvitePageProps = {
	readonly params: {
		readonly inviteId: string;
	};
};

export default async function InvitePage(props: InvitePageProps) {
	const {params} = props;

	const valid = await isInvitationValid(params.inviteId);

	if (valid) {
		const session = await auth0.getSession();

		if (!session) {
			redirect(`/api/auth/signup?returnTo=/invite/${params.inviteId}`);
		}

		const user = await getUserFromSession();

		if (user) {
			await consumeOrganizationInvitation(params.inviteId, user.id);
			redirect('/my');
		}

		redirect(`/onboarding/organization?inviteId=${params.inviteId}`);
	}

	return (
		<div className='flex size-full items-center justify-center'>
			<div className='mt-32 w-fit max-w-96 border border-stone-800 p-8 text-stone-300'>
				<h1 className='mb-4 text-3xl'>Invitación inválida</h1>
				<p className='mb-4'>
					Esta invitación ya no es válida. Para unirte a la
					organización, consigue otra invitación.
				</p>
				<NextLinkButton href='/' variant='secondary'>
					Volver al inicio
				</NextLinkButton>
			</div>
		</div>
	);
}
