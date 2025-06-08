import {RefObject, useEffect, useLayoutEffect, useState} from 'react';
import invariant from 'ts-invariant';

export type UseResizeObserverOptions = {
	ref: RefObject<HTMLElement | null>;
}

/**
 * Custom hook to track the size (width and height) of a given DOM element using a ResizeObserver.
 * @param  options - The options object containing the ref of the DOM element to observe.
 * @param  options.ref - A React ref object pointing to the DOM element to observe.
 * @returns An object containing the current width and height of the observed DOM element.
 */
export function useElementSize(options: UseResizeObserverOptions) {
	const {ref} = options;
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		if (!ref.current) return;

		setWidth(ref.current.offsetWidth);
		setHeight(ref.current.offsetHeight);

		const resizeObserver = new ResizeObserver((entries) => {
			invariant(entries.length === 1, 'Expected ResizeObserver to observe only one element');
			const [entry] = entries;
			setWidth(entry.borderBoxSize[0].inlineSize);
			setHeight(entry.borderBoxSize[0].blockSize);
		});

		resizeObserver.observe(ref.current);

		return () => resizeObserver.disconnect();
	}, [ref]);


	return {width, height};
}
