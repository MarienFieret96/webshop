import React, { useRef, useEffect } from "react";
import { Hero, Quote } from "../../components";
import {
	useScroll,
	useTransform,
	motion,
	useInView,
} from "framer-motion";

import { useNavigate } from "react-router-dom";
import UseResize from "../../hooks/ResizeHook";
import { useCartContext } from "../../context/cart_context";

const HeroWrapper = () => {
	const navigate = useNavigate();

	const heroRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end end"],
	});
	const opacity = useTransform(
		scrollYProgress,
		[0, 0.8, 1],
		[0.6, 1, 1],
	);

	const { width, height } = UseResize();
	const desktop = width >= 700;

	const isInView = useInView(heroRef, {
		margin: `${height}px 0px 0px 0px`,
	});
	const { changeLayout, nav_layout } = useCartContext();
	useEffect(() => {
		if (scrollYProgress.current === 0 && nav_layout) return;
		changeLayout(isInView);
	}, [isInView]);
	return (
		<div ref={heroRef} className="hero-wrapper">
			<Hero opacity={opacity} />
			<div className="text-wrapper">
				<motion.div
					className="text"
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1 },
					}}
					whileInView="visible"
					exit="hidden"
					animate="hidden"
					viewport={{ amount: 0.98 }}
				>
					<div className="hero-title">
						<h1 className="fieret">FIERET</h1>
						<h1 className="voor">voor</h1>
						<h1 className="zeebanket">zeebanket</h1>
					</div>
					<button
						className="btn btn-primary"
						onClick={() => navigate("/producten")}
					>
						Producten
					</button>
				</motion.div>
			</div>
			<Quote />
		</div>
	);
};

export default HeroWrapper;
