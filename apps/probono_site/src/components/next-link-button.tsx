import {type ComponentProps, type ReactNode} from 'react';
import {type VariantProps} from 'cva';
import {buttonVariants} from 'geostats-ui';
import Link from 'next/link';

export type NextLinkButtonProps = {
	readonly children: ReactNode;
	readonly className?: string;
} & ComponentProps<typeof Link> &
	VariantProps<typeof buttonVariants>;

export function NextLinkButton(props: NextLinkButtonProps) {
	const {children} = props;
	return (
		<Link {...props} className={buttonVariants(props)}>
			{children}
		</Link>
	);
}
