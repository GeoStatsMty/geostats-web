import * as cva from 'cva';
import { VariantProps } from 'cva';

declare const paperVariants: (props?: ({
    hoverEffect?: boolean | undefined;
    spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
} & ({
    class?: cva.ClassValue;
    className?: never;
} | {
    class?: never;
    className?: cva.ClassValue;
})) | undefined) => string;
type PaperVariantProps = VariantProps<typeof paperVariants>;

export { type PaperVariantProps, paperVariants as default };
