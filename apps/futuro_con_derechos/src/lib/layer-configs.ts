import { MapLayerConfig } from './map-layer';

export const feminicidiosFiscaliaConfig: MapLayerConfig = {
  sourceId: 'feminicidios-fiscalia-source',
  layerId: 'feminicidios-fiscalia-layer',
  sourceConfig: {
    type: 'vector',
    url: 'mapbox://stock44.6cae6ijm',
  },
  layerConfig: {
    type: 'circle',
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
  },
};

export const feminicidiosPeriodicosConfig: MapLayerConfig = {
  sourceId: 'feminicidios-fiscalia-source',
  layerId: 'feminicidios-fiscalia-layer',
  sourceConfig: {
    type: 'vector',
    url: 'mapbox://stock44.6cae6ijm',
  },
  layerConfig: {
    type: 'circle',
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
  },
};

export const areaSinCubrimientoConfig: MapLayerConfig = {
  sourceId: 'area-sin-cubrimiento-source',
  layerId: 'area-sin-cubrimiento-layer',
  sourceConfig: {
    type: 'vector',
    url: 'mapbox://your.tileset.id', // Reemplaza con tu URL correcto
  },
  layerConfig: {
    type: 'fill',
    'source-layer': 'your-source-layer', // Reemplaza con tu source-layer correcto
    paint: {
      'fill-color': '#ff0000',
      'fill-opacity': 0.5,
    },
  },
};

export const rezagoSocialConfig: MapLayerConfig = {
  sourceId: 'rezago-social-source',
  layerId: 'rezago-social-layer',
  sourceConfig: {
    type: 'vector',
    url: 'mapbox://your.tileset.id', // Reemplaza con tu URL correcto
  },
  layerConfig: {
    type: 'fill',
    'source-layer': 'your-source-layer', // Reemplaza con tu source-layer correcto
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'rezago'],
        0, '#ffffff',
        1, '#ff0000'
      ],
      'fill-opacity': 0.7,
    },
  },
};

export const sitiosDeApoyoConfig: MapLayerConfig = {
  sourceId: 'sitios-de-apoyo-source',
  layerId: 'sitios-de-apoyo-layer',
  sourceConfig: {
    type: 'vector',
    url: 'mapbox://your.tileset.id', // Reemplaza con tu URL correcto
  },
  layerConfig: {
    type: 'circle',
    'source-layer': 'your-source-layer', // Reemplaza con tu source-layer correcto
    paint: {
      'circle-radius': 6,
      'circle-color': '#4CAF50',
      'circle-opacity': 0.8,
    },
  },
};

export const modeloConfig: MapLayerConfig = {
  sourceId: 'modelo-source',
  layerId: 'modelo-layer',
  sourceConfig: {
    type: 'vector',
    url: 'mapbox://your.tileset.id', // Reemplaza con tu URL correcto
  },
  layerConfig: {
    type: 'heatmap',
    'source-layer': 'your-source-layer', // Reemplaza con tu source-layer correcto
    paint: {
      'heatmap-weight': ['get', 'probability'],
      'heatmap-intensity': 1,
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, 'rgba(0, 0, 255, 0)',
        0.5, 'rgba(0, 255, 0, 1)',
        1, 'rgba(255, 0, 0, 1)'
      ],
      'heatmap-radius': 30,
    },
  },
};