'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { Map } from 'mapbox-gl';
import type { Feature } from 'geojson';
import { useEffect, useRef, useState } from 'react';
import {
	addSitiosDeApoyoLayer,
	addSitiosDeApoyoSource,
	removeSitiosDeApoyoLayer,
} from '@/lib/sitios-de-apoyo.ts';
import {
	addFeminicidiosFiscaliaLayer,
	addFeminiciosFiscaliaSource,
	removeFeminicidiosFiscaliaLayer,
} from '@/lib/feminicidios-fiscalia.ts';
import {
	addFeminicidiosPeriodicosLayer,
	addFeminicidiosPeriodicosSource,
	removeFeminicidiosPeriodicosLayer,
} from '@/lib/feminicidios-periodico.ts';
import {
	addAreaSinCubrimientoDeSitioLayer,
	addAreaSinCubrimientoDeSitioSource,
	removeAreaSinCubrimientoDeSitioLayer,
} from '@/lib/area-sin-cubrimiento-de-sitio.ts';
import {
	addResagoSocialLayer,
	addResagoSocialSource,
	removeResagoSocialLayer,
} from '@/lib/resago-social.ts';
import {
	addModeloLayer,
	addModeloSource,
	removeModeloLayer,
} from '@/lib/modelo.ts';

mapboxgl.accessToken =
	'pk.eyJ1Ijoic3RvY2s0NCIsImEiOiJjbHE0amx3aXEwODQyMmlsb3RnNHk0MDN1In0.qWALc9kC_uuNNBucnTeauw';

const monterreyLat = 25.67;
const monterreyLng = -100.32;
const initialZoom = 10.5;

export type MapboxMapProps = {
	readonly showFiscalia: boolean;
	readonly showCubrimientoDeSitio: boolean;
	readonly showRezagoSocial: boolean;
	readonly showSitiosDeApoyo: boolean;
	readonly showModelo: boolean;
	readonly showPeriodico: boolean;
}

