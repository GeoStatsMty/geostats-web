'use client';
import {type ComponentProps, type ReactNode} from 'react';
import {type VariantProps} from 'cva';
import {buttonVariants} from '@/button/button-variants.ts';

export type ALinkButtonProps = {
	readonly children: ReactNode;
	readonly className?: string;
} & ComponentProps<'a'> &
	VariantProps<typeof buttonVariants>;

export function ALinkButton(props: ALinkButtonProps) {
	const {children} = props;
	return (
		<a rel='noreferrer' {...props} className={buttonVariants(props)}>
			{children}
		</a>
	);
}
