import {type Map, type Layer} from 'mapbox-gl';

const sourceId = 'modelo-source';
const layerId = 'modelo-layer';
const layer: Layer = {
	id: layerId,
	type: 'fill',
	source: sourceId,
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
};

export function addModeloSource(map: Map) {
	map.addSource(sourceId, {
		type: 'vector',
		url: 'mapbox://stock44.4k2z4mbr',
	});
}

export function addModeloLayer(map: Map) {
	map.addLayer(layer);
}

export function removeModeloLayer(map: Map) {
	map.removeLayer(layerId);
}
