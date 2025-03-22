'use client';
import React, {useRef} from 'react';
import {
	type AriaCheckboxProps,
	mergeProps,
	useCheckbox,
	useFocusRing,
	usePress,
	VisuallyHidden,
} from 'react-aria';
import {useToggleState, type ToggleProps} from 'react-stately';
import {cx} from './cva.ts';

export type CheckboxProps = {
	readonly className?: string;
} & AriaCheckboxProps &
	ToggleProps;

export function Checkbox(props: CheckboxProps) {
	const {children, className} = props;
	const ref = useRef<HTMLInputElement>(null);
	const state = useToggleState(props);
	const {inputProps} = useCheckbox(props, state, ref);
	const {focusProps} = useFocusRing();
	const {pressProps} = usePress({isDisabled: props.isDisabled});

	return (
		<label className={cx('flex gap-2 text-stone-300', className)}>
			<VisuallyHidden>
				<input {...mergeProps(inputProps, focusProps)} ref={ref} />
			</VisuallyHidden>
			<div
				className='size-6 cursor-pointer rounded border border-stone-700 p-1'
				aria-hidden='true'
			>
				<svg
					{...pressProps}
					className='fill-none stroke-stone-50 stroke-2'
					viewBox='0 0 18 18'
				>
					<polyline
						className='transition-all duration-200'
						points='1 9 7 14 15 4'
						strokeDasharray={24}
						strokeDashoffset={state.isSelected ? 48 : 72}
					/>
				</svg>
			</div>
			{children}
		</label>
	);
}
