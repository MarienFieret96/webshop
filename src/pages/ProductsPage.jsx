import React, { useState } from "react";
import styled from "styled-components";
import {
	PageAnimation,
	Filters,
	Products,
	Loading,
	Error,
} from "../components";
import { useProductContext } from "../context/products_context";
import UseSticky from "../hooks/StickyHook";
import Banner from "../assets/images/zeebaars.jpg";

const ProductsPage = () => {
	const [activeCategory, setActiveCategory] = useState(0);
	const handleCategoryChange = (index, click) => {
		if (click === "true") {
			const element = document.getElementById(
				`category-${index}`,
			);
			if (element) {
				element.scrollIntoView();
			}
		}
		setActiveCategory(index);
	};

	const { ref, isSticky } = UseSticky();

	const { product_loading, product_error } =
		useProductContext();

	if (product_loading) {
		return <Loading />;
	}
	if (product_error) {
		return <Error />;
	}

	return (
		<PageAnimation>
			<Wrapper>
				<div className="banner">
					<img src={Banner} alt="" />
				</div>
				<div className="wrapper header" id="start">
					<div className="container">
						<h2>Producten</h2>
						<p>
							Bekijk ons ruime assortiment van verse vis,
							bijpassende wijnen en nog veel meer
						</p>
					</div>
				</div>
				<div className="test">
					<div
						className={`${
							isSticky ? "sticky border" : "sticky"
						}`}
						ref={ref}
					>
						<Filters
							handleCategoryChange={handleCategoryChange}
							activeCategory={activeCategory}
						/>
					</div>
					<Products
						handleCategoryChange={handleCategoryChange}
						activeCategory={activeCategory}
					/>
				</div>
			</Wrapper>
		</PageAnimation>
	);
};

const Wrapper = styled.section`
	.banner {
		height: 20vh;
		width: 100%;
		img {
			min-width: 100%;
		}
	}
	.header {
		padding: 1.5rem 0;
	}

	.sticky {
		position: sticky;
		top: calc(5rem - 2px);
		background-color: var(--clr-white);
		z-index: 998;
		padding: 16px 0;
	}
	.border {
		box-shadow: 0px 4px 3px #33333310;
	}
	@media screen and (min-width: 700px) {
		.test {
			position: relative;
			display: grid;
			grid-template-columns: 1fr 3fr;
			width: var(--width);
			margin-inline: auto;
			.sticky {
				padding: 0;
				z-index: 1;
				height: calc(100vh - 80px);
				overflow-y: hidden;
				scrollbar-gutter: stable;
			}

			.sticky:hover {
				overflow-y: scroll;
			}
			.sticky::-webkit-scrollbar {
				background-color: var(--clr-white);
				width: 8px;
			}

			.sticky::-webkit-scrollbar-thumb {
				background: var(--clr-light-grey);
				border-radius: 999px;
			}
			.border {
				box-shadow: none;
			}
		}
	}
	@media screen and (min-width: 1100px) {
		.test {
			grid-template-columns: 1fr 4fr;
		}
	}
`;

export default ProductsPage;
