'use client';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, {Map, MapMouseEvent} from 'mapbox-gl';
import type {Feature} from 'geojson';
import {useEffect, useRef, useState} from 'react';
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
} from '@/lib/feminicidios-periodicos.ts';
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

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export type MainMapProps = {
	readonly className?: string;
	readonly showFiscalia: boolean;
	readonly showCubrimientoDeSitio: boolean;
	readonly showRezagoSocial: boolean;
	readonly showSitiosDeApoyo: boolean;
	readonly showModelo: boolean;
};

const monterreyLat = 25.67;
const monterreyLng = -100.32;
const initialZoom = 10.5;

export default function MapScreen(properties: MainMapProps) {
	const {
		className,
		showFiscalia,
		showCubrimientoDeSitio,
		showRezagoSocial,
		showSitiosDeApoyo,
		showModelo,
	} = properties;

	const mapContainerReference = useRef<HTMLDivElement | null>(null);

	const [isLoaded, setIsLoaded] = useState(false);

	const mapReference = useRef<Map | null>(null);

	useEffect(() => {
		if (!mapReference.current || !isLoaded) {
			return;
		}

		const map = mapReference.current;
		const popup = new mapboxgl.Popup({
			closeButton: false,
			closeOnClick: false,
		});

		// Definición de capas con descripciones específicas
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

		function handleMouseLeave() {
			popup.remove();
		}

		// Vincular eventos de mouse a las capas
		for (const {id} of layers) {
			map.on('mouseenter', id, onMouseEnter);
			map.on('mouseleave', id, handleMouseLeave);
		}

		// Limpiar eventos al desmontar
		return () => {
			for (const {id} of layers) {
				map.off('mouseenter', id, onMouseEnter);
				map.off('mouseleave', id, handleMouseLeave);
			}
			popup.remove();
		};
	}, [isLoaded]);

	useEffect(() => {
		if (!mapReference.current || !isLoaded) {
			return;
		}

		if (showFiscalia) {
			addFeminicidiosFiscaliaLayer(mapReference.current);
			return () => {
				if (mapReference.current) {
					removeFeminicidiosFiscaliaLayer(mapReference.current);
				}
			};
		}

		addFeminicidiosPeriodicosLayer(mapReference.current);

		return () => {
			if (mapReference.current) {
				removeFeminicidiosPeriodicosLayer(mapReference.current);
			}
		};
	}, [showFiscalia, isLoaded]);

	useEffect(() => {
		if (!mapReference.current || !isLoaded) {
			return;
		}

		if (showCubrimientoDeSitio) {
			addAreaSinCubrimientoDeSitioLayer(mapReference.current);
		}

		return () => {
			if (mapReference.current) {
				removeAreaSinCubrimientoDeSitioLayer(mapReference.current);
			}
		};
	}, [showCubrimientoDeSitio, isLoaded]);

	useEffect(() => {
		if (!mapReference.current || !isLoaded) {
			return;
		}

		if (showRezagoSocial) {
			addResagoSocialLayer(mapReference.current);
		}

		return () => {
			if (mapReference.current) {
				removeResagoSocialLayer(mapReference.current);
			}
		};
	}, [showRezagoSocial, isLoaded]);

	useEffect(() => {
		if (!mapReference.current || !isLoaded) {
			return;
		}

		if (showSitiosDeApoyo) {
			addSitiosDeApoyoLayer(mapReference.current);
		}

		return () => {
			if (mapReference.current) {
				removeSitiosDeApoyoLayer(mapReference.current);
			}
		};
	}, [showSitiosDeApoyo, isLoaded]);

	useEffect(() => {
		if (!mapReference.current || !isLoaded || !showModelo) {
			return;
		}

		const map = mapReference.current;

		const modeloPopup = new mapboxgl.Popup({
			closeButton: false,
			closeOnClick: false,
		});

		addModeloLayer(mapReference.current);

		const handleMouseEnterModeloLayer = (event: MapMouseEvent) => {
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
			if (mapReference.current) {
				map.on('mousemove', layerId, handleMouseEnterModeloLayer);
				map.on('mouseleave', layerId, handleMouseLeaveModeloLayer);
				removeModeloLayer(mapReference.current);
			}
		};
	}, [showModelo, isLoaded]);

	useEffect(() => {
		if (mapContainerReference.current) {
			mapReference.current = new Map({
				container: mapContainerReference.current,
				style: 'mapbox://styles/stock44/clwwmpmk7003501nm1y6eh0q4',
				center: [monterreyLng, monterreyLat],
				maxBounds: [
					[monterreyLng - 2, monterreyLat - 3],
					[monterreyLng + 2, monterreyLat + 3],
				],
				zoom: initialZoom,
			});

			const map = mapReference.current;

			map.on('load', () => {
				addResagoSocialSource(map);

				addAreaSinCubrimientoDeSitioSource(map);

				addFeminiciosFiscaliaSource(map);

				addFeminicidiosPeriodicosSource(map);

				addSitiosDeApoyoSource(map);

				addModeloSource(map);

				setIsLoaded(true);
			});

			/*
			 Related documentation:
              https://docs.mapbox.com/style-spec/reference/layers/#minzoom
              https://docs.mapbox.com/data/tilesets/guides/
              https://docs.mapbox.com/mapbox-gl-js/api/sources/
              https://docs.mapbox.com/mapbox-gl-js/api/sources/
              https://docs.mapbox.com/mapbox-gl-js/example/vector-source/
              https://docs.mapbox.com/help/glossary/source-layer/
			  https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker
			  https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
			  https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
			 */
			return () => map.remove();
		}
	}, []);
	return <div ref={mapContainerReference} className={className} />;
}
