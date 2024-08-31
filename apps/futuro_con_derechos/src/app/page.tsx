'use client'

import TopBar from '@/components/top-bar.tsx';
import dynamic from 'next/dynamic';
import {Button, Paper} from 'geostats-ui';
import { useState } from 'react';

const MainMap = dynamic(() => import('@/components/main-map.tsx'), {
	ssr: false,
});


export default function Home() {

	const [showFiscalia, setShowFiscalia] = useState(false); 

	return (
		<main className='h-screen w-screen overflow-hidden bg-stone-950 text-stone-300'>
			<TopBar />
			<Paper className='absolute right-8 top-20 z-50'>

				<Button onPress={() => {setShowFiscalia(prevState => !prevState)}} >
					Cambiar de vista
				</Button>
				
			</Paper>
			<MainMap className='h-full' showFiscalia={showFiscalia} />
		</main>
	);
}
