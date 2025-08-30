'use client';
import {FiltersList, MapFilters} from '../components/filters-list.tsx';
import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'ui';
import {useState} from 'react';
import {ModalSheet} from '@/components/modal-sheet.tsx';
import {Layers} from 'lucide-react';
import useWindowDimensions from '@/hooks/use-window-dimensions.ts';
import {MapboxMap} from '@/components/mapbox-map.tsx';
import {RezagoSocialLayer} from '@/components/layers/rezago-social-layer.tsx';
import {FeminicidiosEnPeriodicosLayer} from '@/components/layers/feminicidios-en-periodicos-layer.tsx';
import {FeminicidiosEnFiscaliaLayer} from '@/components/layers/feminicidios-en-fiscalia-layer.tsx';
import {AreaSinCubrimientoDeSitioLayer} from '@/components/layers/area-sin-cubrimiento-de-sitio-layer.tsx';
import {SitiosDeApoyoLayer} from '@/components/layers/sitios-de-apoyo-layer.tsx';
import {ModeloPredictivoLayer} from '@/components/layers/modelo-predictivo-layer.tsx';

const monterreyLat = 25.67;
const monterreyLng = -100.32;
const initialZoom = 10.5;

/**
 * The Home component renders the main layout for the Feminicidios en Nuevo León map visualization. It includes various map layers, controls, and introductory content explaining the problem of feminicidios in Nuevo León. The component adapts the layout for mobile and desktop devices.
 */
export default function Home() {
	const {width} = useWindowDimensions();
	const isMobile = width < 1024;

	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const [filters, setFilters] = useState<MapFilters>({
		showFiscalia: true,
		showCubrimientoDeSitio: true,
		showRezagoSocial: true,
		showSitiosDeApoyo: true,
		showModelo: true,
		showPeriodico: true,
	});

	const {
		showFiscalia,
		showCubrimientoDeSitio,
		showRezagoSocial,
		showSitiosDeApoyo,
		showModelo,
		showPeriodico,
	} = filters;

	return (
		<main className='w-screen h-screen g-neutral-800 overflow-hidden absolute inset-0'>
			<MapboxMap
				style='mapbox://styles/stock44/clwwmpmk7003501nm1y6eh0q4'
				initialCoordinate={[monterreyLng, monterreyLat]}
				maxBounds={[
					[monterreyLng - 2, monterreyLat - 3],
					[monterreyLng + 2, monterreyLat + 3],
				]}
				zoom={initialZoom}
				className='w-screen h-screen absolute inset-0 z-0'
			>
				<RezagoSocialLayer isEnabled={showRezagoSocial} />
				<FeminicidiosEnPeriodicosLayer
					isEnabled={showCubrimientoDeSitio}
				/>
				<FeminicidiosEnFiscaliaLayer isEnabled={showFiscalia} />
				<AreaSinCubrimientoDeSitioLayer
					isEnabled={showCubrimientoDeSitio}
				/>
				<SitiosDeApoyoLayer isEnabled={showSitiosDeApoyo} />
				<ModeloPredictivoLayer isEnabled={showModelo} />
			</MapboxMap>

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
								<Button size='icon'>
									<Layers />
								</Button>
							</SheetTrigger>
							<SheetContent side='bottom'>
								<SheetHeader>
									<SheetTitle>
										Mostrar/ocultar capas
									</SheetTitle>
									<SheetDescription>
										Aquí puedes modificar cuales capas son
										visibles en el mapa.
									</SheetDescription>
									<FiltersList
										filters={filters}
										onFiltersChange={setFilters}
									/>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					}
				>
					<div className='text-stone-300'>
						<p className='m"-6'>
							El mapa que se puede ver en esta página permite
							observar las ubicaciones dentro del Area
							Metropolitana de Monterrey donde hay una mayor
							incidencia de feminicidios.
						</p>

						<h2 className='font-semibold text-lg mb-1'>
							Introducción
						</h2>
						<p className='pb-3'>
							El feminicidio se define como el asesinato de una
							mujer por su genero. México se encuentra entre los
							países con mayores tasas de feminicidios. Dentro de
							está situación, el estado de Nuevo León presenta una
							de las tasas más elevadas a nivel nacional, siendo
							uno de los estados con mayor acontecimiento de este
							tipo de delito. Está es una crisis multifacética, la
							cual afecta a todas las personas viviendo en la
							entidad. Los efectos de un feminicidio no acaban con
							la víctima. Este es un fenómeno qué afecta a todas
							las personas cercanas, tanto a la víctima como a la
							comunidad. Por lo tanto, la organización de Futuro
							con Derechos busca apoyar a estas víctimas
							indirectas (NNA) por el delito de feminicidio. La
							organización busca brindar apoyo integral, con el
							objetivo de mitigar el impacto social y contribuir a
							un entorno más seguro y resiliente.
						</p>
						<p>
							Para apoyar a la causa, GeoStats entró en
							colaboración con Futuro con Derechos para apoyar en
							la generación de una fuente de datos geográfica qué
							ayude a determinar el número correcto de posibles
							víctimas indirectas por el delito de feminicidio en
							Nuevo León. Adicionalmente, se propone la definición
							de un modelo predictivo qué identifique las zonas
							del estado de Nuevo León qué sean más propensas a
							qué sucedan feminicidios.
						</p>
					</div>
				</ModalSheet>
			) : (
				<>
					<div className='absolute top-4 left-4 z-30'>
						<Button size='icon'>
							<Layers />
						</Button>
					</div>

					<aside className='absolute top-0 right-0 w-[400px] h-full bg-neutral-900 p-6 overflow-y-auto text-stone-300 z-20 shadow-lg'>
						<h1 className='text-2x1 font-semibold mb-1'>
							Feminicidios en el Área Metropolitana
						</h1>
						<p className='text-sm mb-4'>
							Modelo predictivo y situación actual
						</p>

						<p className='mb-3'>
							El mapa que se puede ver en esta página permite
							observar las ubicaciones dentro del Área
							Metropolitana de Monterrey donde hay una mayor
							incidencia de feminicidios.
						</p>

						<h2 className='font-semibold text-lg mb-1'>
							Introducción
						</h2>
						<p className='mb-3'>
							El feminicidio se define como el asesinato de una
							mujer por su genero. México se encuentra entre los
							países con mayores tasas de feminicidios. Dentro de
							está situación, el estado de Nuevo León presenta una
							de las tasas más elevadas a nivel nacional, siendo
							uno de los estados con mayor acontecimiento de este
							tipo de delito. Está es una crisis multifacética, la
							cual afecta a todas las personas viviendo en la
							entidad. Los efectos de un feminicidio no acaban con
							la víctima. Este es un fenómeno qué afecta a todas
							las personas cercanas, tanto a la víctima como a la
							comunidad. Por lo tanto, la organización de Futuro
							con Derechos busca apoyar a estas víctimas
							indirectas (NNA) por el delito de feminicidio. La
							organización busca brindar apoyo integral, con el
							objetivo de mitigar el impacto social y contribuir a
							un entorno más seguro y resiliente.
						</p>
						<p>
							Para apoyar a la causa, GeoStats entró en
							colaboración con Futuro con Derechos para apoyar en
							la generación de una fuente de datos geográfica qué
							ayude a determinar el número correcto de posibles
							víctimas indirectas por el delito de feminicidio en
							Nuevo León. Adicionalmente, se propone la definición
							de un modelo predictivo qué identifique las zonas
							del estado de Nuevo León qué sean más propensas a
							qué sucedan feminicidios.
						</p>
					</aside>
				</>
			)}
		</main>
	);
}
