'use client';
import {FiltersList, MapFilters} from '../components/filters-list.tsx';
import { MapLegend } from '@/components/map-legend.tsx';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'ui';
import {useState, useEffect, useRef} from 'react';
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

const ACCORDION_ITEMS = [
	{
		value: 'introduccion',
		title: 'Introducción',
		content: (
			<>
			<p className='mb-3'>
				El mapa que se muestra en esta pagina permite observar
				las ubicaciones dentro del Área Metropolitana de Monterrey
				donde hay una mayor incidencia de feminicidios.
			</p>
			<p className='mb-3'>
				El feminicidio se define como el asesinato de una mujer por
				su género. México se encuentra entre los paises con mayores
				tasas de feminicidios. Dentro de esta situación, el estado
				de Nuevo León presenta una de las tasas mas elevadas a
				nivel nacional.
			</p>
			<p>
				Para apoyar a la causa, GeoStats entró en colaboración con
				Futuro con Derechos para contribuir a la generación de una
				fuente de datos geográfica que ayude a determinar el número
				correcto de posibles víctimas indirectas por el delito de
				feminicidio en Nuevo León. Adicionalmente, se propone la
				definición de un modelo predictivo que identifique las
				zonas del estado más propensas a que ocurran feminicidios.
			</p>
			</>
		),
	},
	{
		value: 'fiscalia',
		title: 'Fiscalía',
		content: (
			<p>
				Esta capa muestra los feminicidios registrados por la
				Fiscalía, permitiendo identificar zonas donde existe una mayor
				concentración de casos reportados oficialmente.
			</p>
		),
	},
	{
		value: 'periodico',
		title: 'Periódicos',
		content: (
			<p>
				Esta capa presenta feminicidios identificados en notas
				periodísticas. Sirve como complemento a los registros
				oficiales y ayuda a ampliar el contexto territorial.
			</p>
		),
	},
	{
		value: 'sitios-de-apoyo',
		title: 'Sitios de Apoyo',
		content: (
			<p>
				Esta capa ubica instituciones y espacios que pueden brindar
				apoyo social, médico, educativo o comunitario dentro del área
				metropolitana.
			</p>
		),
	},
	{
		value: 'curbimiento',
		title: 'Area sin Cubrimiento',
		content: (
			<p>
				Esta capa resalta zonas donde no existe cubrimiento de sitio,
				lo que puede ayudar a detectar áreas con menor acceso a
				recursos de apoyo cercanos.
			</p>
		),
	},
	{
		value: 'rezago-social',
		title: 'Rezago Social',
		content: (
			<p>
				Esta capa visualiza el grado de rezago social en distintas
				zonas, lo que permite relacionar condiciones sociales con el
				contexto territorial del problema.
			</p>
		),
	},
	{
		value: 'modelo-predictivo',
		title: 'Modelo Predictvo',
		content: (
			<p>
				Esta capa muestra el resultado del modelo predictivo, 
				el cual estima qué zonas tienen mayor probabilidad de presentar 
				feminicidios con base en los datos analizados.
			</p>
		),
	},
];

function InfoAccordion({
	textClassName,
	triggerClassName,
}: {
	textClassName: string;
	triggerClassName: string;
}) {
	return(
		<Accordion
		type='single'
		collapsible
		defaultValue='introduccion'
		className='w-full'
		>
			{ACCORDION_ITEMS.map(item => (
				<AccordionItem
				key={item.value}
				value={item.value}
				className='border-b border-neutral-600/60'
				>
					<AccordionTrigger className={triggerClassName}>
						{item.title}
					</AccordionTrigger>
					<AccordionContent className={textClassName}>
						{item.content}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

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

	const [panelOpen, setPanelOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const panelRef = useRef<HTMLDivElement | null>(null);

	function onKey(event: KeyboardEvent) {
		if (event.key === 'Escape') setPanelOpen(false);
	}
	function onClickOutside(event: MouseEvent) {
		const t = event.target as Node;
		if (
			panelRef.current &&
			!panelRef.current.contains(t) &&
			buttonRef.current &&
			!buttonRef.current.contains(t)
		) {
			setPanelOpen(false);
		}
	}

	useEffect(() => {
		if (!isMobile) return;
		document.addEventListener('mousedown', onClickOutside);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onClickOutside);
			document.removeEventListener('keydown', onKey);
		};
	}, [isMobile]);

	const {
		showFiscalia,
		showCubrimientoDeSitio,
		showRezagoSocial,
		showSitiosDeApoyo,
		showModelo,
		showPeriodico,
	} = filters;

	return (
		<main className='w-screen h-screen bg-neutral-800 overflow-hidden absolute inset-0 z-0'>
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
				<FeminicidiosEnPeriodicosLayer isEnabled={showPeriodico} />
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
										Aquí puedes modificar cuáles capas son
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
					<div className='text-stone-300 px-2 pb-4'>
						<h1 className='text-stone-200 text-3xl font-semibold leading-tight mb-3'>
							Feminicidios en el Área Metropolitana
						</h1>

						<p className='mb-6 text-sm leading-6 text-stone-400'>
							Explora las capas para comparar registros, contexto social y zonas con
							mayor probabilidad estimada.
						</p>

						<MapLegend />

						<div className='mt-8'>
							<InfoAccordion
								triggerClassName='py-4 text-base font-normal text-stone-200'
								textClassName='text-sm leading-6 text-stone-400'
							/>
						</div>
					</div>
				</ModalSheet>
			) : (
				<>
					<div className='absolute top-4 left-4 z-30'>
						<div className='relative'>
							<Button
								ref={buttonRef}
								size='icon'
								aria-label='Abrir filtros'
								onClick={() => setPanelOpen(true)}
								aria-expanded={panelOpen}
							>
								<Layers />
							</Button>

							{panelOpen && (
								<div
									ref={panelRef}
									className='absolute left-0 mt-2 w-72 rounded-lg border border-neutral-800 bg-neutral-900/95 backdrop-blur p-3 text-stone-200 shadow-xl'
								>
									<div className='flex items-center justify-between mb-2'>
										<h3 className='text-sm font-semibold'>
											Filtros
										</h3>
										<button
											className='text-xs opacity-70 hover:opacity-100'
											onClick={() => setPanelOpen(false)}
										>
											X
										</button>
									</div>

									<FiltersList
										filters={filters}
										onFiltersChange={setFilters}
									/>
								</div>
							)}
						</div>
					</div>

					<aside className='absolute top-0 right-0 w-[400px] h-full bg-neutral-900 p-6 overflow-y-auto text-stone-300 z-20 shadow-lg'>
						<h1 className='text-2xl font-semibold mb-3 leading-tight'>
							Feminicidios en el Área Metropolitana
						</h1>

						<p className='mb-6 text-sm leading-6 text-stone-400'>
							Explora las capas para comparar registros, contexto social y zonas con
							mayor probabilidad estimada.
						</p>

						<MapLegend />

						<div className='mt-8'>
							<InfoAccordion
								triggerClassName='py-4 text-base font-normal text-stone-200'
								textClassName='text-sm leading-6 text-stone-400'
							/>
						</div>
					</aside>
				</>
			)}
		</main>
	);
}
