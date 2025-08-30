import {useMap} from '@/components/mapbox-map.tsx';
import {useEffect, useId, useState} from 'react';
import {Layer, type MapMouseEvent, SourceSpecification} from 'mapbox-gl';
import useDeepCompareEffect from 'use-deep-compare-effect';

export type LayerProps = {
	readonly source: SourceSpecification;
	readonly layer: Omit<Layer, 'source' | 'id'>;
	readonly isEnabled?: boolean;
	readonly onMouseMove?: (event: MapMouseEvent) => void;
	readonly onMouseLeave?: (event: MapMouseEvent) => void;
};

/**
 * Adds a layer to the map and ensures proper cleanup by removing the layer when the component is unmounted.
 */
export function MapLayer(props: LayerProps) {
	const {source, layer, isEnabled = true, onMouseMove, onMouseLeave} = props;

	const map = useMap();

	const sourceId = useId();
	const layerId = useId();

	const [sourceLoaded, setSourceLoaded] = useState(false);

	const [layerLoaded, setLayerLoaded] = useState(false);

	useEffect(() => {
		if (onMouseLeave === undefined || !layerLoaded) return;

		map.on('mouseleave', layerId, onMouseLeave);

		return () => {
			map.off('mouseleave', layerId, onMouseLeave);
		};
	}, [layerId, layerLoaded, map, onMouseLeave]);

	useEffect(() => {
		if (onMouseMove === undefined || !layerLoaded) return;

		map.on('mousemove', layerId, onMouseMove);

		return () => {
			map.off('mousemove', layerId, onMouseMove);
		};
	}, [layerId, layerLoaded, map, onMouseMove]);

	useDeepCompareEffect(() => {
		map.addSource(sourceId, source);
		setSourceLoaded(true);

		return () => {
			map.removeSource(sourceId);
			setSourceLoaded(false);
		};
	}, [map, source, sourceId]);

	useDeepCompareEffect(() => {
		if (isEnabled && sourceLoaded) {
			map.addLayer({
				...layer,
				source: sourceId,
				id: layerId,
			});
			setLayerLoaded(true);

			return () => {
				map.removeLayer(layerId);
				setLayerLoaded(false);
			};
		}
	}, [isEnabled, layer, layerId, map, sourceId, sourceLoaded]);

	return null;
}
