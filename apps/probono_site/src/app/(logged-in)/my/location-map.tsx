'use client';
import React from 'react';
import {Icon} from 'leaflet';
import Location from 'public/location.png';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
	() => import('react-leaflet').then(mod => mod.MapContainer),
	{ssr: false},
);

const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
	ssr: false,
});

const TileLayer = dynamic(
	() => import('react-leaflet').then(mod => mod.TileLayer),
	{ssr: false},
);

const locationIcon = new Icon({
	iconUrl: Location.src,
	iconSize: [Location.height / 2, Location.width / 2],
	iconAnchor: [15, 30],
});

export type LocationMapProps = {
	readonly location: [number, number];
	readonly className?: string;
};

export default function LocationMap(props: LocationMapProps) {
	const {location, className} = props;
	return (
		<MapContainer
			center={location}
			className={className}
			zoom={15}
			scrollWheelZoom={false}
			keyboard={false}
			zoomControl={false}
			attributionControl={false}
			dragging={false}
		>
			<TileLayer
				attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
				url={`https://api.mapbox.com/styles/v1/stock44/clp78x4lm013d01ns32akem9o/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
			/>
			<Marker position={location} icon={locationIcon} />
		</MapContainer>
	);
}
