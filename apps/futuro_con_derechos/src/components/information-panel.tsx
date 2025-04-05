'use client';

import {Paper} from 'geostats-ui';
import {ReactNode, useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import ReactMarkdown, {Components} from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Plugin para características de markdown extendido

export type InformationPanelProps = {
	readonly className?: string;
	readonly showInformationPanel: boolean;
	readonly children?: ReactNode;
};

const markdownComponents: Components = {
	h1: ({children, ...props}) => (
		<h1 className='mt-4 text-3xl font-bold' {...props}>
			{children}
		</h1>
	),
	h2: ({children, ...props}) => (
		<h2 className='mt-4 text-2xl font-semibold' {...props}>
			{children}
		</h2>
	),
	h3: ({children, ...props}) => (
		<h3 className='mt-4 text-xl font-medium' {...props}>
			{children}
		</h3>
	),
	h4: ({children, ...props}) => (
		<h4 className='mt-4 text-lg font-medium' {...props}>
			{children}
		</h4>
	),
	h5: ({children, ...props}) => (
		<h5 className='mt-4 text-base font-medium' {...props}>
			{children}
		</h5>
	),
	h6: ({children, ...props}) => (
		<h6 className='mt-4 text-sm font-medium' {...props}>
			{children}
		</h6>
	),
	blockquote: props => (
		<blockquote
			className='border-l-4 pl-4 italic text-gray-300'
			{...props}
		/>
	),
	ul: props => (
		<ul className='list-inside space-y-2 pl-6 text-gray-200' {...props} />
	),
	ol: props => (
		<ol className='list-decimal space-y-2 pl-6 text-gray-200' {...props} />
	),
	li: properties => <li className='text-gray-200' {...properties} />,
};

export default function InformationPanel({
	className,
	showInformationPanel,
	children,
}: InformationPanelProps) {
	const [text, setText] = useState<string>(''); // Estado para el texto

	// Cargar el archivo Markdown cuando el panel se muestre
	useEffect(() => {
		if (!showInformationPanel) {
			return;
		}

		// Cargar el archivo Markdown desde la carpeta public
		fetch('/prueba.md')
			.then(response => response.text()) // Lee el contenido del archivo
			.then(data => setText(data)) // Actualiza el estado con el contenido del archivo
			.catch(error =>
				console.error('Error al cargar el archivo Markdown:', error),
			);

		return () => {
			setText('');
		};
	}, [showInformationPanel]);

	const slideVariants = {
		open: {x: 0, transition: {type: 'spring', stiffness: 100, damping: 20}},
		closed: {
			x: '0%',
			transition: {type: 'spring', stiffness: 100, damping: 20},
		},
	};

	return (
		<motion.div
			className={className}
			variants={slideVariants}
			initial={false}
			animate={showInformationPanel ? 'open' : 'closed'}
		>
			{/* Antiguo <Paper className={`${showInformationPanel ? 'bg-opacity-5' : 'bg-transparent'} p-6 h-full flex relative`}> */}
			<Paper className='relative flex h-full p-0'>
				{/* Contenedor de dos columnas */}
				<div className='flex size-full flex-row gap-4'>
					{/* Columna para el contenido Markdown con scroll a la derecha */}
					<div className='h-full flex-3 overflow-y-auto rounded-md p-4 text-white scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500 scrollbar-thumb-rounded-lg'>
						{showInformationPanel && (
							<ReactMarkdown
								remarkPlugins={[remarkGfm]} // Solo habilitar remark-gfm
								components={markdownComponents} // Usar componentes personalizados para los encabezados, blockquotes y listas
							>
								{text}
							</ReactMarkdown>
						)}
					</div>
				</div>

				{/* Botón (children) que sobresale a la derecha del Paper */}
				<div className='absolute right-[-20px] top-1/2 -translate-y-1/2'>
					{children}
				</div>
			</Paper>
		</motion.div>
	);
}
