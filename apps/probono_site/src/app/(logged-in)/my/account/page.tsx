import React from 'react';
import {redirect} from 'next/navigation';
import Key from '@material-design-icons/svg/round/key.svg';
import Delete from '@material-design-icons/svg/round/delete.svg';
import dynamic from 'next/dynamic';
import AccountForm from '@/app/(logged-in)/my/account/account-form.tsx';
import updateUserAction from '@/lib/actions/update-user-action.ts';
import {getUserFromSession} from '@/lib/models/user.ts';
import {Separator, ModalTrigger, HashSpyToaster} from 'geostats-ui';
import {auth0} from '@/lib/auth0.ts';
import {NextLinkButton} from '@/components/next-link-button';

const AccountDeletionDialog = dynamic(
	async () =>
		import('@/app/(logged-in)/my/account/account-deletion-dialog.tsx'),
);

export default async function AccountPage() {
	const user = await getUserFromSession();

	const session = await auth0.getSession();
	const sessionType = session?.user?.sub.split('|')[0] as string;

	if (!user) {
		redirect('/onboarding/user');
	}

	return (
		<main className='w-full'>
			<AccountForm
				action={updateUserAction}
				user={user}
				sessionType={sessionType}
			/>
			<Separator />
			<div className='flex-row gap-10'>
				{sessionType === 'auth0' ? (
					<>
						<NextLinkButton
							className='mb-4'
							variant='outlined'
							href='/my/account/password'
							size='lg'
						>
							<Key className='me-1 fill-current' />
							Cambiar contraseña
						</NextLinkButton>
						<Separator />
					</>
				) : null}
			</div>
			<h2 className='mb-4 text-4xl font-bold text-red-400'>
				Eliminar tu cuenta
			</h2>
			<p className='mb-4 text-stone-300'>
				Al eliminar tu cuenta, borrarás toda la información relacionada
				a esta cuenta. Asímismo, se perderán{' '}
				<span className='font-bold'>permanentemente</span> todas las
				organizaciones que únicamente tienen como dueño a esta cuenta.
			</p>
			<ModalTrigger
				isDismissable
				className='text-red-400'
				variant='outlined'
				size='lg'
				label={
					<>
						<Delete className='me-1 fill-current' />
						Eliminar cuenta
					</>
				}
			>
				<AccountDeletionDialog userId={user.id} />
			</ModalTrigger>

			<HashSpyToaster
				toast={{
					title: 'Tiempo de autenticación excedido, intentálo nuevamente.',
					variant: 'error',
				}}
				hash='expired'
			/>
			<HashSpyToaster
				toast={{
					title: 'No se ha podido borrar tu cuenta, intentálo nuevamente.',
					variant: 'error',
				}}
				hash='unknown-error'
			/>
			<HashSpyToaster
				toast={{
					title: 'Necesitas autenticarte primero.',
					variant: 'error',
				}}
				hash='no-reauth'
			/>
		</main>
	);
}
