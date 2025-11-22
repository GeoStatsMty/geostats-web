import {MapLayer} from '@/components/map-layer.tsx';
import {useMap} from '@/components/mapbox-map.tsx';
import {Popup} from 'mapbox-gl';
import {useRef} from 'react';

export type SitiosDeApoyoLayerProps = {
	readonly isEnabled?: boolean;
};

type HoverEvent = {
	lngLat: {lng: number; lat: number};
	features?: Array<{
		id?: string | number;
		properties?: {
			nom_estab?: string;
			nombre_act?: string;
			colonia?: string;
			colonia_n?: string;
			telefono?: string;
			tel?: string;
		};
	}>;
};

/**
 * Muestra la capa de Sitios de Apoyo y, al pasar el mouse, despliega un popup compacto.
 */
export function SitiosDeApoyoLayer({isEnabled}: SitiosDeApoyoLayerProps) {
	const map = useMap();

	const popupRef = useRef<Popup | null>(null);
	const lastFeatureIdRef = useRef<string | number | null>(null);

	if (popupRef.current === null) {
		popupRef.current = new Popup({
			closeButton: false,
			closeOnClick: false,
			offset: 12,
		}).setMaxWidth('220px');
	}

	const showPopup = (event: HoverEvent, isMove: boolean) => {
		const popup = popupRef.current;
		if (!popup) return;

		const feature = event.features && event.features[0];
		const properties = feature?.properties;
		if (!feature || !properties) return;

		// si solo movemos dentro del mismo punto, solo mover popup
		if (isMove && lastFeatureIdRef.current === feature.id) {
			popup.setLngLat(event.lngLat);
			return;
		}

		const nombre =
			properties.nom_estab ||
			properties.nombre_act ||
			'Sitio de apoyo';

		const actividad = properties.nombre_act || '';
		const colonia =
			properties.colonia ||
			properties.colonia_n ||
			'';
		const telefono =
			properties.telefono ||
			properties.tel ||
			'';

		const html = `
			<div
				style="
					font-family:sans-serif;
					background:white;
					color:#111;
					padding:8px 10px;
					border-radius:10px;
					min-width:180px;
					max-width:220px;
					box-shadow:0 10px 25px rgba(0,0,0,.18);
					box-sizing:border-box;
					word-break:break-word;
					overflow-wrap:anywhere;
					line-height:1.25;
				"
			>
				<div style="font-weight:600;margin-bottom:4px">${nombre}</div>
				${actividad ? `<div style="font-size:12px;margin-bottom:3px">${actividad}</div>` : ''}
				${colonia ? `<div style="font-size:12px;margin-bottom:3px">${colonia}</div>` : ''}
				${telefono ? `<div style="font-size:12px;">Tel: ${telefono}</div>` : ''}
			</div>
		`;

		lastFeatureIdRef.current = feature.id ?? nombre;

		popup.setLngLat(event.lngLat).setHTML(html).addTo(map);
	};

	const handleEnter = (event: HoverEvent) => {
		showPopup(event, false);
	};

	const handleMove = (event: HoverEvent) => {
		showPopup(event, true);
	};

	const handleLeave = () => {
		const popup = popupRef.current;
		if (popup) popup.remove();
		lastFeatureIdRef.current = null;
	};

	return (
		<MapLayer
			isEnabled={isEnabled}
			source={{
				type: 'vector',
				url: 'mapbox://stock44.94l5ijku',
			}}
			onMouseEnter={handleEnter}
			onMouseMove={handleMove}
			onMouseLeave={handleLeave}
			layer={{
				type: 'symbol',
				paint: {
					'text-opacity': [
						'interpolate',
						['linear'],
						['zoom'],
						0,
						0.5,
						22,
						1,
					],
					'text-halo-color': 'hsl(0, 0%, 0%)',
					'text-halo-width': 1,
					'text-color': '#ffffff',
				},
				'source-layer': 'Sitios_de_Apoyo-dc4v8t',
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
						[
							'Hospitales del sector privado de otras especialidades médicas',
						],
						'hospital',
						['Escuelas de educación primaria del sector privado'],
						'school',
						[
							'Hospitales del sector público de otras especialidades médicas',
						],
						'hospital',
						['Asociaciones y organizaciones civiles'],
						'town-hall',
						[
							'Escuelas de educación técnica superior del sector privado',
						],
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
						[
							'Escuelas del sector privado dedicadas a la enseñanza de oficios',
						],
						'hospital',
						['Escuelas de educación preescolar del sector privado'],
						'school',
						['Consultorios dentales del sector privado'],
						'hospital',
						[
							'Estacionamientos y pensiones para vehículos automotores',
						],
						'car',
						[
							'Centros de acondicionamiento físico del sector privado',
						],
						'american-football',
						['Hospitales generales del sector privado'],
						'hospital',
						[
							'Consultorios de nutriólogos y dietistas del sector privado',
						],
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
					'text-font': [
						'Source Sans Pro Regular',
						'Arial Unicode MS Regular',
					],
					'text-offset': [0, 1],
					'text-anchor': 'top',
					'text-field': ['to-string', ['get', 'nom_estab']],
				},
			}}
		/>
	);
}
