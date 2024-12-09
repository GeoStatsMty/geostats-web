'use client';

import TopBar from '@/components/top-bar.tsx';
import dynamic from 'next/dynamic';
import {Paper, Switch} from 'geostats-ui';
import {Button} from 'react-aria-components';
import {useState} from 'react';
import ChevronRight from '@material-design-icons/svg/round/chevron_right.svg';

const MainMap = dynamic(() => import('@/components/main-map.tsx'), {
	ssr: false,
});

const InformationPanel = dynamic(
	() => import('@/components/information-panel.tsx'),
	{ssr: false},
);

export default function Home() {
	const [showFiscalia, setShowFiscalia] = useState(false);
	const [showCubrimientoDeSitio, setShowCubrimientoDeSitio] = useState(true);
	const [showRezagoSocial, setShowRezagoSocial] = useState(true);
	const [showSitiosDeApoyo, setShowSitiosDeApoyo] = useState(true);
	const [showModelo, setShowModelo] = useState(false);
	const [showInformationPanel, setShowInformationPanel] = useState(false);

	console.log('Information Panel:', showInformationPanel);
	console.log('Rezago:', showRezagoSocial);

	return (
		<main className='h-screen w-screen overflow-hidden bg-stone-950 text-stone-300'>
			<TopBar />

			<div className='flex h-full'>
				{/* Panel de Información con animación */}
				<InformationPanel
					className={`z-50 mt-16 transition-all duration-300 ${showInformationPanel ? 'w-[30%]' : 'w-0'}`}
					showInformationPanel={showInformationPanel}
				>
					<Button
						className='absolute right-0 bg-inherit flex justify-center items-center rounded-md'
						onPress={() =>
							setShowInformationPanel(!showInformationPanel)
						}
					>
						<ChevronRight className='fill-white' />
					</Button>
				</InformationPanel>

				{/* Mapa principal que se ajusta al espacio restante */}
				<div
					className={`flex-grow transition-all duration-300 ${showInformationPanel ? 'w-[70%]' : 'w-full'}`}
				>
					<MainMap
						className='h-full'
						showModelo={showModelo}
						showFiscalia={showFiscalia}
						showCubrimientoDeSitio={showCubrimientoDeSitio}
						showRezagoSocial={showRezagoSocial}
						showSitiosDeApoyo={showSitiosDeApoyo}
					/>
				</div>

				{/* Controles en la parte superior */}
				<Paper className='absolute right-8 top-20 z-50'>
					<div className='inline-flex flex-row mb-4 border border-gray-400 rounded-md w-full'>
						<Button
							className={`flex-1 flex justify-center items-center text-center p-2 rounded-md ${
								showFiscalia
									? 'bg-white text-black'
									: 'bg-inherit text-white'
							}`}
							onPress={() => setShowFiscalia(true)}
						>
							Fiscalia
						</Button>

						<Button
							className={`flex-1 flex justify-center items-center text-center p-2 rounded-md ${
								!showFiscalia
									? 'bg-white text-black'
									: 'bg-inherit text-white'
							}`}
							onPress={() => setShowFiscalia(false)}
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

					<Switch
						label='Mostrar predicciones del modelo'
						isSelected={showModelo}
						onChange={setShowModelo}
						className='mb-4'
					/>
				</Paper>
			</div>
		</main>
	);
}
