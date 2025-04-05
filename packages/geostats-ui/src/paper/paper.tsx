'use client';
import React, {type ComponentProps} from 'react';
import paperVariants, {type PaperVariantProps} from '@/paper/paper-variants.ts';

export type PaperProps = ComponentProps<'div'> & PaperVariantProps;

export function Paper(props: PaperProps) {
	const {hoverEffect, spacing, ...rest} = props;
	return <div {...rest} className={paperVariants(props)} />;
}
