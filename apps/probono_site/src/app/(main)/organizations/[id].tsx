import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function OrganizationDetailsPage({ params }: { params: { id: string } }) {
	const { id } = params;

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

	return (
		<main className='mx-auto min-h-screen max-w-screen-xl px-4 py-16'>
			<h1 className='mb-6 mt-4 text-4xl text-stone-50'>Sectores de {organization.name}</h1>
			<ul className='list-disc ml-6 text-lg text-stone-300'>
				{organization.sectors.map(sector => (
					<li key={sector.id}>{sector.name}</li>
				))}
			</ul>
		</main>
	);
}
