'use client';

import React, {type Key, useMemo} from 'react';
import {GeoJSON, MapContainer, TileLayer, Tooltip} from 'react-leaflet';
import {type Set} from 'immutable';
import {type Geometry} from 'geojson';
import {type Sector} from '@prisma/client';

import LocationMarker from '@/components/location-marker.tsx';

type SectorProps = {
	readonly isSelected: boolean;
	readonly sector: Sector & {geom: Geometry};
};

function SectorDisplay(props: SectorProps) {
	const {isSelected, sector} = props;

	return (
		<GeoJSON
			key={sector.id}
			data={sector.geom}
			style={{
				fill: true,
				fillColor: isSelected ? '#fafaf9' : '',
				fillOpacity: isSelected ? 0.5 : 0,
				stroke: isSelected ? true : false,
				weight: 1,
				color: '#78716c',
			}}
		>
			{isSelected && <Tooltip>{sector.name}</Tooltip>}
		</GeoJSON>
	);
}

export type LocationMapProps = {
	readonly sectors: Array<Sector & {geom: Geometry}>;
	readonly selectedKeys: Set<Key>;
	readonly organizations: Array<{
		id: number;
		name: string;
		location: [number, number];
	}>;
	readonly className?: string;
};

export default function LocationMap(props: LocationMapProps) {
	const {sectors, selectedKeys, organizations, className} = props;

	const time = useMemo(() => Date.now(), []);

	return (
		<MapContainer
			key={time}
			scrollWheelZoom
			worldCopyJump
			center={[25.68, -100.31]}
			className={className}
			zoom={12}
		>
			{organizations.map(organization => (
				<LocationMarker
					key={organization.id}
					position={organization.location}
					popup={organization.name}
				/>
			))}
			<TileLayer
				attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
				url={`https://api.mapbox.com/styles/v1/stock44/clp78x4lm013d01ns32akem9o/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
			/>
			{sectors.map(sector => (
				<SectorDisplay
					key={sector.id}
					sector={sector}
					isSelected={selectedKeys.has(sector.id)}
				/>
			))}
		</MapContainer>
	);
}
