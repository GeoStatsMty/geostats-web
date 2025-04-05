'use client';
import React, {type RefObject, type ReactNode} from 'react';
import {type AriaTextFieldProps, useTextField, useObjectRef} from 'react-aria';
import {cx} from './cva.ts';

export type TextFieldProps = {
	readonly className?: string;
	readonly icon?: ReactNode;
	readonly inputRef?: RefObject<HTMLInputElement>;
} & AriaTextFieldProps;

export function TextField(props: TextFieldProps) {
	const {label, isDisabled, className, description, icon, isRequired} = props;
	const inputRef = useObjectRef(props.inputRef);
	const {
		labelProps,
		inputProps,
		descriptionProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
	} = useTextField(
		{
			validationBehavior: 'native',
			...props,
		},
		inputRef,
	);

	return (
		<div data-disabled={isDisabled} className={cx('group', className)}>
			{label && (
				<label
					{...labelProps}
					className={cx(
						'text-stone-400 text-sm block mb-1 group-focus-within:text-stone-50 group-data-[disabled=true]:text-stone-500 transition-colors',
						isRequired && 'after:content-["*"] after:ml-0.5',
					)}
				>
					{label}
				</label>
			)}

			<div className='flex items-center gap-2 rounded-xs border border-stone-700 px-2 shadow-stone-800 transition-all group-focus-within:border-stone-50 group-focus-within:glow-sm group-data-[disabled=true]:border-stone-800'>
				{icon}
				<input
					{...inputProps}
					ref={inputRef}
					className='min-w-0 grow bg-transparent py-2 text-stone-100 outline-hidden placeholder:text-stone-500 disabled:cursor-not-allowed disabled:text-stone-600'
				/>
			</div>
			{description === undefined ? null : (
				<div {...descriptionProps}>{description}</div>
			)}
			{isInvalid && (
				<div
					{...errorMessageProps}
					className='mt-1 text-xs text-red-400'
				>
					{validationErrors.join(' ')}
				</div>
			)}
		</div>
	);
}
