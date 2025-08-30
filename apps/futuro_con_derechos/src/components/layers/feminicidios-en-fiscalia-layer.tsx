import {MapLayer} from '@/components/map-layer.tsx';

export type FeminicidioEnFiscaliaLayerProps = {
	readonly isEnabled?: boolean;
};

/**
 * Creates a map layer for visualizing data on feminicides reported by the fiscalía.
 *
 * This layer uses a circle style to represent points of interest with configurable
 * radius and color based on the data attribute `NUMPOINTS`.
 *
 * The layer is displayed within a specified zoom range and provides a visual
 * representation of data density using circle size and color intensity.
 */
export function FeminicidiosEnFiscaliaLayer(
	props: FeminicidioEnFiscaliaLayerProps,
) {
	const {isEnabled} = props;
	return (
		<MapLayer
			isEnabled={isEnabled}
			source={{
				type: 'vector',
				url: 'mapbox://stock44.2k4nz34n',
			}}
			layer={{
				type: 'circle',
				'source-layer': 'Feminicidios_de_Fiscalia_cent-3rdfpy',
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
