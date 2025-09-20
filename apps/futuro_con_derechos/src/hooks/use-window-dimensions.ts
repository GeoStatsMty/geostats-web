import {useEffect, useState} from 'react';

/**
 * Retrieves the current dimensions of the browser window.
 * @returns  An object containing the width and height of the window.
 *                  - width: The inner width of the window in pixels.
 *                  - height: The inner height of the window in pixels.
 */
function getWindowDimensions() {
	const {innerWidth: width, innerHeight: height} = globalThis;
	return {
		width,
		height,
	};
}

/**
 * Custom hook that retrieves the current window dimensions and updates the dimensions
 * whenever the window is resized.
 * @returns An object containing the current width and height of the window.
 */
export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
}
