import { Map } from 'mapbox-gl';
import { MapLayer, MapLayerConfig } from './map-layer';

export class MapManager {
  private layers: Record<string, MapLayer>;
  private map: Map | null;

  constructor() {
    this.layers = {};
    this.map = null;
  }

  setMap(map: Map) {
    this.map = map;
  }

  registerLayer(config: MapLayerConfig) {
    const layer = new MapLayer(config);
    this.layers[config.layerId] = layer;
    return layer;
  }

  addSource(layerId: string) {
    if (!this.map) return;
    const layer = this.layers[layerId];
    if (layer) {
      layer.addSource(this.map);
    }
  }

  addLayer(layerId: string) {
    if (!this.map) return;
    const layer = this.layers[layerId];
    if (layer) {
      layer.addLayer(this.map);
    }
  }

  removeLayer(layerId: string) {
    if (!this.map) return;
    const layer = this.layers[layerId];
    if (layer) {
      layer.removeLayer(this.map);
    }
  }

  removeSource(layerId: string) {
    if (!this.map) return;
    const layer = this.layers[layerId];
    if (layer) {
      layer.removeSource(this.map);
    }
  }
}