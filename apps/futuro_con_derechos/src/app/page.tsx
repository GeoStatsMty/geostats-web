'use client';
import {MapFilters} from '../components/filters-list.tsx';
import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'ui';
import {MapboxMap} from '../components/mapbox-map';
import {useState} from 'react';
import {ModalSheet} from '@/components/modal-sheet.tsx';
import {Layers} from 'lucide-react';
import useWindowDimensions from '@/hooks/use-window-dimensions.ts';

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
	const { width } = useWindowDimensions();
	const isMobile = width < 1024;

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
			{isMobile ? (
				<ModalSheet
					isOpen={isSheetOpen}
					onOpenChange={setIsSheetOpen}
					header={
						<>
							<h1 className='text-stone-200 text-2xl font-semibold'>
								Feminicidios en Nuevo León
							</h1>
							<p className='text-sm text-stone-200'>
								Modelo predictivo y situación actual
							</p>
						</>
					}
					controls={
						<Sheet>
							<SheetTrigger asChild>
								<Button
									size='icon'
									onClick={() => {
										setShowFilters(!showFilters);
										setIsSheetOpen(!showFilters);
									}}
								>
									<Layers />
								</Button>
							</SheetTrigger>
							<SheetContent side='bottom'>
								<SheetHeader>
									<SheetTitle>Mostrar/ocultar capas</SheetTitle>
									<SheetDescription>
										Aquí puedes modificar cuales capas son
										visibles en el mapa.
									</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					}
				>
					<div className='text-stone-300'>
						<p className='m"-6'>
							El mapa que se puede ver en esta página permite observar
							las ubicaciones dentro del Area Metropolitana de
							Monterrey donde hay una mayor incidencia de
							feminicidios.
						</p>

						<h2 className='font-se"ibold text-lg mb-1'>Introducción</h2>
						<p className='pb-3'>
							El feminicidio se define como el asesinato de una mujer
							por su genero. México se encuentra entre los países con
							mayores tasas de feminicidios. Dentro de está situación,
							el estado de Nuevo León presenta una de las tasas más
							elevadas a nivel nacional, siendo uno de los estados con
							mayor acontecimiento de este tipo de delito. Está es una
							crisis multifacética, la cual afecta a todas las
							personas viviendo en la entidad. Los efectos de un
							feminicidio no acaban con la víctima. Este es un
							fenómeno qué afecta a todas las personas cercanas, tanto
							a la víctima como a la comunidad. Por lo tanto, la
							organización de Futuro con Derechos busca apoyar a estas
							víctimas indirectas (NNA) por el delito de feminicidio.
							La organización busca brindar apoyo integral, con el
							objetivo de mitigar el impacto social y contribuir a un
							entorno más seguro y resiliente.
						</p>
						<p>
							Para apoyar a la causa, GeoStats entró en colaboración
							con Futuro con Derechos para apoyar en la generación de
							una fuente de datos geográfica qué ayude a determinar el
							número correcto de posibles víctimas indirectas por el
							delito de feminicidio en Nuevo León. Adicionalmente, se
							propone la definición de un modelo predictivo qué
							identifique las zonas del estado de Nuevo León qué sean
							más propensas a qué sucedan feminicidios.
						</p>
					</div>
				</ModalSheet>
			) : (
				<aside className='absolute top-0 right-0 w-[400px] h-full bg-neutral-900 p-6 overflow-y-auto text-stone-300 z-20 shadow-lg'>
					<h1 className='text-2x1 font-semibold mb-1'>
						Feminicidios en el Área Metropolitana
					</h1>
					<p className='text-sm mb-4'>Modelo predictivo y situación actual</p>

					<p className='mb-3'>
						El mapa que se puede ver en esta página permite observar las ubicaciones dentro del Área Metropolitana de Monterrey donde hay una mayor incidencia de feminicidios.
					</p>

					<h2 className='font-semibold text-lg mb-1'>Introducción</h2>
					<p className='mb-3'>
						El feminicidio se define como el asesinato de una mujer
						por su genero. México se encuentra entre los países con
						mayores tasas de feminicidios. Dentro de está situación,
						el estado de Nuevo León presenta una de las tasas más
						elevadas a nivel nacional, siendo uno de los estados con
						mayor acontecimiento de este tipo de delito. Está es una
						crisis multifacética, la cual afecta a todas las
						personas viviendo en la entidad. Los efectos de un
						feminicidio no acaban con la víctima. Este es un
						fenómeno qué afecta a todas las personas cercanas, tanto
						a la víctima como a la comunidad. Por lo tanto, la
						organización de Futuro con Derechos busca apoyar a estas
						víctimas indirectas (NNA) por el delito de feminicidio.
						La organización busca brindar apoyo integral, con el
						objetivo de mitigar el impacto social y contribuir a un
						entorno más seguro y resiliente.
					</p>
					<p>
						Para apoyar a la causa, GeoStats entró en colaboración
						con Futuro con Derechos para apoyar en la generación de
						una fuente de datos geográfica qué ayude a determinar el
						número correcto de posibles víctimas indirectas por el
						delito de feminicidio en Nuevo León. Adicionalmente, se
						propone la definición de un modelo predictivo qué
						identifique las zonas del estado de Nuevo León qué sean
						más propensas a qué sucedan feminicidios.
					</p>
				</aside>
		)}
		</main>
	)};
