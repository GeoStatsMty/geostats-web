import dynamic from 'next/dynamic';
import {ComponentType} from 'react';

export const GeostatsTileLayer: ComponentType = dynamic(
	() => import('./geostats-tile-layer.tsx'),
	{
		ssr: false,
	},
);
