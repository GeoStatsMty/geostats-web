import { Layer, Map, Source } from 'mapbox-gl';

export interface MapLayerConfig {
  sourceId: string;
  layerId: string;
  sourceConfig: Source;
  layerConfig: Omit<Layer, 'id' | 'source'>;
}

export class MapLayer {
  private readonly sourceId: string;
  private readonly layerId: string;
  private readonly sourceConfig: Source;
  private readonly layerConfig: Layer;

  constructor(config: MapLayerConfig) {
    this.sourceId = config.sourceId;
    this.layerId = config.layerId;
    this.sourceConfig = config.sourceConfig;
    this.layerConfig = {
      ...config.layerConfig,
      id: config.layerId,
      source: config.sourceId,
    };
  }

  addSource(map: Map): void {
    if (!map.getSource(this.sourceId)) {
      map.addSource(this.sourceId, this.sourceConfig);
    }
  }

  addLayer(map: Map): void {
    if (!map.getLayer(this.layerId)) {
      map.addLayer(this.layerConfig);
    }
  }

  removeLayer(map: Map): void {
    if (map.getLayer(this.layerId)) {
      map.removeLayer(this.layerId);
    }
  }

  removeSource(map: Map): void {
    if (map.getSource(this.sourceId)) {
      map.removeSource(this.sourceId);
    }
  }
}