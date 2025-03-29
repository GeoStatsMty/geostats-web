import {Layer, Map} from 'mapbox-gl';

const sourceId = 'feminicidios-periodicos-source';
const layerId = 'feminicidios-periodicos-layer';
const layer: Layer = {
	id: layerId,
	type: 'circle',

	source: sourceId,
	'source-layer': '.',
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
};

export function addFeminicidiosPeriodicosSource(map: Map) {
	map.addSource(sourceId, {
		type: 'vector',
		url: 'mapbox://stock44.19vijq6m',
	});
}

export function addFeminicidiosPeriodicosLayer(map: Map) {
	map.addLayer(layer);
}

export function removeFeminicidiosPeriodicosLayer(map: Map) {
	map.removeLayer(layerId);
}
