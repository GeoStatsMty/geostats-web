import {MapLayer} from '@/components/map-layer.tsx';

export type AreaSinCubrimientoDeSitioLayerProps = {
	readonly isEnabled?: boolean;
};

/**
 * Renders a map layer for "Area Sin Cubrimiento de Sitio" with specific properties such as color, transparency, and zoom levels.
 */
export function AreaSinCubrimientoDeSitioLayer(
	props: AreaSinCubrimientoDeSitioLayerProps,
) {
	const {isEnabled} = props;
	return (
		<MapLayer
			isEnabled={isEnabled}
			source={{
				type: 'vector',
				url: 'mapbox://stock44.2hei66sb',
			}}
			layer={{
				type: 'fill',
				'source-layer': 'Area_Sin_Cubrimiento_de_Sitio-3mxqpk',
				maxzoom: 20,
				minzoom: 7,
				paint: {
					'fill-color': 'rgba(220, 40, 40, 0.07)',
					'fill-outline-color': 'rgba(255, 117, 117, 0.6)',
				},
			}}
		/>
	);
}
