import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
	PageAnimation,
	AddToCart,
	Error,
	Loading,
	ProductDescription,
	RelatedProducts,
	ImageCarousel,
	Modal,
} from "../components";
import { useProductContext } from "../context/products_context";
import UseResize from "../hooks/ResizeHook";
import { AnimatePresence } from "framer-motion";
import { Back } from "../assets/icons";

const SingleProductPage = () => {
	const [modal, setModal] = useState(false);

	window.scrollTo(0, 0);
	const {
		single_product,
		single_product_loading,
		single_product_error,
	} = useProductContext();

	const {
		_id,
		bigImage,
		naam,
		opties,
		prijs,
		relatedProducts,
		wijn,
	} = single_product;

	const navigate = useNavigate();

	if (single_product_loading) {
		return <Loading />;
	}
	if (single_product_error) {
		return <Error />;
	}

	if (!Object.keys(single_product).length) {
		return <Error />;
	}

	return (
		<PageAnimation>
			<Wrapper>
				<AnimatePresence>
					{modal && (
						<Modal
							prijs={prijs}
							opties={opties}
							naam={naam}
							setModal={setModal}
							productId={_id}
						/>
					)}
				</AnimatePresence>
				<div className="wrapper product-description">
					<div
						className="backbutton"
						onClick={() => navigate(-1)}
					>
						<Back />
						<span>Terug</span>
					</div>
					<ImageCarousel afbeeldingen={bigImage} />
					<ProductDescription
						modal={modal}
						setModal={setModal}
						size={"desktop"}
					/>
				</div>
				<div className="wrapper">
					{wijn.length !== 0 ? (
						<RelatedProducts
							producten={wijn}
							titel="Bijpassende wijnen"
						/>
					) : null}

					<RelatedProducts
						producten={relatedProducts}
						titel="Gerelateerde producten"
					/>
				</div>
			</Wrapper>
			<AddToCart
				modal={modal}
				setModal={setModal}
				size={"mobile"}
			/>
		</PageAnimation>
	);
};

const Wrapper = styled.section`
	margin-top: 16px;
	.product-description {
	}
	.wrapper {
		margin-bottom: 16px;
		.backbutton {
			display: flex;
			align-items: center;
			transform: translateX(-12px);
			svg {
				padding: 5px;
			}
		}
		.backbutton:hover {
			cursor: pointer;
		}
		.image {
			width: 100%;
			aspect-ratio: 1;
			img {
			}
		}
		.information-wrapper {
			grid-column: span 12;
			overflow: hidden;
			border-top: 1px solid var(--clr-light-grey);
			padding-top: 16px;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;

				h3 {
					margin: 0;
				}
				.down-button {
					line-height: 0;
				}
			}
			.information-container {
				display: flex;
				flex-direction: column;
				gap: 4px;
				h4 {
					padding-top: 4px;
					text-transform: capitalize;
				}
				p {
					margin: 0;
				}
				.space-out {
					display: grid;
					grid-template-columns: 1fr 2fr;
					.middel {
						font-weight: bold;
					}
				}
			}
		}
		.description {
			h4 {
				display: flex;
				gap: 8px;
				font-size: var(--fs-500);
				margin-bottom: 16px;
				align-items: baseline;
				span {
					font-size: var(--fs-300);
					text-transform: none;
					font-weight: 100;
				}
			}
			.btn {
				display: none;
			}
		}
		.related {
			.products {
				/* position: relative; */
				overflow-y: scroll;
				-ms-overflow-style: none;
				scrollbar-width: none;
				display: flex;
				gap: 8px;
				.product-card {
					position: relative;
					min-height: 125px;
					height: 125px;
					min-width: 125px;
					width: 125px;
					border-radius: var(--radius);
					border: var(--border);
					overflow: hidden;
					h4 {
						position: absolute;
						bottom: 0;
						width: 100%;
						background: linear-gradient(
							0deg,
							rgba(0, 0, 0, 1) 0%,
							rgba(0, 0, 0, 0.7) 50%,
							rgba(0, 0, 0, 0) 100%
						);
						text-align: center;
						padding-top: 12px;
						padding-bottom: 8px;
						color: var(--clr-white);
					}
				}
			}
			.products::-webkit-scrollbar {
				display: none;
			}
		}
		.add-to-cart {
			position: sticky;
			bottom: 0;
		}
		.desktop {
			display: none;
		}
	}
	@media screen and (min-width: 700px) {
		.wrapper {
			gap: 16px;
			.backbutton {
				grid-column: span 12;
			}
			.description,
			.image {
				grid-column: span 6;
				aspect-ratio: unset;
				margin-bottom: 32px;
			}
			.image {
				/* padding: 32px; */
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				border: 1px solid var(--clr-light-grey);
				img {
				}
			}
			.description {
				display: flex;
				flex-direction: column;
				width: 100%;
				margin-left: 16px;
				padding-right: 16px;
				h1 {
					margin: 0;
				}
				p,
				button {
					max-width: 400px;
				}

				.btn {
					display: block;
					margin-top: 32px;
				}
			}
			.information-wrapper:first-of-type {
				margin-top: 64px;
			}
			.information-wrapper:hover {
				cursor: pointer;
				h3 {
					text-decoration: underline;
					text-underline-offset: 2px;
				}
			}
			.desktop {
				display: block;
			}
		}
	}
	@media screen and (min-width: 1100px) {
		.wrapper {
			grid-template-columns: 400px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			.image,
			.description {
				grid-column: span 1;
			}
			.description {
				grid-column: span 11;
				/* p,
				button {
					width: 400px;
				} */
			}
			.information-wrapper {
				grid-column: span 12;
				max-width: 832px;
			}
		}
	}
`;

export default SingleProductPage;
