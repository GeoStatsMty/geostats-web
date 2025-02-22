import * as cva from 'cva';
import { VariantProps } from 'cva';

declare const buttonVariants: (props?: ({
    size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    variant?: "text" | "primary" | "secondary" | "outlined" | "destructive" | undefined;
} & ({
    class?: cva.ClassValue;
    className?: never;
} | {
    class?: never;
    className?: cva.ClassValue;
})) | undefined) => string;
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export { type ButtonVariantProps, buttonVariants };
