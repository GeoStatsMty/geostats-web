import Image from 'next/image';
import GeostatsLogo from 'public/logos/geostats.png';
import {SpinningHexagons} from '@/components/spinning-hexagons.tsx';
import {ALinkButton} from 'geostats-ui';

export default function Home() {
	return (
		<main className='min-h-screen flex-col items-center justify-between bg-stone-950'>
			<div className='relative w-full overflow-hidden'>
				<div className='absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-stone-950' />
				<div className='inset-0 flex  flex-col items-center justify-center py-24'>
					<Image
						src={GeostatsLogo}
						alt={'GeoStats Logo'}
						className='mb-8 h-48 w-auto'
					/>
					<h1 className='text-xl font-semibold'>
						Generando diálogos con cartografía social
					</h1>
				</div>
				<div className='absolute inset-0 flex items-center justify-center py-24'>
					<SpinningHexagons />
				</div>
			</div>
			<div className='flex justify-center gap-16 p-4'>
				<ALinkButton>Inicio</ALinkButton>
				<ALinkButton>Mapas</ALinkButton>
				<ALinkButton>Eventos</ALinkButton>
				<ALinkButton>Contacto</ALinkButton>
			</div>
		</main>
	);
}
