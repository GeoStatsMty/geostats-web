'use client';
import React from 'react';
import type {Organization} from '@prisma/client';
import {Button, Dialog, useCloseModal} from 'geostats-ui';

export type OrganizationDeletionDialogProps = {
	readonly deleteOrganization: () => Promise<void>;
	readonly organization: Organization;
};

export default function OrganizationDeletionDialog(
	props: OrganizationDeletionDialogProps,
) {
	const {deleteOrganization, organization} = props;
	const closeModal = useCloseModal();

	const deleteOrganizationHandler = async () => {
		await deleteOrganization();
		globalThis.location.href = '/my';
	};

	return (
		<Dialog
			title={<span className='text-red-400'>Borrar la organización</span>}
		>
			¿Estás seguro de que quieres borrar la organización{' '}
			<span className=' font-bold'>{organization.name}</span>?
			<div className='mt-4 flex justify-between'>
				<Button variant='secondary' onPress={closeModal}>
					Cancelar
				</Button>
				<Button
					variant='outlined'
					className='font-bold text-red-400'
					onPress={deleteOrganizationHandler}
				>
					Confirmar
				</Button>
			</div>
		</Dialog>
	);
}
