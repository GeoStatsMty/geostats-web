import {MapLayer} from '@/components/map-layer.tsx';
import {useMap} from '@/components/mapbox-map.tsx';
import {Popup} from 'mapbox-gl';
import {useState} from 'react';

export type ModeloPredictivoLayerProps = {
	readonly isEnabled?: boolean;
};

/**
 * Creates a map layer that represents "Sitios de Apoyo" features with custom styling and visualization options.
 */
export function ModeloPredictivoLayer(props: ModeloPredictivoLayerProps) {
	const {isEnabled} = props;

	const map = useMap();

	const [popup] = useState(
		() =>
			new Popup({
				closeButton: false,
				closeOnClick: false,
				className: 'z-50 h-20 w-20 bg-white',
			}),
	);

	const handleMouseMove = (event: mapboxgl.MapMouseEvent) => {
		const {features, lngLat} = event;

		if (features === undefined) return;

		if (features.length === 0) return;

		const properties = features[0].properties!;
		const predictedCount = properties['Predicció'];
		const total = properties['FemTot'];
		const probability = properties['ProbAtLe'];

		console.log(lngLat);
		popup
			.setLngLat(lngLat)
			.setHTML(
				`<div style="color:white">Siniestros predichos: ${predictedCount} <br> Siniestros reales: ${total} <br> Probabilidad: ${probability}</div>`,
			)
			.addTo(map);
	};

	const handleMouseLeave = () => {
		popup.remove();
	};

	return (
		<MapLayer
			isEnabled={isEnabled}
			source={{
				type: 'vector',
				url: 'mapbox://stock44.4k2z4mbr',
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			layer={{
				type: 'fill',
				'source-layer': 'Modelo2-07rfx7',
				maxzoom: 20,
				minzoom: 7,
				paint: {
					'fill-color': [
						'interpolate',
						['linear'],
						['get', 'Predicció'],
						0.127_677_536_09,
						'rgba(0, 0, 0, 0)',
						10.257_877_199_6,
						'#e30d0d',
					],
				},
			}}
		/>
	);
}
