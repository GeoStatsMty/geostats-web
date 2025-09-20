import {type Map, type Layer} from 'mapbox-gl';

const sourceId = 'resago-social-source';
const layerId = 'resago-social-layer';
const layer: Layer = {
	id: layerId,
	type: 'fill',
	source: sourceId,
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
};

export function addResagoSocialSource(map: Map) {
	map.addSource(sourceId, {
		type: 'vector',
		url: 'mapbox://stock44.1sgbxxpi',
	});
}

export function addResagoSocialLayer(map: Map) {
	map.addLayer(layer);
}

export function removeResagoSocialLayer(map: Map) {
	if (map.getLayer(layerId)) {
		map.removeLayer(layerId);
	}
}