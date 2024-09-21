import {Map, Layer} from 'mapbox-gl';

const sourceId = 'area-sin-cubrimiento-de-sitio-source';
const layerId = 'area-sin-cubrimiento-de-sitio-layer';
const layer: Layer = {
	id: layerId,
	type: 'fill',
	source: sourceId,
	'source-layer': 'Area_Sin_Cubrimiento_de_Sitio-3mxqpk',
	maxzoom: 20,
	minzoom: 7,
	paint: {
		'fill-color': 'rgba(220, 40, 40, 0.07)',
		'fill-outline-color': 'rgba(255, 117, 117, 0.6)',
	},
};

export function addAreaSinCubrimientoDeSitioSource(map: Map) {
	map.addSource(sourceId, {
		type: 'vector',
		url: 'mapbox://stock44.2hei66sb',
	});
}

export function addAreaSinCubrimientoDeSitioLayer(map: Map) {
	map.addLayer(layer);
}

export function removeAreaSinCubrimientoDeSitioLayer(map: Map) {
	map.removeLayer(layerId);
}
