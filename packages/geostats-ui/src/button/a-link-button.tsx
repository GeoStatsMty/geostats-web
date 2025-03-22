'use client';
import {type ComponentProps, type ReactNode} from 'react';
import {type VariantProps} from 'cva';
import {buttonVariants} from '@/button/button-variants.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ALinkButtonProps = {
	readonly children: ReactNode;
	readonly className?: string;
} & ComponentProps<'a'> &
	VariantProps<typeof buttonVariants>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ALinkButton(props: ALinkButtonProps) {
	const {children} = props;
	return (
		// eslint-disable-next-line react/jsx-no-target-blank
		<a rel='noreferrer' {...props} className={buttonVariants(props)}>
			{children}
		</a>
	);
}
