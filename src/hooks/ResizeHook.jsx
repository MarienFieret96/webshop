import { useState, useLayoutEffect } from "react";

function UseResize() {
	const [size, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	useLayoutEffect(() => {
		function updateSize() {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () =>
			window.removeEventListener("resize", updateSize);
	}, []);
	return size;
}

export default UseResize;
