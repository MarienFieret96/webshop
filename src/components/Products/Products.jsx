import React from "react";
import {
	ProductCard,
	Category,
	Loading,
	Error,
} from "../../components";
import styled from "styled-components";
import { categorieen } from "../../utils/data";
import { useProductContext } from "../../context/products_context";

const Products = ({
	activeCategory,
	handleCategoryChange,
}) => {
	const { products, product_loading, product_error } =
		useProductContext();

	return (
		<Wrapper>
			<div className="wrapper products">
				{categorieen?.map((cat, index) => {
					return (
						<Category
							cat={cat}
							key={index}
							index={index}
							handleCategoryChange={handleCategoryChange}
							products={products[index]}
						/>
					);
				})}
				{}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.wrapper {
		padding: 1rem 0;
		.cat {
			grid-column: span 12;
			scroll-margin-top: 10rem;

			.container {
				height: 136px;
				padding: 8px;
				margin: 16px 0;
				display: flex;
				border: 1px solid var(--clr-light-grey);
				border-radius: var(--radius);
				box-shadow: var(--light-shadow);
				position: relative;

				.img-container {
					height: 100%;
					aspect-ratio: 1;
					border-radius: 6px;
					box-shadow: var(--light-shadow);
				}
				.text-container {
					width: 100%;
					padding: 0 1rem;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					h4 {
						display: flex;
						align-items: baseline;
						gap: 8px;
						font-weight: 600;
						font-size: var(--fs-500);

						span {
							font-size: var(--fs-200);

							font-weight: 400;
						}
					}
					.name {
						font-size: var(--fs-500);
						font-weight: 600;
					}
					/* .prijs {
						display: flex;
						gap: 0.5rem;
						h4 {
							font-weight: 600;
						}
						h6 {
							display: flex;
							align-items: end;
							margin-bottom: 3px;
							opacity: 0.7;
						}
					} */
				}
				.icon {
					position: absolute;
					bottom: 0;
					right: 0.25rem;
				}
			}
		}
	}
	@media screen and (min-width: 700px) {
		.wrapper {
			.cat {
				display: grid;
				grid-template-columns: repeat(12, 1fr);
				gap: 12px;
				.category-banner {
					grid-column: span 12;
					h2 {
						font-size: var(--fs-500);
					}
				}
				.container {
					grid-column: span 4;
					height: fit-content;
					margin: 0;
					padding: 12px;
					display: grid;
					grid-template-rows: 4fr 3fr;
					.img-container {
						overflow: hidden;
						border-radius: 6px 6px 0 0;
						img {
							transition: 0.1s linear;
						}
					}
					.text-container {
						padding: 0;
						padding-top: 12px;
						h4 {
							font-size: var(--fs-300);
							gap: 4px;
							transition: all 0.1s linear;
							span {
								font-weight: 100;
							}
						}
						.name {
							font-size: var(--fs-400);
							gap: 4px;
							transition: all 0.1s linear;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2; /* number of lines to show */
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}
					.icon {
						display: none;
					}
				}
				.container:hover {
					cursor: pointer;
					img {
						transform: scale(1.02);
					}
					.name {
						text-decoration: underline;
						text-underline-offset: 2px;
					}
				}
			}
		}
		.products {
			gap: 24px;
			padding-left: 24px;
			width: 100%;
			z-index: 2;
		}
	}
	@media screen and (min-width: 1100px) {
		.wrapper {
			.cat {
				.container {
					grid-column: span 3;

					.text-container {
						h4 {
							font-size: var(--fs-400);
						}
					}
				}
			}
		}
	}
`;

export default Products;
