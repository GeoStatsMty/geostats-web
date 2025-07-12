'use client';
import {FiltersList, MapFilters} from '../components/filters-list.tsx';
import {Button} from 'ui';
import {MapboxMap} from '../components/mapbox-map';
import {Menu} from 'lucide-react';
import {useState} from 'react';
import {ModalSheet} from '@/components/modal-sheet.tsx';

/**
 * The `Home` function represents the main component for rendering the application UI.
 * It includes a map, a draggable UI sheet, filter options, and various interactive elements.
 * Features:
 * - Displays a map interface.
 * - Contains a draggable bottom sheet for additional functionality.
 * - Includes filter options with an interactive panel to apply filters.
 * - Provides accessibility to interaction controls for UI elements, scrolling, and animations.
 * @returns The rendered `Home` component containing all its UI elements and interactive features.
 */
export default function Home() {
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [mapFilters, setMapFilters] = useState<MapFilters>({
		showFiscalia: true,
		showCubrimientoDeSitio: false,
		showRezagoSocial: false,
		showSitiosDeApoyo: false,
		showModelo: false,
		showPeriodico: true,
	});
	const [showFilters, setShowFilters] = useState(false);

	return (
		<main className='w-screen h-dvh relative bg-neutral-800 overflow-hidden'>
			<MapboxMap
				showFiscalia={mapFilters.showFiscalia}
				showCubrimientoDeSitio={mapFilters.showCubrimientoDeSitio}
				showRezagoSocial={mapFilters.showRezagoSocial}
				showSitiosDeApoyo={mapFilters.showSitiosDeApoyo}
				showModelo={mapFilters.showModelo}
				showPeriodico={mapFilters.showPeriodico}
			/>

			<ModalSheet
				isOpen={isSheetOpen}
				onOpenChange={setIsSheetOpen}
				header={
					<>
						<h1 className='text-stone-200 text-2xl font-semibold'>
							Feminicidios en Nuevo León
						</h1>
						<h2 className='text-sm text-stone-200'>
							Modelo predictivo y situación actual
						</h2>
					</>
				}
				controls={
					<Button
						variant='secondary'
						size='icon'
						className={`w-10 h-10 shadow-md flex justify-center rounded-md ${
							showFilters
								? 'bg-white'
								: 'bg-neutral-900 hover:bg-[#1A1A1A]'
						}`}
						onClick={() => {
							setShowFilters(!showFilters);
							setIsSheetOpen(!showFilters);
						}}
					>
						<Menu
							className={`h-6 w-6 ${showFilters ? 'text-neutral-900' : 'text-[#FAFAFA]'}`}
						/>
					</Button>
				}
			>
				<div className='flex flex-col items-center '>
					{showFilters ? (
						<div className='w-full mb-6'>
							<FiltersList
								filters={mapFilters}
								onFiltersChange={setMapFilters}
							/>
						</div>
					) : (
						<div className='flex flex-col items-center text-stone-300'>
							<p className='mb-3'>
								El feminicidio se define como el asesinato de
								una mujer por su genero. México se encuentra
								entre los países con mayores tasas de
								feminicidios. Dentro de está situación, el
								estado de Nuevo León presenta una de las tasas
								más elevadas a nivel nacional, siendo uno de los
								estados con mayor acontecimiento de este tipo de
								delito. Está es una crisis multifacética, la
								cual afecta a todas las personas viviendo en la
								entidad. Los efectos de un feminicidio no acaban
								con la víctima. Este es un fenómeno qué afecta a
								todas las personas cercanas, tanto a la víctima
								como a la comunidad. Por lo tanto, la
								organización de Futuro con Derechos busca apoyar
								a estas víctimas indirectas (NNA) por el delito
								de feminicidio. La organización busca brindar
								apoyo integral, con el objetivo de mitigar el
								impacto social y contribuir a un entorno más
								seguro y resiliente.
							</p>
							<p className=''>
								Para apoyar a la causa, GeoStats entró en
								colaboración con Futuro con Derechos para apoyar
								en la generación de una fuente de datos
								geográfica qué ayude a determinar el número
								correcto de posibles víctimas indirectas por el
								delito de feminicidio en Nuevo León.
								Adicionalmente, se propone la definición de un
								modelo predictivo qué identifique las zonas del
								estado de Nuevo León qué sean más propensas a
								qué sucedan feminicidios.
							</p>
						</div>
					)}
				</div>
			</ModalSheet>
		</main>
	);
}
