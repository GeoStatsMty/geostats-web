import {Layer, Map} from 'mapbox-gl';

const sourceId = 'sitios-de-apoyo-source';
const layerId = 'sitios-de-apoyo-layer';

const layer: Layer = {
	id: layerId,
	type: 'symbol',
	paint: {
		'text-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0.5, 22, 1],
		'text-halo-color': 'hsl(0, 0%, 0%)',
		'text-halo-width': 1,
		'text-color': '#ffffff',
	},
	source: sourceId,
	'source-layer': '.',
	layout: {
		'text-size': [
			'interpolate',
			['linear'],
			['zoom'],
			0,
			1,
			14,
			12,
			22,
			28,
		],
		'icon-image': [
			'match',
			['get', 'nombre_act'],
			[
				'Escuelas del sector privado que combinan diversos niveles de educación',
			],
			'school',
			['Salones y clínicas de belleza y peluquerías'],
			'shop',
			['Consultorios de medicina general del sector público'],
			'hospital',
			['Consultorios de optometría'],
			'optician',
			['Clínicas de consultorios médicos del sector público'],
			'hospital',
			['Hospitales del sector privado de otras especialidades médicas'],
			'hospital',
			['Escuelas de educación primaria del sector privado'],
			'school',
			['Hospitales del sector público de otras especialidades médicas'],
			'hospital',
			['Asociaciones y organizaciones civiles'],
			'town-hall',
			['Escuelas de educación técnica superior del sector privado'],
			'school',
			['Guarderías del sector privado'],
			'school',
			['Comercio al por menor de artículos usados'],
			'shop',
			['Escuelas de deporte del sector privado'],
			'american-football',
			['Guarderías del sector público'],
			'school',
			[
				'Consultorios del sector privado de audiología y de terapia ocupacional, física y del lenguaje',
			],
			'hospital',
			['Escuelas del sector privado dedicadas a la enseñanza de oficios'],
			'hospital',
			['Escuelas de educación preescolar del sector privado'],
			'school',
			['Consultorios dentales del sector privado'],
			'hospital',
			['Estacionamientos y pensiones para vehículos automotores'],
			'car',
			['Centros de acondicionamiento físico del sector privado'],
			'american-football',
			['Hospitales generales del sector privado'],
			'hospital',
			['Consultorios de nutriólogos y dietistas del sector privado'],
			'restaurant-bbq',
			['Consultorios de medicina general del sector privado'],
			'hospital',
			['Hospitales generales del sector público'],
			'hospital',
			['Escuelas de arte del sector privado'],
			'art-gallery',
			['Clínicas de consultorios médicos del sector privado'],
			'hospital',
			'',
		],
		'text-transform': 'uppercase',
		'text-font': ['Source Sans Pro Regular', 'Arial Unicode MS Regular'],
		'text-offset': [0, 1],
		'text-anchor': 'top',
		'text-field': ['to-string', ['get', 'nom_estab']],
	},
};

const sourceUrl = 'mapbox://stock44.94l5ijku';

export function addSitiosDeApoyoSource(map: Map) {
	map.addSource(sourceId, {
		type: 'vector',
		url: sourceUrl,
	});
}

export function removeSitiosDeApoyoLayer(map: Map) {
	map.removeLayer(layerId);
}

export function addSitiosDeApoyoLayer(map: Map) {
	map.addLayer(layer);
}
