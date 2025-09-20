import {type Map, type Layer} from 'mapbox-gl';

const sourceId = 'modelo-source';
const layerId = 'modelo-layer';
const layer: Layer = {};

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
	if (map.getLayer(layerId)) {
		map.removeLayer(layerId);
	}
}
