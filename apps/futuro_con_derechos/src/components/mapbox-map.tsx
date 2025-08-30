import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import mapboxgl, {LngLatBoundsLike, LngLatLike, Map} from 'mapbox-gl';

mapboxgl.accessToken =
	'pk.eyJ1Ijoic3RvY2s0NCIsImEiOiJjbHE0amx3aXEwODQyMmlsb3RnNHk0MDN1In0.qWALc9kC_uuNNBucnTeauw';

const mapContext = createContext<Map | undefined>(undefined);

/**
 * Custom hook that provides access to the Mapbox map instance from the context.
 * This hook must be used within a Mapbox map provider.
 */
export function useMap() {
	const map = useContext(mapContext);
	if (!map) {
		throw new Error('useMap must be used within a MapboxMap');
	}
	return map;
}

export type MapboxMapProps = {
	readonly style: string;

	readonly className?: string;

	readonly initialCoordinate?: LngLatLike;
	readonly maxBounds?: LngLatBoundsLike;
	readonly zoom?: number;

	readonly children: ReactNode;
};

/**
 * A React component that initializes and renders a Mapbox map inside a container.
 */
export function MapboxMap(props: MapboxMapProps) {
	const {initialCoordinate, maxBounds, zoom, className, style} = props;

	const containerRef = useRef<HTMLDivElement>(null);

	const mapRef = useRef<Map>(undefined);

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (!containerRef.current) return;

		const map = new Map({
			container: containerRef.current,
			style,
			center: initialCoordinate,
			maxBounds,
			zoom: zoom ?? 10.5,
		});

		mapRef.current = map;

		map.on('load', () => {
			setIsLoaded(true);
		});

		return () => {
			map.remove();
		};
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (zoom === undefined) return;
		mapRef.current?.setZoom(zoom);
	}, [zoom]);

	return (
		<div ref={containerRef} className={className}>
			{isLoaded && mapRef.current && (
				<mapContext.Provider value={mapRef.current}>
					{props.children}
				</mapContext.Provider>
			)}
		</div>
	);
}
