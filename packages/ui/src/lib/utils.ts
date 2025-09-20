import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

/**
 * Combines multiple class names into a single string using utility functions.
 * @param  inputs - An array of class values that can be strings, arrays, or objects.
 * @returns  A merged string of class names, with duplicates and falsy values removed.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
