'use client';
import { FiltersList, MapFilters } from '../components/filters-list.tsx';
import { Button } from 'ui';
import { MapboxMap } from '../components/mapbox-map'
import { Statistics } from '../components/statistics';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { ModalSheet } from '@/components/modal-sheet.tsx';

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
				header={
					<h1 className='text-white text-2xl'>
						{showFilters ? 'Filtros' : 'Feminicidios en el Area Metropolitana'}
					</h1>
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
						}}
					>
						<Menu
							className={`h-6 w-6 ${showFilters ? 'text-neutral-900' : 'text-[#FAFAFA]'}`}
						/>
					</Button>
				}
			>
				<div className='flex flex-col items-center px-4'>
					{showFilters ? (
						<div className='w-full mb-6'>
							<FiltersList
								filters={mapFilters}
								onFiltersChange={setMapFilters}
							/>
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
				</div>
			</ModalSheet>
			<Statistics />
		</main>
	);
}