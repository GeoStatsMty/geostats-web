'use client';

/* Limpiar código, documentar y agregar diseño responsivo. */
import {Button} from 'react-aria-components';
import {useState} from 'react';
import ChevronRight from '@material-design-icons/svg/round/chevron_right.svg';

/**
 * Homepage of the map
 */
export default function Home() {
	// Estados para los controles
	const [showControls, setShowControls] = useState(false);
	const [showFiscalia, setShowFiscalia] = useState(false);

	return (
		<main className='h-screen w-screen overflow-hidden bg-stone-950 text-stone-300'>
			<div className='relative h-full w-full'>
				{/* Panel de Información con animación y transición */}

				{/* Controles para pantallas pequeñas */}
				<div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 md:hidden'>
					<Button
						className={`p-3 rounded-full ${showFiscalia ? 'bg-white text-black' : 'bg-stone-900 text-white'}`}
						onPress={() => setShowFiscalia(true)}
					>
						Fiscalía
					</Button>
					<Button
						className='p-3 rounded-full bg-stone-900 text-white'
						onPress={() => setShowControls(!showControls)}
					>
						<ChevronRight className='fill-white rotate-90' />
					</Button>
					<Button
						className={`p-3 rounded-full ${showFiscalia ? 'bg-stone-900 text-white' : 'bg-white text-black'}`}
						onPress={() => setShowFiscalia(false)}
					>
						Periódico
					</Button>
				</div>
			</div>
		</main>
	);
}
