import React from 'react';
import {getApprovedOrganizationInfo} from '@/lib/models/organization.ts';
import OrganizationCard from '@/app/(main)/organizations/organization-card.tsx';
import LocationMap from './location-maponly-address.tsx';

export default async function OrganizationsPage() {
	const organizations = await getApprovedOrganizationInfo();

	const organizationsWithAddresses = organizations.filter(organization =>
		Boolean(organization.location),
	) as Array<{
		id: number;
		name: string;
		location: [number, number];
	}>;

	return (
		<main className='mx-auto min-h-screen max-w-(--breakpoint-xl) px-4 py-16'>
			<h1 className='mb-6 mt-4 text-4xl text-stone-50'>Organizaciones</h1>
			<div className='mb-8 h-96 w-full overflow-hidden rounded-md glow-2xl'>
				<LocationMap
					organizations={organizationsWithAddresses}
					className='size-full'
				/>
			</div>
			<h1 className='mb-6 mt-4 text-2xl text-stone-50'>
				Haz click en la organización para ver su impacto geográfico.
			</h1>
			<div className='flex flex-wrap gap-8'>
				{organizations.map(organization => (
					<OrganizationCard
						key={organization.id}
						organization={organization}
					/>
				))}
			</div>
		</main>
	);
}
