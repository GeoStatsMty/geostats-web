import {MapLayer} from '@/components/map-layer.tsx';
import {useMap} from '@/components/mapbox-map.tsx';
import {InteractionEvent, Popup} from 'mapbox-gl';
import {useRef} from 'react';

export type ModeloPredictivoLayerProps = {
	readonly isEnabled?: boolean;
};

type ModeloPredictivoProperties = {
	'Predicción'?: number | string;
	'FemTot'?: number | string;
	'ProbAtLe'?: number | string;
};

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function formatMetric(value: number | string | undefined) {
	if (value === undefined || value === null || value === '') {
		return 'Sin dato';
	}

	const numericValue = Number(value);

	if (Number.isFinite(numericValue)) {
		return new Intl.NumberFormat('es-MX', {
			maximumFractionDigits: 2,
		}).format(numericValue);
	}

	return String(value);
}

function formatProbability(value: number | string | undefined) {
	if (value === undefined || value === null || value === '') {
		return 'Sin dato';
	}

	const numericValue = Number(value);

	if (Number.isFinite(numericValue)) {
		const formattedValue = 
			numericValue <= 1 ? numericValue * 100 : numericValue;

		return `${new Intl.NumberFormat('es-MX', {
			maximumFractionDigits: 2,
		}).format(formattedValue)}%`;
	}

	return String(value);
}

function buildPopupHtml(properties: ModeloPredictivoProperties) {
	const predictedCount = escapeHtml(formatMetric(properties['Predicción']));
	const total = escapeHtml(formatMetric(properties['FemTot']));
	const probability = escapeHtml(formatProbability(properties['ProbAtLe']));

	return `
	<div
		style="
			font-family:Inter, ui-sans-serif, system-ui, sans-serif;
			background:#ffffff;
			color:#111827;
			padding:12px 14px;
			border-radius: 14px;
			min-width:190px;
			max-width:250px;
			box-shadow:0 16px 38px rgba(0,0,0,0.22);
			box-sizing:border-box;
			line-height:1.35;
			"
		>
			<div
				style="
					display:inlie-flex;
					align-items:center;
					padding:4px 8px;
					border-radius:999px;
					background:#fee2e2;
					color:#991b1b;
					font-size:11px;
					font-weight:700;
					letter-spacing:0.04em;
					text-transform:uppercase;
				"
			>
				Modelo Predictivo
			</div>

			<div
				style="
					margin-top:10px;
					display:grid;
					gap:8px;
				"
			>
				<div>
					<div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">
						Casos estimados
					</div>
					<div style="font-size:16px;font-weight:700;color:#111827;">
						${predictedCount}
					</div>
				</div>

				<div>
					<div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">
						Casos registrados
					</div>
					<div style="font-size:14px;font-weight:600;color:#111827;">
						${total}
					</div>
				</div>

				<div>
					<div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">
						Probabilidad estimada
					</div>
					<div style="font-size:14px;font-weight:600;color:#b91c1c;">
						${probability}
					</div>
				</div>
			</div>
		</div>
	`;
}

/**
 * Creates a map layer that represents "Sitios de Apoyo" features with custom styling and visualization options.
 */
export function ModeloPredictivoLayer(props: ModeloPredictivoLayerProps) {
	const {isEnabled} = props;

	const map = useMap();
	const popupRef = useRef<Popup | null>(null);

	if (popupRef.current === null) {
		popupRef.current = new Popup({
			closeButton: false,
			closeOnClick: false,
			offset: 12,
		}).setMaxWidth('260px');
	}

	const handleMouseEnterAndMove = (event: InteractionEvent) => {
		const popup = popupRef.current;
		const {lngLat, feature} = event;

		if (!popup || !feature) return;

		const properties = feature.properties as ModeloPredictivoProperties;

		popup
			.setLngLat(lngLat)
			.setHTML(buildPopupHtml(properties))
			.addTo(map);
	};

	const handleMouseLeave = () => {
		popupRef.current?.remove();
	};

	return (
		<MapLayer
			isEnabled={isEnabled}
			source={{
				type: 'vector',
				url: 'mapbox://stock44.4k2z4mbr',
			}}
			onMouseEnter={handleMouseEnterAndMove}
			onMouseMove={handleMouseEnterAndMove}
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
