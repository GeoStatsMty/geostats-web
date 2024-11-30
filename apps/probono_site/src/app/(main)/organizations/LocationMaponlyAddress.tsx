'use client';

import React from 'react';
import { MapContainer } from 'react-leaflet';
import LocationMarker from '@/components/location-marker';
import { GeostatsTileLayer } from 'geostats-ui';
import { useRouter } from 'next/navigation';

export type LocationMapProps = {
	readonly organizations: Array<{
		id: number;
		name: string;
		location: [number, number];
	}>;
	readonly className?: string;
};

export default function LocationMap({ organizations, className }: LocationMapProps) {
	const router = useRouter();

	return (
		<MapContainer center={[25.68, -100.31]} className={className} zoom={12}>
			{organizations.map(organization => (
				<LocationMarker
					key={organization.id}
					position={organization.location}
					popup={organization.name}
					onClick={() => router.push(`/organizations/${organization.id}`)}
				/>
			))}
			<GeostatsTileLayer />
		</MapContainer>
	);
}
