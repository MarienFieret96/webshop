import React, { useRef } from "react";
import {
	FeaturedProducts,
	PageAnimation,
	AboutUs,
	HeroWrapper,
	Waves,
} from "../components";
import UseResize from "../hooks/ResizeHook";
import styled from "styled-components";

import {
	useScroll,
	useTransform,
	useMotionTemplate,
} from "framer-motion";

const HomePage = () => {
	window.scrollTo(0, 0);
	const { width } = UseResize();
	const desktop = width >= 700;

	const aboutRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: aboutRef,
	});
	const y = useTransform(scrollYProgress, [0, 1], [16, 96]);
	const transform = useMotionTemplate`translate(32px, -${y}px)`;

	return (
		<PageAnimation>
			<Wrapper>
				<div className="body-fill"></div>
				<div className="hero-about-wrapper" ref={aboutRef}>
					<HeroWrapper />
					<AboutUs device={desktop} transform={transform} />
				</div>

				<FeaturedProducts />
				<Waves width={width} />
			</Wrapper>
		</PageAnimation>
	);
};

const Wrapper = styled.main`
	height: auto;
	position: relative;
	.body-fill {
		height: 80px;
		width: 100%;
		position: absolute;
		top: -80px;
		left: 0;
		background-color: var(--clr-dark-blue);
		z-index: 0;
	}
	.hero-about-wrapper {
		min-height: 300vh;
	}
	.hero-wrapper {
		height: 200vh;
		position: relative;
		background-color: var(--clr-dark-blue);
		z-index: 10;
		.text-wrapper {
			height: 100vh;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 0;
			margin-top: -80px;
		}
		.text {
			width: var(--width);
			color: var(--clr-white);
			height: fit-content;
			margin: auto;
			position: relative;
			/* top: 0;
			left: 50%;
			transform: translateX(-50%); */
			border-radius: 999px;
			display: flex;
			flex-direction: column;
			justify-content: end;
			align-items: center;
			gap: 32px;
			z-index: 2;
			.hero-title {
				text-align: center;
				h1 {
					margin: 0;
					font-family: "Archivo Black", sans-serif;
					font-weight: 400;
					font-variant: all-petite-caps;
					letter-spacing: 2px;
				}
				.fieret {
					font-size: 106px;
				}
				.voor {
					line-height: 0.75;
					text-transform: none;
					margin-bottom: 5px;
					font-size: 40px;
				}
				.zeebanket {
					font-size: 60px;
				}
			}
			.btn {
				box-shadow: var(--dark-shadow);
				max-width: 300px;
			}
		}
	}
	.hero {
		overflow: hidden;
		transform: translateY(-80px);
		height: 100svh;
		position: sticky;
		top: 80px;
		display: flex;

		justify-content: center;
		align-items: center;

		.images {
			position: absolute;
			inset: -2px;
			overflow: hidden;
			img {
				scale: 1;
				z-index: 0;
				position: absolute;
				width: 100%;
			}
			.first {
				animation: firstAnimation 20s linear infinite;
			}
			.second {
				animation: secondAnimation 20s linear infinite;
			}
			.third {
				animation: thirdAnimation 20s linear infinite;
			}
			.fourth {
				animation: fourthAnimation 20s linear infinite;
			}
			.overlay {
				position: absolute;
				background-color: var(--clr-dark-blue);
				inset: -2px;
				opacity: 0.6;
				z-index: 1;
			}
		}
	}
	.quote {
		height: 100vh;
		width: 100%;
		transform: translateY(-80px);
		display: flex;
		align-items: center;
		position: relative;
		z-index: 10;
		.quote-container {
			width: var(--width);
			margin: auto;
			text-align: center;
			h1 {
				color: var(--clr-white);
				font-variant: all-petite-caps;
				font-size: var(--fs-800);
				line-height: 1;
			}
			h4 {
				color: var(--clr-dark-beige);
				font-size: var(--fs-400);
				margin-bottom: 16px;
				font-family: "Times New Roman", Times, serif;
				font-weight: 300;
			}
		}
	}
	.about {
		min-height: 100vh;
		padding: 32px 0;
		width: 100%;
		transform: translateY(-80px);
		display: flex;
		align-items: center;
		background-color: var(--clr-dark-blue);
		position: relative;
		z-index: 10;
		.about-container {
			width: var(--width);
			margin: auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 32px;
			.image-container,
			.text-container {
				/* flex: 1; */
			}
			.image-container {
				overflow: hidden;

				max-width: 450px;
			}
			.text-container {
				max-width: 350px;
				/* padding: 32px; */
				background-color: var(--clr-dark-blue);
				h4 {
					color: var(--clr-dark-beige);
					font-size: var(--fs-400);
					margin-bottom: 8px;
					font-family: "Times New Roman", Times, serif;
					font-weight: 300;
				}
				p {
					color: var(--clr-white);
					line-height: 1.5;
					font-weight: 300;
				}
			}
		}
	}
	.featured-products {
		background-color: var(--clr-white);
		overflow-x: clip;
		.featured-products-container {
			height: 300vh;
			width: var(--width);
			margin-inline: auto;
			margin-top: -100vh;
			/* overflow-y: clip; */
			.image-wrapper {
				height: 100vh;
				position: sticky;
				top: 0;
				display: flex;
				align-items: center;
				.images {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
					gap: 16px;
					position: relative;
					.image-title {
						grid-column: span 3;
						margin-bottom: -8px;
						h4 {
							font-size: var(--fs-400);
							color: var(--clr-dark-beige);
							font-family: "Times New Roman", Times, serif;
							font-weight: 300;
						}
					}
					.btn {
						grid-column: span 3;
						grid-row: 5;
						transition: none;
					}
					.image-container {
						overflow: clip;
						border-radius: var(--radius);
						width: 100%;
						aspect-ratio: 1;
						grid-column: span 3;
						position: relative;
						/* transition: all 0.3s linear; */
						.image-name {
							position: absolute;
							top: 0;
							left: 0;
							height: 100%;
							width: 100%;
							background: linear-gradient(
								0deg,
								#1a1a2e 0%,
								#1a1a2e51 30%,
								#1a1a2e10 100%
							);
							display: flex;
							align-items: end;
							padding: 16px;
							h4 {
								color: var(--clr-white);
								font-size: var(--fs-400);
							}
						}
					}
					.active:hover {
						cursor: pointer;
						img {
							transform: scale(1.02);
							transition: 0.1s linear;
						}
						.image-name {
							h4 {
								text-decoration: underline;
								text-underline-offset: 2px;
							}
						}
					}
				}
			}
		}
	}
	.waves {
		position: relative;
		width: 100%;
		height: 150px;
		overflow: hidden;
		background-color: var(--clr-white);
		margin-top: 100vh;
		.wave {
			position: absolute;
			bottom: -1px;
			left: 0;
			height: 100px;
			width: 100%;
			background-size: 1000px 100px;
		}
		.wave1 {
			animation: animate 40s linear infinite;
			z-index: 90;
			opacity: 1;
			animation-delay: 0s;
			bottom: 0;
		}
		.wave2 {
			animation: animate2 30s linear infinite;
			z-index: 89;
			opacity: 0.5;
			animation-delay: -5s;
			bottom: 10px;
		}
		.wave3 {
			animation: animate 20s linear infinite;
			z-index: 87;
			opacity: 0.2;
			animation-delay: -2s;
			bottom: 15;
		}
		.wave4 {
			animation: animate2 10s linear infinite;
			z-index: 86;
			opacity: 0.7;
			animation-delay: -5s;
			bottom: 25px;
		}
	}

	@media screen and (min-width: 700px) {
		.hero-wrapper .text {
			.hero-title {
				.fieret {
					font-size: 180px;
					line-height: 1.2;
				}
				.voor {
					font-size: 50px;
				}
				.zeebanket {
					font-size: 85px;
				}
			}
			.btn {
				margin-top: 32px;
				width: 320px;
				max-width: 320px;
			}
		}
		.about {
			padding: 64px 0;
			.about-container {
				flex-direction: row-reverse;
				gap: 0;
				.text-container {
					padding: 32px;
					border-radius: var(--radius);
					transform: translateX(-32px);
					z-index: 1;
					/* box-shadow: -2px -2px 2px var(--clr-dark-blue); */
				}
				.image-container {
					transform: translate(32px, -64px);
					aspect-ratio: 1;
					width: 100%;
					box-shadow: 0 0px 25px #e093853b;
					position: relative;
				}
			}
		}
		.featured-products {
			.featured-products-container {
				.image-wrapper {
					.images {
						.image-container {
							grid-column: span 1;
							grid-row: 2;
						}
						.one {
							grid-column: 1;
						}
						.two {
							grid-column: 2;
						}
						.three {
							grid-column: 3;
						}
						.image-title {
							grid-column: 1 / 3;
							grid-row: 1;
							h4 {
								margin-bottom: 8px;
							}
						}
						.btn {
							grid-column: 3;
							grid-row: 3;
							width: fit-content;
							margin-left: auto;
						}
					}
				}
			}
		}
	}

	@keyframes firstAnimation {
		0% {
			opacity: 0.5;
			transform: scale(1);
		}
		5% {
			opacity: 1;
		}
		25% {
			opacity: 1;
			transform: scale(1.1);
		}
		30% {
			opacity: 0.01;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
	@keyframes secondAnimation {
		0% {
			opacity: 0;
			transform: scale(1.1);
		}
		24% {
			opacity: 0;
		}
		25% {
			opacity: 0.5;
			transform: scale(1.1);
		}
		30% {
			opacity: 1;
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
		55% {
			opacity: 0.01;
		}
		100% {
			transform: scale(1.1);
			opacity: 0;
		}
	}
	@keyframes thirdAnimation {
		0% {
			opacity: 0;
			transform: scale(1);
		}
		49% {
			opacity: 0;
		}
		50% {
			opacity: 0.5;
			transform: scale(1.1);
		}
		55% {
			opacity: 1;
		}
		75% {
			opacity: 1;
			transform: scale(1);
		}
		80% {
			transform: scale(1);
			opacity: 0.01;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
	@keyframes fourthAnimation {
		0% {
			opacity: 0;
		}
		74% {
			opacity: 0;
		}
		75% {
			opacity: 0.5;
			transform: scale(1);
		}
		80% {
			opacity: 1;
		}
		100% {
			transform: scale(1.1);
			opacity: 1;
		}
	}
	@keyframes animate {
		0% {
			background-position-x: 0;
		}
		100% {
			background-position-x: 1000px;
		}
	}
	@keyframes animate2 {
		0% {
			background-position-x: 0;
		}
		100% {
			background-position-x: -1000px;
		}
	}
`;

export default HomePage;
