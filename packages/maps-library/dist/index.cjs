"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/index.ts
var index_exports = {};
__export(index_exports, {
  MapLayer: () => MapLayer,
  MapManager: () => MapManager,
  areaSinCubrimientoConfig: () => areaSinCubrimientoConfig,
  feminicidiosFiscaliaConfig: () => feminicidiosFiscaliaConfig,
  feminicidiosPeriodicosConfig: () => feminicidiosPeriodicosConfig,
  modeloConfig: () => modeloConfig,
  rezagoSocialConfig: () => rezagoSocialConfig,
  sitiosDeApoyoConfig: () => sitiosDeApoyoConfig
});
module.exports = __toCommonJS(index_exports);

// dist/layer-configs.ts
var feminicidiosFiscaliaConfig = {
  sourceId: "feminicidios-fiscalia-source",
  layerId: "feminicidios-fiscalia-layer",
  sourceConfig: {
    type: "vector",
    url: "mapbox://stock44.6cae6ijm"
  },
  layerConfig: {
    type: "circle",
    "source-layer": "empresas-6uxgdw",
    maxzoom: 20,
    minzoom: 7,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "NUMPOINTS"],
        1,
        5,
        15,
        20
      ],
      "circle-color": "#ec5151",
      "circle-blur": 1
    }
  }
};
var feminicidiosPeriodicosConfig = {
  sourceId: "feminicidios-periodicos-source",
  layerId: "feminicidios-periodicos-layer",
  sourceConfig: {
    type: "vector",
    url: "mapbox://stock44.19vijq6m"
  },
  layerConfig: {
    type: "circle",
    "source-layer": ".",
    maxzoom: 20,
    minzoom: 7,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "NUMPOINTS"],
        1,
        5,
        15,
        20
      ],
      "circle-color": "#ec5151",
      "circle-blur": 1
    }
  }
};
var areaSinCubrimientoConfig = {
  sourceId: "area-sin-cubrimiento-source",
  layerId: "area-sin-cubrimiento-layer",
  sourceConfig: {
    type: "vector",
    url: "mapbox://your.tileset.id"
    // Reemplaza con tu URL correcto
  },
  layerConfig: {
    type: "fill",
    "source-layer": "your-source-layer",
    // Reemplaza con tu source-layer correcto
    paint: {
      "fill-color": "#ff0000",
      "fill-opacity": 0.5
    }
  }
};
var rezagoSocialConfig = {
  sourceId: "rezago-social-source",
  layerId: "rezago-social-layer",
  sourceConfig: {
    type: "vector",
    url: "mapbox://your.tileset.id"
    // Reemplaza con tu URL correcto
  },
  layerConfig: {
    type: "fill",
    "source-layer": "your-source-layer",
    // Reemplaza con tu source-layer correcto
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "rezago"],
        0,
        "#ffffff",
        1,
        "#ff0000"
      ],
      "fill-opacity": 0.7
    }
  }
};
var sitiosDeApoyoConfig = {
  sourceId: "sitios-de-apoyo-source",
  layerId: "sitios-de-apoyo-layer",
  sourceConfig: {
    type: "vector",
    url: "mapbox://your.tileset.id"
    // Reemplaza con tu URL correcto
  },
  layerConfig: {
    type: "circle",
    "source-layer": "your-source-layer",
    // Reemplaza con tu source-layer correcto
    paint: {
      "circle-radius": 6,
      "circle-color": "#4CAF50",
      "circle-opacity": 0.8
    }
  }
};
var modeloConfig = {
  sourceId: "modelo-source",
  layerId: "modelo-layer",
  sourceConfig: {
    type: "vector",
    url: "mapbox://your.tileset.id"
    // Reemplaza con tu URL correcto
  },
  layerConfig: {
    type: "heatmap",
    "source-layer": "your-source-layer",
    // Reemplaza con tu source-layer correcto
    paint: {
      "heatmap-weight": ["get", "probability"],
      "heatmap-intensity": 1,
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(0, 0, 255, 0)",
        0.5,
        "rgba(0, 255, 0, 1)",
        1,
        "rgba(255, 0, 0, 1)"
      ],
      "heatmap-radius": 30
    }
  }
};

// dist/map-layer.ts
var MapLayer = class {
  sourceId;
  layerId;
  sourceConfig;
  layerConfig;
  constructor(config) {
    this.sourceId = config.sourceId;
    this.layerId = config.layerId;
    this.sourceConfig = config.sourceConfig;
    this.layerConfig = {
      ...config.layerConfig,
      id: config.layerId,
      source: config.sourceId
    };
  }
  addSource(map) {
    if (!map.getSource(this.sourceId)) {
      map.addSource(this.sourceId, this.sourceConfig);
    }
  }
  addLayer(map) {
    if (!map.getLayer(this.layerId)) {
      map.addLayer(this.layerConfig);
    }
  }
  removeLayer(map) {
    if (map.getLayer(this.layerId)) {
      map.removeLayer(this.layerId);
    }
  }
  removeSource(map) {
    if (map.getSource(this.sourceId)) {
      map.removeSource(this.sourceId);
    }
  }
};

// dist/map-manager.ts
var MapManager = class {
  layers;
  map;
  constructor() {
    this.layers = {};
    this.map = null;
  }
  setMap(map) {
    this.map = map;
  }
  registerLayer(config) {
    const layer = new MapLayer(config);
    this.layers[config.layerId] = layer;
    return layer;
  }
  addSource(layerId) {
    if (!this.map) return;
    const layer = this.layers[layerId];
    if (layer) {
      layer.addSource(this.map);
    }
  }
  addLayer(layerId) {
    if (!this.map) return;
    const layer = this.layers[layerId];
    if (layer) {
      layer.addLayer(this.map);
    }
  }
  removeLayer(layerId) {
    if (!this.map) return;
    const layer = this.layers[layerId];
    if (layer) {
      layer.removeLayer(this.map);
    }
  }
  removeSource(layerId) {
    if (!this.map) return;
    const layer = this.layers[layerId];
    if (layer) {
      layer.removeSource(this.map);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MapLayer,
  MapManager,
  areaSinCubrimientoConfig,
  feminicidiosFiscaliaConfig,
  feminicidiosPeriodicosConfig,
  modeloConfig,
  rezagoSocialConfig,
  sitiosDeApoyoConfig
});
//# sourceMappingURL=index.cjs.map