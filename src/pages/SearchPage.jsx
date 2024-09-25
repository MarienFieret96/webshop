import React, { useState } from "react";
import styled from "styled-components";
import { PageAnimation, ProductCard } from "../components";
import Banner from "../assets/images/zeebaars.jpg";
import { useSearchContext } from "../context/search_context";
import { useParams } from "react-router-dom";

const SearchPage = () => {
	const { search_products } = useSearchContext();
	const { searchTerm } = useParams();

	return (
		<PageAnimation>
			<Wrapper>
				<div className="banner">
					<img src={Banner} alt="" />
				</div>
				<div className="wrapper header">
					<div className="container">
						{search_products.length === 0 ? (
							<h2>
								Geen resultaten gevonden voor "{searchTerm}"
							</h2>
						) : (
							<h2>Zoekresultaten voor "{searchTerm}"</h2>
						)}
					</div>
				</div>
				<div className="products-container">
					{search_products?.map((item, j) => {
						return (
							<ProductCard
								item={item}
								key={j}
								index="none"
							/>
						);
					})}
				</div>
			</Wrapper>
		</PageAnimation>
	);
};

const Wrapper = styled.section`
	min-height: calc(100svh - 80px);
	.banner {
		height: 20vh;
		width: 100%;
		img {
			min-width: 100%;
		}
	}
	.header {
		padding: 1.5rem 0;
		h2 {
			text-transform: none;
		}
	}
	.products-container {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		width: var(--width);
		margin-inline: auto;
		gap: 16px;
		.container {
			grid-column: span 12;
			height: 136px;
			padding: 8px;

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
			}
			.icon {
				position: absolute;
				bottom: 0;
				right: 0.25rem;
			}
		}
	}
	@media screen and (min-width: 700px) {
		.products-container {
			.container {
				grid-column: span 3;
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
	@media screen and (min-width: 1100px) {
		.products-container {
			grid-template-columns: repeat(5, 1fr);
			.container {
				grid-column: span 1;
			}
		}
	}
`;

export default SearchPage;
