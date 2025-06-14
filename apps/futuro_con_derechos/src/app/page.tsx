'use client';
import {Button, FiltersContainer, MapboxMap, MapFilters, Statistics} from 'ui';
import {Menu, X} from 'lucide-react';
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
 * @return The rendered `Home` component containing all its UI elements and interactive features.
 */
export default function Home() {
	const [filtersOpen, setFiltersOpen] = useState(false); // Estado para abrir/cerrar filtros
	const [showFilters, setShowFilters] = useState(false);
	const [mapFilters, setMapFilters] = useState<MapFilters>({
		showFiscalia: true,
		showCubrimientoDeSitio: false,
		showRezagoSocial: false,
		showSitiosDeApoyo: false,
		showModelo: false,
		showPeriodico: true,
	});

	const [buttonWhite, setButtonWhite] = useState(false);

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
			{/* Menu Button */}
			<FiltersContainer
				open={filtersOpen}
				onOpenChange={open => {
					setFiltersOpen(open);
					if (!open) {
						setButtonWhite(false);
					}
				}}
				filters={mapFilters}
				onFiltersChange={setMapFilters}
			/>

			<ModalSheet
				header={
					<h1 className='text-white text-2xl'>
						Feminicidios en el Area Metropolitana
					</h1>
				}
				controls={
					<Button
						variant='secondary'
						size='icon'
						className={`w-10 h-10 shadow-md flex justify-center rounded-md ${
							buttonWhite
								? 'bg-white'
								: 'bg-neutral-900 hover:bg-[#1A1A1A]'
						}`}
						onClick={() => {
							setFiltersOpen(true);
							setButtonWhite(true);
						}}
					>
						<Menu
							className={`h-6 w-6 ${buttonWhite ? 'text-neutral-900' : 'text-[#FAFAFA]'}`}
						/>
					</Button>
				}
			>
				{showFilters ? (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-40'>
						<div className='bg-white rounded-lg shadow-lg sm:max-w-[500px] w-full mx-4 p-6 relative'>
							<div className='flex flex-row items-center justify-between mb-4'>
								<span className='text-xl font-bold'>
									Filtros
								</span>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => setShowFilters(false)}
									className='rounded-full h-8 w-8 p-0'
								>
									<X className='h-4 w-4' />
									<span className='sr-only'>Close</span>
								</Button>
							</div>
							<div className='grid grid-cols-3 sm:grid-cols-6 gap-4 py-4'>
								{/* Aquí van los elementos de filtro */}
							</div>
							<div className='flex justify-end mt-4 gap-2'>
								<Button
									variant='outline'
									// onClick={() => setSelectedFilters([])}
								>
									Clear
								</Button>
								<Button
								// onClick={handleApply}
								>
									Aplicar Filtros
								</Button>
							</div>
						</div>
					</div>
				) : (
					<div className='flex flex-col items-center'>
						<div className='space-y-2'>
							<p className='text-[#A3A3A3]'>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry&apos;s standard dummy text ever
								since the unknown printer took a galley of type
								and scrambled it to make a type specimen book.
								It has survived not only five centuries, but
								also the leap into electronic typesetting,
								remaining essentially unchanged. It was
								popularised in the 1960s with the the release of
								Letraset sheets containing Lorem Ipsum passages,
								and more recently with desktop publishing
								software like Aldus PageMaker including versions
								of Lorem Ipsum Contrary to popular belief, Lorem
								Ipsum is not simply random text. It has roots
								roots in a piece of classical Latin literature
								from 45 BC, making it over 2000 years old.
								Richard McClintock, a Latin professor at
								Hampden-Sydney College in Virginia, looked up
								one of the more obscure Latin words,
								consectetur, from a Lorem Ipsum passage, and
								going through the cites of the word in classical
								literature, discovered the undoubtable source.
								Lorem Ipsum comes from sections 1.10.32 and
								1.10.33 of &quot;de Finibus Bonorum et
								Malorum&quot;
							</p>

							<p className='text-[#A3A3A3]'>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry&apos;s standard dummy text ever
								since the unknown printer took a galley of type
								and scrambled it to make a type specimen book.
								It has survived not only five centuries, but
								also the leap into electronic typesetting,
								remaining essentially unchanged. It was
								popularised in the 1960s with the the release of
								Letraset sheets containing Lorem Ipsum passages,
								and more recently with desktop publishing
								software like Aldus PageMaker including versions
								of Lorem Ipsum Contrary to popular belief, Lorem
								Ipsum is not simply random text. It has roots
								roots in a piece of classical Latin literature
								from 45 BC, making it over 2000 years old.
								Richard McClintock, a Latin professor at
								Hampden-Sydney College in Virginia, looked up
								one of the more obscure Latin words,
								consectetur, from a Lorem Ipsum passage, and
								going through the cites of the word in classical
								literature, discovered the undoubtable source.
								Lorem Ipsum comes from sections 1.10.32 and
								1.10.33 of &quot;de Finibus Bonorum et
								Malorum&quot;
							</p>
							<p className='text-[#A3A3A3]'>
								Lorem Ipsum is simply dummy text of the printing
								and typesetting industry. Lorem Ipsum has been
								the industry&apos;s standard dummy text ever
								since the unknown printer took a galley of type
								and scrambled it to make a type specimen book.
								It has survived not only five centuries, but
								also the leap into electronic typesetting,
								remaining essentially unchanged. It was
								popularised in the 1960s with the the release of
								Letraset sheets containing Lorem Ipsum passages,
								and more recently with desktop publishing
								software like Aldus PageMaker including versions
								of Lorem Ipsum Contrary to popular belief, Lorem
								Ipsum is not simply random text. It has roots
								roots in a piece of classical Latin literature
								from 45 BC, making it over 2000 years old.
								Richard McClintock, a Latin professor at
								Hampden-Sydney College in Virginia, looked up
								one of the more obscure Latin words,
								consectetur, from a Lorem Ipsum passage, and
								going through the cites of the word in classical
								literature, discovered the undoubtable source.
								Lorem Ipsum comes from sections 1.10.32 and
								1.10.33 of &quot;de Finibus Bonorum et
								Malorum&quot;
							</p>
						</div>
					</div>
				)}
			</ModalSheet>
			<Statistics />
		</main>
	);
}
