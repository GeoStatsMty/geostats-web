'use client';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {type Organization} from '@prisma/client';
import {
	Dialog,
	Button,
	useCloseModal,
	ALinkButton,
	LoadingSpinner,
} from 'geostats-ui';

export type AccountDeletionDialogProps = {
	readonly userId: number;
};

export default function AccountDeletionDialog(
	props: AccountDeletionDialogProps,
) {
	const {userId} = props;
	const closeModal = useCloseModal();
	const {data} = useQuery<Organization[]>({
		queryKey: [userId, 'dependant-organizations'],
		queryFn: async () => {
			const response = await fetch(
				`/api/users/${userId}/dependant-organizations`,
			);

			return response.json();
		},
	});

	return (
		<Dialog title={<span className='text-red-400'>Borrar mi cuenta</span>}>
			¿Estás seguro de que quieres borrar tu cuenta?
			{data ? (
				<div className='mt-4'>
					{data.length > 1 &&
						'Se borrarán las siguientes organizaciones:'}
					{data.length === 1 &&
						'Se borrará la siguiente organización:'}
					<ul className='list-inside list-disc'>
						{data.map(organization => (
							<li key={organization.id}>{organization.name}</li>
						))}
					</ul>
				</div>
			) : (
				<div className='mt-4 flex h-16 items-center justify-center'>
					<LoadingSpinner />
				</div>
			)}
			<div className='mt-4 flex justify-between'>
				<Button variant='secondary' onPress={closeModal}>
					Cancelar
				</Button>
				<ALinkButton
					href='/api/auth/reauth?returnTo=/my/account/delete'
					variant='outlined'
					className='font-bold text-red-400'
				>
					Confirmar
				</ALinkButton>
			</div>
		</Dialog>
	);
}
