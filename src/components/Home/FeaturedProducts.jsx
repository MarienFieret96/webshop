import React, {
	useRef,
	useMemo,
	useEffect,
	useState,
} from "react";
import UseResize from "../../hooks/ResizeHook";
import SquarePic from "../../assets/images/picture-1-square.jpg";
import Oesters from "../../assets/images/oesters.png";
import Visschotel from "../../assets/images/visschotel2.png";
import Zalm from "../../assets/images/zalm_mirror.png";
import {
	useScroll,
	useTransform,
	motion,
	useMotionValueEvent,
	progress,
} from "framer-motion";
import { useCartContext } from "../../context/cart_context";

const FeaturedProducts = () => {
	// console.log("feature");
	// const { changeLayout } = useCartContext();

	const { width, height } = UseResize();
	const [imageContainerWidth, setImageContainerWidth] =
		useState(0);
	const carouselWrapperRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: carouselWrapperRef,
		offset: ["start start", "end start"],
	});

	const maximumScale = useMemo(() => {
		if (imageContainerWidth === 0) return;
		const windowYRatio = height / width;
		let wrapperWidth;
		if (width < 700) {
			wrapperWidth = width - 32;
		} else {
			wrapperWidth = (imageContainerWidth - 32) / 3;
		}
		const xScale = width / wrapperWidth;
		const yScale = xScale * windowYRatio;
		return Math.max(xScale, yScale);
	}, [width, height, imageContainerWidth]);

	const scale = useTransform(
		scrollYProgress,
		[0.33, 0.45, 0.66],
		[maximumScale * 1.1, maximumScale, 1],
	);

	const postersOpacity = useTransform(
		scrollYProgress,
		[0.6, 0.66],
		[0, 1],
	);
	const posterTranslateXLeft = useTransform(
		scrollYProgress,
		[0.6, 0.66],
		[-40, 0],
	);
	const posterTranslateXRight = useTransform(
		scrollYProgress,
		[0.6, 0.66],
		[40, 0],
	);

	const [carouselVariant, setCarouselVariant] =
		useState("inactive");

	useMotionValueEvent(
		scrollYProgress,
		"change",
		(progress) => {
			if (progress >= 0.66) {
				setCarouselVariant("active");
			} else {
				setCarouselVariant("inactive");
			}
		},
	);

	useEffect(() => {
		setImageContainerWidth(
			carouselWrapperRef.current.clientWidth,
		);
	}, [height, width]);

	return (
		<motion.div
			className="featured-products"
			animate={carouselVariant}
		>
			<div
				className="featured-products-container "
				ref={carouselWrapperRef}
			>
				<div
					className="image-wrapper"
					style={{
						paddingTop:
							width < 700 ? `${(width - 32) * 2}px` : 0,
					}}
				>
					<div className="images">
						<motion.div
							className="image-title"
							style={{
								opacity: postersOpacity,
								x: width < 700 ? 0 : posterTranslateXLeft,
							}}
						>
							<h4>Assortiment</h4>
							<h2>Altijd vers, altijd lekker!</h2>
						</motion.div>
						<motion.button
							className="btn btn-primary"
							style={{
								opacity: postersOpacity,
								x: width < 700 ? 0 : posterTranslateXRight,
							}}
						>
							Alle producten bekijken
						</motion.button>
						<motion.div
							className={`image-container two ${carouselVariant}`}
							style={{ scale }}
						>
							<img src={Zalm} alt="" />
							<motion.div
								className="image-name"
								variants={{
									active: { opacity: 1 },
									inactive: { opacity: 0 },
								}}
								transition={{ duration: 0.4 }}
							>
								<h4>Verse vis</h4>
							</motion.div>
						</motion.div>
						<motion.div
							className={`image-container one ${carouselVariant}`}
							style={{
								opacity: postersOpacity,
								x: width < 700 ? 0 : posterTranslateXLeft,
							}}
						>
							<img src={Oesters} alt="" />
							<motion.div
								className="image-name"
								variants={{
									active: { opacity: 1 },
									inactive: { opacity: 0 },
								}}
								transition={{ duration: 0.4 }}
							>
								<h4>Oesters</h4>
							</motion.div>
						</motion.div>

						<motion.div
							className={`image-container three ${carouselVariant}`}
							style={{
								opacity: postersOpacity,
								x: width < 700 ? 0 : posterTranslateXRight,
							}}
						>
							<img src={Visschotel} alt="" />
							<motion.div
								className="image-name"
								variants={{
									active: { opacity: 1 },
									inactive: { opacity: 0 },
								}}
								transition={{ duration: 0.4 }}
							>
								<h4>Visschotels</h4>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default FeaturedProducts;
