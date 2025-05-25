'use client';
import {motion} from 'motion/react';
import {Button, FiltersContainer, Statistics} from 'ui';
import {Menu} from 'lucide-react';
import {useLayoutEffect, useRef, useState} from 'react';
import {useDragControls, useMotionValue, useSpring} from 'framer-motion';

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

	const [buttonWhite, setButtonWhite] = useState(false); // Nuevo estado

	useLayoutEffect(() => {
		if (innerRef.current) setSheetHeight(innerRef.current.offsetHeight);
		if (visiblePartRef.current) setVisibleSheetPartHeight(visiblePartRef.current.offsetHeight);
	}, []);

	return (
		<main className="w-screen h-screen relative bg-neutral-800 overflow-hidden">
			{/* Menu Button */}
			<div
				style={{
					//bottom: `calc(2rem + ${sheetHeight}px)`,
					right: '1rem',
					transition: 'bottom 0.3s',
				}}
				className="absolute z-10"
			>

				<Button
					variant="secondary"
					size="icon"
					className={`w-10 h-10 shadow-md flex justify-center rounded-md ${
						buttonWhite ? 'bg-white' : 'bg-neutral-900 hover:bg-[#1A1A1A]'
					}`}
					onClick={() => {
						setFiltersOpen(true);
						setButtonWhite(true); // Cambia a blanco al hacer click
					}}
				>
					<Menu className={`h-6 w-6 ${buttonWhite ? 'text-neutral-900' : 'text-[#FAFAFA]'}`} />
				</Button>
			</div>
			<FiltersContainer
				open={filtersOpen}
				onOpenChange={setFiltersOpen}
				onApplyFilters={(selected) => {
					// Aquí puedes manejar los filtros seleccionados
					console.log('Filtros aplicados:', selected);
				}}
			/>

			<motion.div
				style={{
					top: `calc(100% - ${visibleSheetPartHeight}px)`,
					y: spring,
				}}
				className="rounded-t-2xl inset-x-0 absolute bg-neutral-900"
				onDragEnd={() => {
					console.log('dragEnd');
					spring.set(0);
a
			z	}}
				drag="y" dragConstraints={{top: -sheetHeight + visibleSheetPartHeight, bottom: 0}}>
				<div ref={innerRef} className="flex flex-col items-center p-4">
					<div ref={visiblePartRef} className="flex flex-col items-center space-y-4 pb-4">
						<div className="w-16 h-2 rounded-full bg-neutral-600" />
						<h1 className="font-['Inter'] text-[#A3A3A3] text-2xl">
							Feminicidios en el Area Metropolitana
						</h1>
					</div>
					<div className="space-y-2">
						<p className="text-[#A3A3A3]">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
							Ipsum has been the industry's standard dummy text ever since the 1500s, when an
							unknown printer took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic
							typesetting, remaining essentially unchanged. It was popularised in the 1960s with
							the release of Letraset sheets containing Lorem Ipsum passages, and more recently
							with desktop publishing software like Aldus PageMaker including versions of Lorem
							Ipsum Contrary to popular belief, Lorem Ipsum is not simply random text. It has
							roots in a piece of classical Latin literature from 45 BC, making it over 2000 years
							old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
							looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
							passage, and going through the cites of the word in classical literature, discovered
							the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
							Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
							BC. This book is a treatise on the theory of ethics, very popular during the
							Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
							from a line in section 1.10.32.

							The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
							interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by
							Cicero are also reproduced in their exact original form, accompanied by English
							versions from the 1914 translation by H. Rackham.
						</p>
					</div>
				</div>
				<Statistics />
			</motion.div>
		</main>
	);
};
