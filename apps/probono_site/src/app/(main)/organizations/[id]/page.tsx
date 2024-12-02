import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import {getApprovedOrganizationInfo} from '@/lib/models/organization.ts';
import OrganizationCard from '@/app/(main)/organizations/organization-card.tsx';
import {getAllSectors} from '@/lib/models/sector.ts';
import SectorsForm from '@/app/(main)/organizations/location-sectors-map.tsx';


export default async function OrganizationDetailsPage({ params }: { params: { id: string } }) {
	const organizations = await getApprovedOrganizationInfo();
	const { id } = params;

	const organizationsWithAddresses = organizations.filter(organization =>
		Boolean(organization.location),
	) as Array<{
		id: number;
		name: string;
		location: [number, number];
	}>;

	// Obtener la dirección de la organización específica
    const selectedOrganization = organizationsWithAddresses.find(
        org => org.id === Number(id)
    );

	// Obtén los sectores de la organización
	const organization = await prisma.organization.findUnique({
		where: {
			id: Number(id),
		},
		select: {
			name: true,
			sectors: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	if (!organization) {
		notFound();
	}

	const sectors = await getAllSectors();

	return (
		<main className='mx-auto min-h-screen max-w-screen-xl px-4 py-16'>
			<h1 className='mb-6 mt-4 text-4xl text-stone-50'>Organizaciones</h1>
			<div className='mb-8 h-96 w-full overflow-hidden rounded-md glow-2xl'>
				<SectorsForm
					sectors={sectors}
					organization={organization}
					organizations={selectedOrganization ? [selectedOrganization] : []}
				/>
			</div>
			<h1 className='mb-6 mt-4 text-2xl text-stone-50'>Haz click en la organización para ver su impacto geográfico.</h1>
			<div className='flex flex-wrap gap-8'>
				{organizations.map(org => (
					<OrganizationCard
						key={org.id}
						organization={org}
					/>
				))}
			</div>
		</main>
	);
}
