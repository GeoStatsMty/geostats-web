import {useMap} from '@/components/mapbox-map.tsx';
import {SourceSpecification} from 'mapbox-gl';
import {ReactNode, useEffect} from 'react';

export type SourceProps = {
	sourceId: string;
	spec: SourceSpecification;
	children: ReactNode;
};

/**
 * A React component that adds a source to a map using the Mapbox map instance, then removes it when the component is unmounted.
 */
export function MapSource(props: SourceProps) {
	const {sourceId, spec} = props;

	const map = useMap();

	useEffect(() => {
		if (map.getSource(sourceId) !== undefined) return;

		map.addSource(sourceId, spec);

		return () => {
			map.removeSource(sourceId);
		};
	}, [map, sourceId, spec]);
}
