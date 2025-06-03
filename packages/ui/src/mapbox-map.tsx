'use client';
import {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
	'pk.eyJ1Ijoic3RvY2s0NCIsImEiOiJjbHE0amx3aXEwODQyMmlsb3RnNHk0MDN1In0.qWALc9kC_uuNNBucnTeauw';

export function MapboxMap() {
	const mapContainer = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!mapContainer.current) return;
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/stock44/cmast8252007l01sc2dnc1wyi',
			center: [-100.31847,25.67507], // CDMX
			zoom: 10,
		});

		return () => map.remove();
	}, []);

	return (
		<div
			ref={mapContainer}
			style={{
				width: '100vw',
				height: '100vh',
				position: 'absolute',
				inset: 0,
				zIndex: 0,
			}}
		/>
	);
}
