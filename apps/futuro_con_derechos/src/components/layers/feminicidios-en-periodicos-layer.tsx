import {MapLayer} from '@/components/map-layer.tsx';

export type FeminicidiosEnPeriodicosLayer = {
	readonly isEnabled?: boolean;
};

/**
 * FeminicidiosEnPeriodicosLayer is a function that generates a map layer for visualizing feminicide data from newspapers.
 * The layer uses a vector source hosted on Mapbox, with configurable properties such as scaling circle radius based on data points,
 * setting color, and adjusting blur for the circle representation on the map.
 */
export function FeminicidiosEnPeriodicosLayer(
	props: FeminicidiosEnPeriodicosLayer,
) {
	const {isEnabled} = props;
	return (
		<MapLayer
			isEnabled={isEnabled}
			source={{
				type: 'vector',
				url: 'mapbox://stock44.19vijq6m',
			}}
			layer={{
				type: 'circle',
				'source-layer': 'Feminicidios_de_Periodicos_ce-1wv0e9',
				maxzoom: 20,
				minzoom: 7,
				paint: {
					'circle-radius': [
						'interpolate',
						['linear'],
						['get', 'NUMPOINTS'],
						1,
						5,
						15,
						20,
					],
					'circle-color': '#ec5151',
					'circle-blur': 1,
				},
			}}
		/>
	);
}
