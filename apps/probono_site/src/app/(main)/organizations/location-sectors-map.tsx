'use client';
import React, {useState} from 'react';
import {Set} from 'immutable';
import dynamic from 'next/dynamic';
import {type Sector} from '@prisma/client';
import {type Geometry} from 'geojson';

const LocationMap = dynamic(
	async () => import('@/app/(main)/organizations/location-map.tsx'),
	{
		ssr: false,
		loading() {
			return (
				<div className='h-96 w-full animate-pulse rounded-md bg-stone-900' />
			);
		},
	},
);

export type SectorFormProps = {
	readonly sectors: Array<
		Sector & {
			geom: Geometry;
			municipalityName: string;
		}
	>;
	readonly organization: {
		sectors: Array<{
			id: number;
		}>;
	};
	readonly organizations: Array<{
		id: number;
		name: string;
		location: [number, number];
	}>;
};

export default function LocationSectors(props: SectorFormProps) {
	const {sectors, organization, organizations} = props;

	const [selectedSectorKeys] = useState(() =>
		Set(organization.sectors.map(sector => sector.id)),
	);

	return (
		<div className='mb-8 h-96 w-full overflow-hidden rounded-md glow-2xl'>
			<LocationMap
				sectors={sectors}
				selectedKeys={selectedSectorKeys}
				organizations={organizations}
				className='size-full'
			/>
		</div>
	);
}
