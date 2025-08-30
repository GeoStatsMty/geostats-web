import {MapLayer} from '@/components/map-layer.tsx';
import {useMap} from '@/components/mapbox-map.tsx';
import {Popup} from 'mapbox-gl';
import {useState} from 'react';
import type {Feature} from 'geojson';

type BoundingBox = [number, number, number, number];

/**
 * Calculates the bounding box for a given set of 2D coordinates.
 * @param coordinates - An array of 2D coordinate pairs, where each pair is represented as [x, y].
 * @returns  The bounding box represented as [minX, minY, maxX, maxY].
 */
function getBoundingBox(coordinates: number[][]): BoundingBox {
	const xs = coordinates.map(coord => coord[0]);
	const ys = coordinates.map(coord => coord[1]);
	return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

/**
 * Calculates the center coordinates of a given feature's geometry.
 * @param feature - The feature object containing the geometry data.
 * @returns  The center coordinates of the feature's geometry as a tuple [longitude, latitude].
 * @throws {Error} If the geometry type is unsupported.
 */
function getFeatureCenter(feature: Feature): [number, number] {
	const geometry = feature.geometry;

	if (geometry.type === 'Point') {
		return geometry.coordinates as [number, number];
	}

	if (geometry.type === 'Polygon') {
		const bbox = getBoundingBox(geometry.coordinates[0]);
		return [(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2];
	}

	throw new Error('Unsupported geometry type');
}

export type ModeloPredictivoLayerProps = {
	readonly isEnabled?: boolean;
};

/**
 * Creates a map layer that represents "Sitios de Apoyo" features with custom styling and visualization options.
 */
export function ModeloPredictivoLayer(props: ModeloPredictivoLayerProps) {
	const {isEnabled} = props;

	const map = useMap();

	const [numberFormatter] = useState(
		() =>
			new Intl.NumberFormat('es-MX', {
				maximumFractionDigits: 2,
			}),
	);

	const [popup] = useState(
		() =>
			new Popup({
				closeButton: false,
				closeOnClick: false,
				className: '',
			}),
	);

	const handleMouseMove = (event: mapboxgl.MapMouseEvent) => {
		const {features} = event;

		if (features === undefined) return;

		if (features.length === 0) return;

		const [feature] = features;

		const {properties} = feature;

		if (!properties) return;

		const predictedCount = properties['Predicció'] as number;

		if (predictedCount < 1) return;

		const formattedPredictedCount = numberFormatter.format(
			properties['Predicció'],
		);
		const total = numberFormatter.format(properties['FemTot']);
		const probability = numberFormatter.format(properties['ProbAtLe']);

		popup
			.setLngLat(getFeatureCenter(feature))
			.setHTML(
				`<div style="color:black">Siniestros predichos: ${formattedPredictedCount} <br> Siniestros reales: ${total} <br> Probabilidad: ${probability}</div>`,
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
