import {useMap} from '@/components/mapbox-map.tsx';
import {useEffect, useId, useState} from 'react';
import {InteractionEvent, Layer, SourceSpecification} from 'mapbox-gl';
import useDeepCompareEffect from 'use-deep-compare-effect';

export type LayerProps = {
	readonly source: SourceSpecification;
	readonly layer: Omit<Layer, 'source' | 'id'>;
	readonly isEnabled?: boolean;
	readonly onMouseEnter?: (event: InteractionEvent) => void;
	readonly onMouseMove?: (event: InteractionEvent) => void;
	readonly onMouseLeave?: (event: InteractionEvent) => void;
};

/**
 * Adds a layer to the map and ensures proper cleanup by removing the layer when the component is unmounted.
 */
export function MapLayer(props: LayerProps) {
	const {
		source,
		layer,
		isEnabled = true,
		onMouseEnter,
		onMouseMove,
		onMouseLeave,
	} = props;

	const map = useMap();

	const sourceId = useId();
	const layerId = useId();

	const [sourceLoaded, setSourceLoaded] = useState(false);

	const [layerLoaded, setLayerLoaded] = useState(false);

	useEffect(() => {
		if (onMouseLeave === undefined || !layerLoaded) return;

		map.addInteraction(`${layerId}-mouse-leave`, {
			type: 'mouseleave',
			target: {layerId},
			handler: onMouseLeave,
		});

		return () => {
			map.removeInteraction(`${layerId}-mouse-leave`);
		};
	}, [layerId, layerLoaded, map, onMouseLeave]);

	useEffect(() => {
		if (onMouseEnter === undefined || !layerLoaded) return;

		map.addInteraction(`${layerId}-mouse-enter`, {
			type: 'mouseenter',
			target: {layerId},
			handler: onMouseEnter,
		});

		return () => {
			map.removeInteraction(`${layerId}-mouse-enter`);
		};
	}, [layerId, layerLoaded, map, onMouseEnter]);

	useEffect(() => {
		if (onMouseMove === undefined || !layerLoaded) return;

		map.addInteraction(`${layerId}-mouse-move`, {
			type: 'mousemove',
			target: {layerId},
			handler: onMouseMove,
		});

		return () => {
			map.removeInteraction(`${layerId}-mouse-move`);
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
