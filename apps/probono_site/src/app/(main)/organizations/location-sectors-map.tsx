"use client"
import React, {useMemo, useState} from 'react';
import {Seq, Set} from 'immutable';
import dynamic from 'next/dynamic';
import {type Sector} from '@prisma/client';
import {type Geometry} from 'geojson';
import {Item, Section, useListData} from 'react-stately';
import {useToasts} from 'geostats-ui';

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

export default function locationSectors(props: SectorFormProps) {
	const {sectors, organization, organizations} = props;

	const sectorsList = useListData({
		initialItems: sectors,
	});

	const [selectedSectorKeys, setSelectedSectorKeys] = useState(() =>
		Set(organization.sectors.map(sector => sector.id)),
	);
    
	const {add} = useToasts();
	const [isLoading, setIsLoading] = useState(false);
	const selectedSectors = useMemo(
		() =>
			Seq(selectedSectorKeys)
				.map(key => {
					const sector = sectorsList.getItem(key);
					return sector ? sector : null; // Explicitly return null for undefined
				})
				.filter(sector => sector !== null) // Remove null values
				.groupBy(sector => sector!.municipalityId)
				.map((sectors, id) => ({
					name: sectors.first()!.municipalityName,
					id,
					sectors: sectors.sortBy(sector => sector!.name),
				}))
				.toList()
				.sortBy(municipality => municipality.name),
		[sectorsList, selectedSectorKeys],
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