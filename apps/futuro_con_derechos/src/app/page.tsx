'use client';

/* Limpiar código, documentar y agregar diseño responsivo. */
import TopBar from '@/components/top-bar.tsx';
import dynamic from 'next/dynamic';
import {Paper, Switch} from 'geostats-ui';
import {Button} from 'react-aria-components';
import {useState} from 'react';
import ChevronRight from '@material-design-icons/svg/round/chevron_right.svg';

// Cargando componentes de manera dinámica para evitar SSR
const MainMap = dynamic(() => import('@/components/main-map.tsx'), {
	ssr: false,
});

const InformationPanel = dynamic(
	() => import('@/components/information-panel.tsx'),
	{ssr: false},
);

export default function Home() {
	// Estados para los controles
	const [showControls, setShowControls] = useState(false);
	const [showFiscalia, setShowFiscalia] = useState(false);
	const [showCubrimientoDeSitio, setShowCubrimientoDeSitio] = useState(true);
	const [showRezagoSocial, setShowRezagoSocial] = useState(true);
	const [showSitiosDeApoyo, setShowSitiosDeApoyo] = useState(true);
	const [showModelo, setShowModelo] = useState(false);
	const [showInformationPanel, setShowInformationPanel] = useState(false);

	return (
		<main className='h-screen w-screen overflow-hidden bg-stone-950 text-stone-300'>
			{/* Barra superior con animación de deslizamiento hacia arriba */}
			<TopBar
				className={
					'fixed left-0 top-0 z-50 w-full translate-y-0 transition-transform duration-500'
				}
			/>

			<div className='relative size-full'>
				{/* Panel de Información con animación y transición */}
				<InformationPanel
					className={`absolute left-0 top-0 z-50 h-full transition-all duration-300 
          ${showInformationPanel ? 'w-[95%] md:w-[30%]' : 'w-0'}`}
					showInformationPanel={showInformationPanel}
				>
					<Button
						className='absolute right-0 flex items-center justify-center rounded-md bg-inherit'
						onPress={() =>
							setShowInformationPanel(!showInformationPanel)
						}
					>
						<ChevronRight className='fill-white' />
					</Button>
				</InformationPanel>

				{/* Overlay global con transición de opacidad */}
				<div
					className={`absolute inset-0 z-40 bg-black transition-opacity duration-500 ease-in-out 
          ${showInformationPanel ? 'opacity-70' : 'pointer-events-none opacity-0'}`}
				/>

				{/* Mapa principal con posición fija */}
				<div className='absolute inset-0 z-30'>
					<MainMap
						className='size-full'
						showModelo={showModelo}
						showFiscalia={showFiscalia}
						showCubrimientoDeSitio={showCubrimientoDeSitio}
						showRezagoSocial={showRezagoSocial}
						showSitiosDeApoyo={showSitiosDeApoyo}
					/>
				</div>

				{/* Controles para pantallas grandes */}
				<Paper className='absolute right-8 top-20 z-50 hidden md:block'>
					<div className='mb-4 inline-flex w-full flex-row rounded-md border border-gray-400'>
						<Button
							className={`flex-1 rounded-md p-2 ${
								showFiscalia
									? 'bg-white text-black'
									: 'bg-inherit text-white'
							}`}
							onPress={() => setShowFiscalia(true)}
						>
							Fiscalia
						</Button>
						<Button
							className={`flex-1 rounded-md p-2 ${
								showFiscalia
									? 'bg-inherit text-white'
									: 'bg-white text-black'
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

				{/* Controles para pantallas pequeñas */}
				<div className='fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-4 md:hidden'>
					<Button
						className={`rounded-full p-3 ${
							showFiscalia
								? 'bg-white text-black'
								: 'bg-stone-900 text-white'
						}`}
						onPress={() => setShowFiscalia(true)}
					>
						Fiscalía
					</Button>
					<Button
						className='rounded-full bg-stone-900 p-3 text-white'
						onPress={() => setShowControls(!showControls)}
					>
						<ChevronRight className='rotate-90 fill-white' />
					</Button>
					<Button
						className={`rounded-full p-3 ${
							showFiscalia
								? 'bg-stone-900 text-white'
								: 'bg-white text-black'
						}`}
						onPress={() => setShowFiscalia(false)}
					>
						Periódico
					</Button>
				</div>

				{/* Menú centrado en pantalla */}
				<Paper
					className={`fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 transition-all duration-300 ${
						showControls
							? 'scale-100 opacity-100'
							: 'pointer-events-none scale-90 opacity-0'
					}`}
				>
					<div className='w-full max-w-lg rounded-md bg-black p-6 shadow-lg'>
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
							label='Mostrar Predicciones del Modelo'
							isSelected={showModelo}
							onChange={setShowModelo}
							className='mb-4'
						/>
					</div>
				</Paper>
			</div>
		</main>
	);
}
