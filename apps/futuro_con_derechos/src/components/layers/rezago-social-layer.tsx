import {MapLayer} from '@/components/map-layer.tsx';

export type ResagoSocialLayerProps = {
	readonly isEnabled?: boolean;
};

/**
 * Creates a layer for a map that visualizes the degree of social lag in a specific region.
 * The function utilizes a vector source layer and applies a fill style with specific color mappings
 * representing different levels of social lag (Muy alto, Alto, Medio). The layer appears within
 * defined zoom levels ranging from 7 to 20.
 */
export function RezagoSocialLayer(props: ResagoSocialLayerProps) {
	const {isEnabled} = props;
	return (
		<MapLayer
			isEnabled={isEnabled}
			source={{
				type: 'vector',
				url: 'mapbox://stock44.1sgbxxpi',
			}}
			layer={{
				type: 'fill',
				'source-layer': 'Grado_de_resago_social_nl_1-2k7zy0',
				maxzoom: 20,
				minzoom: 7,
				paint: {
					'fill-color': [
						'match',
						['get', 'GRS NLFiel'],
						['Muy alto'],
						'rgba(224, 0, 0, 0.59)',
						['Alto'],
						'#87401d',
						['Medio'],
						'rgba(154, 133, 40, 0.7)',
						'rgba(0, 0, 0, 0)',
					],
				},
			}}
		/>
	);
}
