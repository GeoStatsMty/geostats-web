'use client';
import {motion, useAnimationControls} from 'motion/react';
import useWindowDimensions from '@/hooks/use-window-dimensions.ts';
import {useElementSize} from '@/hooks/use-element-size.ts';
import {ReactNode, useRef, useState} from 'react';
import {twJoin} from 'tailwind-merge';

export type ModalSheetProps = {
	readonly children: ReactNode;
	readonly header: ReactNode;
}

/**
 * Renders a draggable modal sheet
 */
export function ModalSheet(props: ModalSheetProps) {
	const {children, header} = props;

	const animationControls = useAnimationControls();

	const sheetRef = useRef<HTMLDivElement>(null);
	const {height: sheetHeight} = useElementSize({ref: sheetRef});

	const visiblePartRef = useRef<HTMLDivElement>(null);
	const {height: visibleSheetPartHeight} = useElementSize({ref: visiblePartRef});

	const {height} = useWindowDimensions();

	const [sliderOpen, setSliderOpen] = useState(false);

	const dragBarHeight = 24;

	const max = height - visibleSheetPartHeight;

	return <motion.div
		style={{
			bottom: -sheetHeight + visibleSheetPartHeight,
		}}
		animate={animationControls}
		ref={sheetRef}
		className={twJoin('inset-x-0 absolute py-2 px-4 bg-neutral-900 min-h-screen', !sliderOpen && 'rounded-t-2xl')}
		dragElastic={false}
		transition={{
			mass: 0.2,
			bounce: 0,
		}}
		onDragEnd={(_event, panInfo) => {
			const velocity = panInfo.velocity.y;
			const y = panInfo.point.y;
			if (Math.abs(velocity) > 200) {
				const isOpening = velocity < 0;
				setSliderOpen(isOpening);
				animationControls.start({y: isOpening ? -max : 0});
			} else {
				const isOpening = y < max / 2;
				setSliderOpen(isOpening);
				animationControls.start({y: isOpening ? -max : 0});
			}
		}}
		drag="y"
		dragConstraints={{
			top: -height + visibleSheetPartHeight,
			bottom: 0,
		}}
	>
		<div
			ref={visiblePartRef}
			className={'flex flex-col items-center space-y-4'}
		>
			<button className="w-16 h-2 rounded-full bg-neutral-600"
					onClick={() => {
						animationControls.start({y: sliderOpen ? 0 : -max});
						setSliderOpen(previousState => !previousState);
					}} />
			<div className="w-full">
				{header}
			</div>
		</div>
		{children}
	</motion.div>;
}

