import {MapLayer} from '@/components/map-layer.tsx';
import {useMap} from '@/components/mapbox-map.tsx';
import {InteractionEvent, Popup} from 'mapbox-gl';
import {useEffect, useState} from 'react';

export type ModeloPredictivoLayerProps = {
	readonly isEnabled?: boolean;
};

function formatValue(value: unknown) {
	if (value === undefined || value === null || value === '') {
		return 'Sin dato';
	}

	const numericValue = Number(value);
	if (!Number.isNaN(numericValue)) {
		return numericValue.toLocaleString('es-MX', {
			maximumFractionDigits: 2,
		});
	}

	return String(value);
}

function formatProbability(value: unknown) {
	if (value === undefined || value === null || value === '') {
		return 'Sin dato';
	}

	const numericValue = Number(value);
	if (Number.isNaN(numericValue)) {
		return String(value);
	}

	if (numericValue >= 0 && numericValue <= 1) {
		return `${(numericValue * 100).toFixed(1)}%`;
	}

	return `${numericValue.toFixed(2)}%`;
}

/**
 * Creates a map layer that represents "Sitios de Apoyo" features with custom styling and visualization options.
 */
export function ModeloPredictivoLayer(props: ModeloPredictivoLayerProps) {
	const {isEnabled} = props;

	const map = useMap();

	const [popup] = useState(
		() =>
			new Popup({
				closeButton: true,
				closeOnClick: true,
				className: 'prediction-popup',
				offset: 16,
			}),
	);

	useEffect(() => {
		if (!isEnabled) {
			popup.remove();
		}

		return () => {
			popup.remove();
		};
	}, [isEnabled, popup]);

	const handleClick = (event: InteractionEvent) => {
		const {lngLat, feature} = event;

		if (!feature) return;

		const {properties} = feature;
		const predictedCount = properties['Predicció'];
		const total = properties['FemTot'];
		const probability = properties['ProbAtLe'];

		popup
			.addTo(map)
			.setLngLat(lngLat)
			.setHTML(
				`
					<section class="prediction-popup__card">
						<p class="prediction-popup__eyebrow">Modelo predictivo</p>
						<h3 class="prediction-popup__title">Resumen de la zona seleccionada</h3>
						<div class="prediction-popup__metrics">
							<div class="prediction-popup__metric">
								<span class="prediction-popup__label">Casos estimados</span>
								<strong class="prediction-popup__value">${formatValue(predictedCount)}</strong>
							</div>
							<div class="prediction-popup__metric">
								<span class="prediction-popup__label">Casos registrados</span>
								<strong class="prediction-popup__value">${formatValue(total)}</strong>
							</div>
							<div class="prediction-popup__metric prediction-popup__metric--accent">
								<span class="prediction-popup__label">Probabilidad</span>
								<strong class="prediction-popup__value">${formatProbability(probability)}</strong>
							</div>
						</div>
					</section>
				`,
			);
	};

	return (
		<MapLayer
			isEnabled={isEnabled}
			source={{
				type: 'vector',
				url: 'mapbox://stock44.4k2z4mbr',
			}}
			onClick={handleClick}
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
