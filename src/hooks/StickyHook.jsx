import { useState, useRef, useEffect } from "react";

function UseSticky() {
	const ref = useRef(null);
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		if (!ref.current) {
			return;
		}
		const observer = new IntersectionObserver(
			([e]) => setIsSticky(e.intersectionRatio < 1),
			{ threshold: [1], rootMargin: "-81px 0px 0px 0px" },
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return { ref, isSticky };
}

export default UseSticky;
