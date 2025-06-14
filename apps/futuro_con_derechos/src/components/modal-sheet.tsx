'use client';
import {motion, useAnimationControls} from 'motion/react';
import useWindowDimensions from '@/hooks/use-window-dimensions.ts';
import {useElementSize} from '@/hooks/use-element-size.ts';
import {ReactNode, useRef, useState} from 'react';
import {twJoin} from 'tailwind-merge';

export type ModalSheetProps = {
	readonly children: ReactNode;
	readonly controls: ReactNode;
	readonly header: ReactNode;
};

/**
 * Renders a draggable modal sheet
 */
export function ModalSheet(props: ModalSheetProps) {
	const {children, header, controls} = props;

	const animationControls = useAnimationControls();

	const sheetRef = useRef<HTMLDivElement>(null);
	const {height: sheetHeight} = useElementSize({ref: sheetRef});

	const visiblePartRef = useRef<HTMLDivElement>(null);
	const {height: visibleSheetPartHeight} = useElementSize({
		ref: visiblePartRef,
	});

	const {height} = useWindowDimensions();

	const [isOpen, setIsOpen] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);

	const max = height - visibleSheetPartHeight;

	return (
		<motion.div
			style={{
				bottom: -sheetHeight + visibleSheetPartHeight,
			}}
			onScroll={event => setScrollPosition(event.currentTarget.scrollTop)}
			animate={animationControls}
			ref={sheetRef}
			className={twJoin(
				'inset-x-0 absolute z-50  bg-neutral-900 h-dvh ',
				!isOpen && 'rounded-t-2xl',
			)}
			dragElastic={false}
			dragListener={!isOpen || scrollPosition === 0}
			transition={{
				mass: 0.2,
				bounce: 0,
			}}
			onDragEnd={(_event, panInfo) => {
				const velocity = panInfo.velocity.y;
				const y = panInfo.point.y;
				if (Math.abs(velocity) > 200) {
					const isOpening = velocity < 0;
					setIsOpen(isOpening);
					animationControls.start({y: isOpening ? -max : 0});
				} else {
					const isOpening = y < max / 2;
					setIsOpen(isOpening);
					animationControls.start({y: isOpening ? -max : 0});
				}
			}}
			drag='y'
			dragConstraints={{
				top: -height + visibleSheetPartHeight,
				bottom: 0,
			}}
		>
			<div className='absolute -top-4 right-4 -translate-y-full'>
				{controls}
			</div>
			<div className='flex flex-col h-full'>
				<div ref={visiblePartRef} className='flex flex-col'>
					<button
						className='flex items-center justify-center py-3'
						onClick={() => {
							animationControls.start({y: isOpen ? 0 : -max});
							setIsOpen(previousState => !previousState);
						}}
					>
						<div className='w-16 h-2 rounded-full bg-neutral-600' />
					</button>
					<div className='px-2 py-4'>{header}</div>
				</div>
				{children}
			</div>
		</motion.div>
	);
}
