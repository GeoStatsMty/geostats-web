import { AnySourceData, Layer, Map } from 'mapbox-gl';

interface MapLayerConfig {
    sourceId: string;
    layerId: string;
    sourceConfig: AnySourceData;
    layerConfig: Omit<Layer, 'id' | 'source'>;
}
declare class MapLayer {
    private readonly sourceId;
    private readonly layerId;
    private readonly sourceConfig;
    private readonly layerConfig;
    constructor(config: MapLayerConfig);
    addSource(map: Map): void;
    addLayer(map: Map): void;
    removeLayer(map: Map): void;
    removeSource(map: Map): void;
}

declare const feminicidiosFiscaliaConfig: MapLayerConfig;
declare const feminicidiosPeriodicosConfig: MapLayerConfig;
declare const areaSinCubrimientoConfig: MapLayerConfig;
declare const rezagoSocialConfig: MapLayerConfig;
declare const sitiosDeApoyoConfig: MapLayerConfig;
declare const modeloConfig: MapLayerConfig;

declare class MapManager {
    private layers;
    private map;
    constructor();
    setMap(map: Map): void;
    registerLayer(config: MapLayerConfig): MapLayer;
    addSource(layerId: string): void;
    addLayer(layerId: string): void;
    removeLayer(layerId: string): void;
    removeSource(layerId: string): void;
}

export { MapLayer, type MapLayerConfig, MapManager, areaSinCubrimientoConfig, feminicidiosFiscaliaConfig, feminicidiosPeriodicosConfig, modeloConfig, rezagoSocialConfig, sitiosDeApoyoConfig };
