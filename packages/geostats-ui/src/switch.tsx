'use client';

import React from 'react';
import {
	SwitchProps as AriaSwitchProps,
	Switch as AriaSwitch,
} from 'react-aria-components';
import {twMerge} from 'tailwind-merge';

export type SwitchProps = {
	readonly className?: string;
	readonly label?: string;
} & AriaSwitchProps;

export function Switch(props: SwitchProps) {
	const {label, className, ...rest} = props;

	return (
		<AriaSwitch
			{...rest}
			className={twMerge(
				'group flex items-center gap-1 text-stone-300 text-sm',
				className,
			)}
		>
			<div className='me-2 w-[calc(--spacing(8)+4px)] rounded-full border border-stone-300 p-px transition-colors group-data-[selected=true]:border-stone-50 group-data-[selected=true]:bg-neutral-50'>
				<div className='size-4 rounded-full bg-stone-100 transition-all group-data-[selected=true]:translate-x-full group-data-[selected=true]:bg-stone-900' />
			</div>
			{label}
		</AriaSwitch>
	);
}
