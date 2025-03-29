import {Layer, Map} from 'mapbox-gl';

const sourceId = 'feminicidios-fiscalia-source';
const layerId = 'feminicidios-fiscalia-layer';

const layer: Layer = {
	id: layerId,
	type: 'circle',

	source: sourceId,
	'source-layer': 'empresas-6uxgdw',
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

export function addFeminicidiosFiscaliaLayer(map: Map) {
	map.addLayer(layer);
}

export function removeFeminicidiosFiscaliaLayer(map: Map) {
	map.removeLayer(layerId);
}

export function addFeminiciosFiscaliaSource(map: Map) {
	map.addSource(sourceId, {
		type: 'vector',
		url: 'mapbox://stock44.6cae6ijm',
	});
}
