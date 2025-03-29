'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import dynamic from 'next/dynamic';

const LocationMarker = dynamic(
	() => import('@/components/location-marker.tsx'),
	{
		ssr: false,
	},
);

const MapContainer = dynamic(
	() => import('react-leaflet').then(module_ => module_.MapContainer),
	{ssr: false},
);

const TileLayer = dynamic(
	() => import('react-leaflet').then(module_ => module_.TileLayer),
	{ssr: false},
);

export type LocationMapProps = {
	readonly organizations: Array<{
		id: number;
		name: string;
		location: [number, number];
	}>;
	readonly className?: string;
};

export default function LocationMap({
	organizations,
	className,
}: LocationMapProps) {
	const router = useRouter();

	return (
		<MapContainer center={[25.68, -100.31]} className={className} zoom={12}>
			{organizations.map(organization => (
				<LocationMarker
					key={organization.id}
					position={organization.location}
					popup={organization.name}
					onClick={() =>
						router.push(`/organizations/${organization.id}`)
					}
				/>
			))}
			<TileLayer
				attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
				url={`https://api.mapbox.com/styles/v1/stock44/clp78x4lm013d01ns32akem9o/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
			/>
		</MapContainer>
	);
}
