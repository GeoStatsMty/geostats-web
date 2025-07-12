'use client';
import {motion, useAnimationControls} from 'motion/react';
import {useElementSize} from '@/hooks/use-element-size.ts';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {twJoin} from 'tailwind-merge';

export type ModalSheetProps = {
	readonly children: ReactNode;
	readonly controls: ReactNode;
	readonly header: ReactNode;
	readonly isOpen: boolean;
	readonly onOpenChange: (isOpen: boolean) => void;
	readonly useFullHeight?: boolean;
};

/**
 * Renders a draggable modal sheet
 */
export function ModalSheet(props: ModalSheetProps) {
	const {
		children,
		header,
		controls,
		isOpen,
		onOpenChange,
		useFullHeight = false,
	} = props;

	const animationControls = useAnimationControls();

	const sheetRef = useRef<HTMLDivElement>(null);

	const visiblePartRef = useRef<HTMLDivElement>(null);

	const {height: visibleSheetPartHeight} = useElementSize({
		ref: visiblePartRef,
	});

	const {height: sheetHeight} = useElementSize({
		ref: sheetRef,
	});

	const [scroll, setScroll] = useState(0);

	const max = sheetHeight - visibleSheetPartHeight;

	/**
	 * Closes the sheet
	 */
	const close = () => {
		onOpenChange(false);
	};

	/**
	 * Opens the sheet
	 */
	const open = () => {
		onOpenChange(true);
	};

	useEffect(() => {
		if (isOpen) {
			animationControls.start({y: -max});
		} else {
			animationControls.start({y: 0});
		}
	}, [animationControls, isOpen, max]);

	const [isDragging, setIsDragging] = useState(false);

	const scrollRef = useRef<HTMLDivElement>(null);

	// This touchmove handler disables scrolling on the inner container
	// whenever the user is dragging the sheet.
	// It needs to be on useEffect instead of on the HTML element itself
	// because we need the listener to not be a passive listener, which
	// can only be done via the addEventListener API
	useEffect(() => {
		const container = sheetRef.current;

		if (!container) return;

		const handler = (event: TouchEvent) => {
			if (isDragging) {
				event.preventDefault();
			}
		};
		container.addEventListener('touchmove', handler, {
			passive: false,
		});

		return () => {
			container.removeEventListener('touchmove', handler);
		};
	}, [isDragging]);

	const bottom = -sheetHeight + visibleSheetPartHeight;

	return (
		<motion.div
			style={{
				bottom: bottom === 0 ? '-100dvh' : bottom,
			}}
			animate={animationControls}
			ref={sheetRef}
			className={twJoin(
				'inset-x-0 absolute z-50  bg-neutral-900',
				!isOpen && 'rounded-t-2xl',
				useFullHeight && 'min-h-dvh',
			)}
			dragElastic={false}
			transition={{
				mass: 0.2,
				bounce: 0,
			}}
			onDragStart={() => setIsDragging(true)}
			onDragEnd={(_event, panInfo) => {
				// This handlers makes it so that the sheet snaps to either the
				// closed or open state when finishing dragging.
				// It checks for either position or velocity for deciding whether
				// to snap open or closed.
				setIsDragging(false);

				const velocity = panInfo.velocity.y;
				const y = sheetRef.current?.getBoundingClientRect().y ?? 0;

				if (Math.abs(velocity) > 200) {
					const isOpening = velocity < 0;
					if (isOpening) open();
					else close();
				} else {
					const isOpening = y < max / 2;
					if (isOpening) open();
					else close();
				}
			}}
			drag='y'
			dragConstraints={{
				top: -sheetHeight + visibleSheetPartHeight,
				bottom: 0,
			}}
		>
			<div className='absolute -top-4 right-4 -translate-y-full'>
				{controls}
			</div>
			<div
				ref={scrollRef}
				onScroll={() => {
					if (!scrollRef.current) return;
					setScroll(scrollRef.current.scrollTop);
				}}
				onPointerMoveCapture={event => {
					// This handler prevents drag being triggered
					// when the user is actually trying to scroll

					if (!isOpen) return;

					// We are scrolling if the cursor is going upwards
					// or if the cursor is going downwards AND we are not at the top
					// (so the user is not trying to close the sheet)
					const isScrolling =
						event.movementY <= 0 ||
						(scroll > 0 && event.movementY > 0);

					// (if we are already dragging, don't attempt to cancel it)
					if (!isDragging && isScrolling) {
						// Stop the event from propagating to the drag container
						event.stopPropagation();
					}
				}}
				className={twJoin('max-h-dvh', isOpen && 'overflow-y-auto')}
			>
				<div ref={visiblePartRef} className='flex flex-col'>
					<button
						className='flex items-center justify-center py-3'
						onClick={() => {
							if (isOpen) close();
							else open();
						}}
					>
						<div className='w-16 h-2 rounded-full bg-neutral-600' />
					</button>
					<div className='px-2 py-4 text-white'>{header}</div>
				</div>
				<div className='px-2 pb-4'>{children}</div>
			</div>
		</motion.div>
	);
}