export function MapboxMap(properties: MapboxMapProps) {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<Map | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const {
		showFiscalia,
		showCubrimientoDeSitio,
		showRezagoSocial,
		showSitiosDeApoyo,
		showModelo,
		showPeriodico
	} = properties;

	useEffect(() => {
		if (!mapRef.current || !isLoaded) {
			return;
		}

		const map = mapRef.current;

		if (map.getLayer('feminicidios-fiscalia-layer')) {
			removeFeminicidiosFiscaliaLayer(map);
		}

		if (map.getLayer('feminicidios-periodicos-layer')) {
			removeFeminicidiosPeriodicosLayer(map);
		}

		if (showFiscalia) {
			addFeminicidiosFiscaliaLayer(map);
		}

		if (showPeriodico) {
			addFeminicidiosPeriodicosLayer(map);
		}

		return () => {
			if (mapRef.current) {
				if (mapRef.current.getLayer('feminicidios-fiscalia-layer')) {
					removeFeminicidiosFiscaliaLayer(mapRef.current);
				}
				if (mapRef.current.getLayer('feminicidios-periodicos-layer')) {
					removeFeminicidiosPeriodicosLayer(mapRef.current);
				}
			}
		};
	}, [showFiscalia, showPeriodico, isLoaded]);

	useEffect(() => {
		if (!mapRef.current || !isLoaded) {
			return;
		}

		const map = mapRef.current;
		const popup = new mapboxgl.Popup({
			closeButton: false,
			closeOnClick: false,
		});

		const layers = [
			{
				id: 'feminicidios-fiscalia-layer',
				defaultText: 'Sin datos disponibles fiscalia',
			},
			{
				id: 'feminicidios-periodicos-layer',
				defaultText: 'Sin datos disponibles periodico',
			},
		];

		const onMouseEnter = (
			event: mapboxgl.MapMouseEvent & {
				features?: Feature[];
			},
		) => {
			if (event.features && event.features.length > 0) {
				const feature = event.features[0];
				const numberPoints = feature.properties?.NUMPOINTS;
				popup
					.setLngLat(event.lngLat)
					.setHTML(
						`<div style="color:black">Número de siniestros: ${numberPoints}</div>`,
					)
					.addTo(map);
			}
		};

		const handleMouseLeave = () => {
			popup.remove();
		};

		for (const { id } of layers) {
			map.on('mouseenter', id, onMouseEnter);
			map.on('mouseleave', id, handleMouseLeave);
		}

		return () => {
			for (const { id } of layers) {
				map.off('mouseenter', id, onMouseEnter);
				map.off('mouseleave', id, handleMouseLeave);
			}
			popup.remove();
		};
	}, [isLoaded]);

	useEffect(() => {
		if (!mapRef.current || !isLoaded) {
			return;
		}

		const map = mapRef.current;

		if (map.getLayer('area-sin-cubrimiento-de-sitio-layer')) {
			removeAreaSinCubrimientoDeSitioLayer(map);
		}

		if (showCubrimientoDeSitio) {
			addAreaSinCubrimientoDeSitioLayer(map);
		}

		return () => {
			if (mapRef.current) {
				if (mapRef.current.getLayer('area-sin-cubrimiento-de-sitio-layer')) {
					removeAreaSinCubrimientoDeSitioLayer(mapRef.current);
				}
			}
		};
	}, [showCubrimientoDeSitio, isLoaded]);

	useEffect(() => {
		if (!mapRef.current || !isLoaded) {
			return;
		}

		const map = mapRef.current;

		if (map.getLayer('resago-social-layer')) {
			removeResagoSocialLayer(map);
		}

		if (showRezagoSocial) {
			addResagoSocialLayer(map);
		}

		return () => {
			if (mapRef.current) {
				if (mapRef.current.getLayer('resago-social-layer')) {
					removeResagoSocialLayer(mapRef.current);
				}
			}
		};
	}, [showRezagoSocial, isLoaded]);

	useEffect(() => {
		if (!mapRef.current || !isLoaded) {
			return;
		}

		const map = mapRef.current;

		if (map.getLayer('sitios-de-apoyo-layer')) {
			removeSitiosDeApoyoLayer(map);
		}

		if (showSitiosDeApoyo) {
			addSitiosDeApoyoLayer(map);
		}

		return () => {
			if (mapRef.current) {
				if (mapRef.current.getLayer('sitios-de-apoyo-layer')) {
					removeSitiosDeApoyoLayer(mapRef.current);
				}
			}
		};
	}, [showSitiosDeApoyo, isLoaded]);

	useEffect(() => {
		if (!mapRef.current || !isLoaded) {
			return;
		}

		const map = mapRef.current;

		if (map.getLayer('modelo-layer')) {
			removeModeloLayer(map);
		}

		if (showModelo) {
			addModeloLayer(map);

			const modeloPopup = new mapboxgl.Popup({
				closeButton: false,
				closeOnClick: false,
			});

			const handleMouseEnterModeloLayer = (event: mapboxgl.MapMouseEvent & { features?: Feature[] }) => {
				if (event.features && event.features.length > 0) {
					const properties = event.features[0].properties!;
					const predictedCount = properties['Predicció'];
					const total = properties['FemTot'];
					const probability = properties['ProbAtLe'];
					modeloPopup
						.setLngLat(event.lngLat)
						.setHTML(
							`<div style="color:black">Siniestros predichos: ${predictedCount} <br> Siniestros reales: ${total} <br> Probabilidad: ${probability}</div>`,
						)
						.addTo(map);
				}
			};

			const handleMouseLeaveModeloLayer = () => {
				modeloPopup.remove();
			};

			const layerId = 'modelo-layer';

			map.on('mousemove', layerId, handleMouseEnterModeloLayer);
			map.on('mouseleave', layerId, handleMouseLeaveModeloLayer);

			return () => {
				if (mapRef.current) {
					map.off('mousemove', layerId, handleMouseEnterModeloLayer);
					map.off('mouseleave', layerId, handleMouseLeaveModeloLayer);
					if (mapRef.current.getLayer(layerId)) {
						removeModeloLayer(mapRef.current);
					}
				}
			};
		}

		return () => {
			if (mapRef.current && mapRef.current.getLayer('modelo-layer')) {
				removeModeloLayer(mapRef.current);
			}
		};
	}, [showModelo, isLoaded]);

	useEffect(() => {
		if (mapContainerRef.current && !mapRef.current) {
			mapRef.current = new mapboxgl.Map({
				container: mapContainerRef.current,
				style: 'mapbox://styles/stock44/clwwmpmk7003501nm1y6eh0q4',
				center: [monterreyLng, monterreyLat],
				maxBounds: [
					[monterreyLng - 2, monterreyLat - 3],
					[monterreyLng + 2, monterreyLat + 3],
				],
				zoom: initialZoom,
			});

			const map = mapRef.current;

			map.on('load', () => {
				addResagoSocialSource(map);
				addAreaSinCubrimientoDeSitioSource(map);
				addFeminiciosFiscaliaSource(map);
				addFeminicidiosPeriodicosSource(map);
				addSitiosDeApoyoSource(map);
				addModeloSource(map);
				setIsLoaded(true);
			});

			return () => map.remove();
		}
	}, []);

	return (
		<div
			ref={mapContainerRef}
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