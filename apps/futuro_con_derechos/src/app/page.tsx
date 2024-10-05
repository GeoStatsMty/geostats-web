'use client';

import TopBar from '@/components/top-bar.tsx';
import dynamic from 'next/dynamic';
import { Paper, Switch} from 'geostats-ui';
import {Button} from 'react-aria-components'
import {useEffect, useState} from 'react';

const MainMap = dynamic(() => import('@/components/main-map.tsx'), {
	ssr: false,
});

export default function Home() {
	const [showFiscalia, setShowFiscalia] = useState(false);
	const [showCubrimientoDeSitio, setShowCubrimientoDeSitio] = useState(false);
	const [showRezagoSocial, setShowRezagoSocial] = useState(false);
	const [showSitiosDeApoyo, setShowSitiosDeApoyo] = useState(false);

	return (
		<main className='h-screen w-screen overflow-hidden bg-stone-950 text-stone-300'>
			<TopBar />
			<Paper className='absolute right-8 top-20 z-50'>
				{/*
				
					<Switch
					label='Mostrar fiscalía'
					isSelected={showFiscalia}
					onChange={setShowFiscalia}
					className='mb-2'
					/>
				
				*/}
				
				<div className="inline-flex flex-row mb-4 border border-gray-400 rounded-md w-full">
					<Button
						className={`flex-1 flex justify-center items-center text-center p-2 rounded-md ${
						showFiscalia ? "bg-white text-black" : "bg-inherit  text-white"
						}`}
						onPress={() => setShowFiscalia(true)} // `onPress` es parte de react-aria
					> 
						Fiscalia
					</Button>

					<Button
						className={`flex-1 flex justify-center items-center text-center p-2 rounded-md ${
						!showFiscalia ? "bg-white text-black" : "bg-inherit  text-white"
						}`}
						onPress={() => setShowFiscalia(false)} // `onPress` es parte de react-aria
					> 
						Periodico
					</Button>

				</div>



				<Switch
					label='Mostrar Cubrimiento De Sitio'
					isSelected={showCubrimientoDeSitio}
					onChange={setShowCubrimientoDeSitio}
					className='mb-4'
				/>

				<Switch
					label='Mostrar Rezago Social'
					isSelected={showRezagoSocial}
					onChange={setShowRezagoSocial}
					className='mb-4'
				/>
				<Switch
					label='Mostrar Sitios De Apoyo'
					isSelected={showSitiosDeApoyo}
					onChange={setShowSitiosDeApoyo}
					className='mb-4'
				/>
			</Paper>
			<MainMap className='h-full' 
			showFiscalia={showFiscalia} 
			showCubrimientoDeSitio = {showCubrimientoDeSitio}
			showRezagoSocial = {showRezagoSocial}
			showSitiosDeApoyo = {showSitiosDeApoyo}
			/>
		</main>
	);
}
