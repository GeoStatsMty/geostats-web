'use client';
import React, {type ReactNode, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GeoStatsLogoMark from 'public/logos/geostats-logomark.png';
import {useScrollPosition} from '@n8tb1t/use-scroll-position';
import {motion} from 'framer-motion';
import {cx} from 'geostats-ui';

export type TopBarProps = {
	readonly children?: ReactNode;
	className?: string; // Agregar 'className' a las props
};

export default function TopBar(props: TopBarProps) {
	const {children} = props;

	const [showBar, setShowBar] = useState(true);

	useScrollPosition(
		({prevPos, currPos}) => {
			if (currPos.y <= 64 || prevPos.y > currPos.y) {
				if (!showBar) {
					setShowBar(true);
				}
			} else if (prevPos.y < currPos.y && showBar) {
				setShowBar(false);
			}
		},
		[showBar],
		undefined,
		true,
	);

	return (
		<motion.header
			className={cx(
				'fixed z-[1100] backdrop-blur right-0 left-0 w-full h-16 border-b border-stone-800 px-12 bg-black/40',
				props.className // Aplicar className de las props aquí
			)}
			animate={{
				top: showBar ? 0 : -64,
			}}
			initial={{
				top: 0,
			}}
		>
			<div className='mx-auto flex h-full items-center justify-between gap-2'>
				<Link
					href='/'
					className="flex items-center gap-2 font-bold text-stone-50 text-xs sm:text-sm md:text-base lg:text-lg" // Cambio de tamaño de texto
				>
					<Image
						src={GeoStatsLogoMark}
						height={28}
						className='mx-auto my-4'
						alt='geostats logo'
					/>
					[GeoStats] | Futuro con Derechos
				</Link>
				<div className='grow' />
				{children}
			</div>
		</motion.header>
	);
}
