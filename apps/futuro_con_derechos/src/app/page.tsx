'use client';
import {motion} from 'motion/react';
import {Button, FiltersContainer, Statistics} from 'ui';
import {Menu, X} from 'lucide-react';
import {useLayoutEffect, useRef, useState} from 'react';
import {useDragControls, useMotionValue, useSpring} from 'framer-motion';
import {MapboxMap} from 'ui';
export default function Home() {
	const y = useMotionValue(0);
	const spring = useSpring(y, {
		mass: 1,
		damping: 100,
		stiffness: 1000,

	});
	const dragControls = useDragControls();

	const innerRef = useRef<HTMLDivElement>(null);
	const visiblePartRef = useRef<HTMLDivElement>(null);

	const [sheetHeight, setSheetHeight] = useState(0);
	const [visibleSheetPartHeight, setVisibleSheetPartHeight] = useState(0);
	const [filtersOpen, setFiltersOpen] = useState(false); // Estado para abrir/cerrar filtros
	const [showFilters, setShowFilters] = useState(false);

	const [buttonWhite, setButtonWhite] = useState(false); // Nuevo estado

	useLayoutEffect(() => {
		if (innerRef.current) setSheetHeight(innerRef.current.offsetHeight);
		if (visiblePartRef.current)
			setVisibleSheetPartHeight(visiblePartRef.current.offsetHeight);
	}, []);

	return (
		<main className='w-screen h-screen relative bg-neutral-800 overflow-hidden'>
			<MapboxMap />
			{/* Menu Button */}
			<div
				style={{
					//bottom: `calc(2rem + ${sheetHeight}px)`,
					right: '1rem',
					transition: 'bottom 0.3s',
				}}
				className='absolute z-10'
			>
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
						setButtonWhite(true); // Cam	bia a blanco al hacer click
					}}
				>
					<Menu
						className={`h-6 w-6 ${buttonWhite ? 'text-neutral-900' : 'text-[#FAFAFA]'}`}
					/>
				</Button>
			</div>
			<FiltersContainer
				open={filtersOpen}
				onOpenChange={setFiltersOpen}
				onApplyFilters={selected => {
					// Aquí puedes manejar los filtros seleccionados
					console.log('Filtros aplicados:', selected);
				}}
			/>

			<motion.div
				style={{
					top: `calc(100% - ${visibleSheetPartHeight}px)`,
					y: spring,
				}}
				className='rounded-t-2xl inset-x-0 absolute bg-neutral-900'
				onDragEnd={() => {
					console.log('dragEnd');
					spring.set(0);
				}}
				drag='y'
				dragConstraints={{
					top: -sheetHeight + visibleSheetPartHeight,
					bottom: 0,
				}}
			>
				{showFilters ? (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-40'>
						<div className='bg-white rounded-lg shadow-lg sm:max-w-[500px] w-full mx-4 p-6 relative'>
							<div className='flex flex-row items-center justify-between mb-4'>
								<span className='text-xl font-bold'>Filtros</span>
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
					<div
						ref={innerRef}
						className='flex flex-col items-center p-4'
					>
						<div
							ref={visiblePartRef}
							className='flex flex-col items-center space-y-4 pb-4'
						>
							<div className='w-16 h-2 rounded-full bg-neutral-600' />
							<h1 className="font-['Inter'] text-[#A3A3A3] text-2xl">
								Feminicidios en el Area Metropolitana
							</h1>
						</div>
						<div className="space-y-2">
							<p className="text-[#A3A3A3]">
								Lorem Ipsum is simply dummy text of the printing and
								typesetting industry. Lorem Ipsum has been the
								industry&apos;s standard dummy text ever since the
								unknown printer took a galley of type and scrambled
								it to make a type specimen book. It has survived not
								only five centuries, but also the leap into
								electronic typesetting, remaining essentially
								unchanged. It was popularised in the 1960s with the
								the release of Letraset sheets containing Lorem
								Ipsum passages, and more recently with desktop
								publishing software like Aldus PageMaker including
								versions of Lorem Ipsum Contrary to popular belief,
								Lorem Ipsum is not simply random text. It has roots
								roots in a piece of classical Latin literature from
								45 BC, making it over 2000 years old. Richard
								McClintock, a Latin professor at Hampden-Sydney
								College in Virginia, looked up one of the more
								obscure Latin words, consectetur, from a Lorem Ipsum
								passage, and going through the cites of the word in
								classical literature, discovered the undoubtable
								source. Lorem Ipsum comes from sections 1.10.32 and
								1.10.33 of &quot;de Finibus Bonorum et Malorum&quot;
							</p>
						</div>
					</div>
				)}
				<Statistics />
			</motion.div>
			
		</main>
	);
};
