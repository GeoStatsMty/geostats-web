'use client';

import { Paper } from 'geostats-ui';
import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Plugin para características de markdown extendido

export type InformationPanelProps = {
    className?: string;
    showInformationPanel: boolean;
    children?: ReactNode;
};

export default function InformationPanel({
    className,
    showInformationPanel,
    children,
}: InformationPanelProps) {
    const [text, setText] = useState<string>(''); // Estado para el texto

    // Cargar el archivo Markdown cuando el panel se muestre
    useEffect(() => {
        if (showInformationPanel) {
            // Cargar el archivo Markdown desde la carpeta public
            fetch('/prueba.md')
                .then((response) => response.text()) // Lee el contenido del archivo
                .then((data) => setText(data)) // Actualiza el estado con el contenido del archivo
                .catch((error) => console.error('Error al cargar el archivo Markdown:', error));
        } else {
            setText(''); // Limpiar el texto cuando el panel se cierre
        }
    }, [showInformationPanel]);

    const slideVariants = {
        open: { x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
        closed: { x: '0%', transition: { type: 'spring', stiffness: 100, damping: 20 } },
    };

    // Función para manejar el tamaño dinámico de los encabezados según el nivel
    const getHeadingClass = (level: number) => {
        switch (level) {
            case 1:
                return 'text-3xl font-bold'; // h1
            case 2:
                return 'text-2xl font-semibold'; // h2
            case 3:
                return 'text-xl font-medium'; // h3
            case 4:
                return 'text-lg font-medium'; // h4
            case 5:
                return 'text-base font-medium'; // h5
            case 6:
                return 'text-sm font-medium'; // h6
            default:
                return ''; // Para casos no esperados
        }
    };

    // Función para aplicar el estilo de las blockquotes
    const getBlockquoteClass = () => {
        return 'border-l-4 pl-4 italic text-gray-300'; // Personaliza la blockquote con borde y estilo
    };

    // Funciones para aplicar estilo a listas
    const getListClass = (ordered: boolean) => {
        if (ordered) {
            return 'list-decimal pl-6 space-y-2 text-gray-200'; // Estilo para listas ordenadas
        } else {
            return 'list-inside pl-6 space-y-2 text-gray-200'; // Estilo para listas no ordenadas
        }
    };

    // Personalización de los encabezados, blockquotes, y listas usando el prop components
    const markdownComponents = {
        h1: (props: any) => <h1 className={`${getHeadingClass(1)} mt-4`} {...props} />,
        h2: (props: any) => <h2 className={`${getHeadingClass(2)} mt-4`} {...props} />,
        h3: (props: any) => <h3 className={`${getHeadingClass(3)} mt-4`} {...props} />,
        h4: (props: any) => <h4 className={`${getHeadingClass(4)} mt-4`} {...props} />,
        h5: (props: any) => <h5 className={`${getHeadingClass(5)} mt-4`} {...props} />,
        h6: (props: any) => <h6 className={`${getHeadingClass(6)} mt-4`} {...props} />,
        blockquote: (props: any) => <blockquote className={getBlockquoteClass()} {...props} />, // Estilo de blockquote
        ul: (props: any) => <ul className={getListClass(false)} {...props} />, // Lista no ordenada
        ol: (props: any) => <ol className={getListClass(true)} {...props} />, // Lista ordenada
        li: (props: any) => <li className="text-gray-200" {...props} /> // Estilo de lista para cada elemento
    };

    return (
        <motion.div
            className={className}
            variants={slideVariants}
            initial={false}
            animate={showInformationPanel ? 'open' : 'closed'}
        >
            {/* Antiguo <Paper className={`${showInformationPanel ? 'bg-opacity-5' : 'bg-transparent'} p-6 h-full flex relative`}> */}
            <Paper className="p-0 h-full flex relative">
            
                {/* Contenedor de dos columnas */}
                <div className="flex flex-row gap-4 h-full w-full">
                    {/* Columna para el contenido Markdown con scroll a la derecha */}
                    <div className="flex-[3] h-full overflow-y-auto text-white p-4 rounded-md scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-track-gray-200">
                        {showInformationPanel && (
                            <ReactMarkdown
                                children={text}
                                remarkPlugins={[remarkGfm]} // Solo habilitar remark-gfm
                                components={markdownComponents} // Usar componentes personalizados para los encabezados, blockquotes y listas
                            />
                        )}
                    </div>
                </div>

                {/* Botón (children) que sobresale a la derecha del Paper */}
                <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2">
                    {children}
                </div>
            </Paper>
        </motion.div>
    );
}
