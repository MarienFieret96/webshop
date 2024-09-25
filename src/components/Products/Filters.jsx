import React, { useState } from "react";
import styled from "styled-components";

import { SearchBar } from "../../components";
import FilterBar from "./FilterBar";

const Filters = ({
	activeCategory,
	handleCategoryChange,
}) => {
	const [searchStatus, setSearchStatus] = useState(false);
	const [findCategory, setFindCategory] = useState(false);
	const renderContent = () => {
		if (searchStatus) {
			return (
				<SearchBar
					clicked={"true"}
					filterBar={"filterBar"}
					setSearchStatus={setSearchStatus}
				/>
			);
		}
		if (findCategory) {
			return <h1>Categorie</h1>;
		}
		return (
			<FilterBar
				activeCategory={activeCategory}
				handleCategoryChange={handleCategoryChange}
				setFindCategory={setFindCategory}
				setSearchStatus={setSearchStatus}
			/>
		);
	};
	return <Wrapper>{renderContent()}</Wrapper>;
};

const Wrapper = styled.section`
	width: var(--width);
	margin-inline: auto;
	overflow-x: clip;
	overflow-y: visible;

	.filter {
		display: flex;
		align-items: center;
		min-height: 49.6px;
		.categorie-wrapper {
			position: relative;
			z-index: 1;
			display: flex;
			-ms-overflow-style: none;
			scrollbar-width: none;
			margin-left: 40px;
			h3,
			.searchbar-fullscreen {
				display: none;
			}

			.categorieen {
				display: flex;

				.categorie {
					white-space: nowrap;
					padding: 8px 16px;
					border-radius: 999px;
					position: relative;
				}

				.active {
					background-color: var(--clr-black);
					color: var(--clr-white);
				}
			}
			.categorie-wrapper::-webkit-scrollbar {
				display: none;
			}
		}

		.zoeken {
			padding-right: 8px;
			z-index: 2;
			background-color: var(--clr-white);
			position: absolute;
			left: 0;
			height: calc(100% - 2px);
			svg {
				margin-left: 16px;
			}
		}
		.menu {
			padding-left: 0.5rem;
			z-index: 2;
			background-color: var(--clr-white);
			position: absolute;
			right: 0;
			height: calc(100% - 2px);
			svg {
				margin-right: 16px;
			}
		}
	}
	@media screen and (min-width: 700px) {
		width: 100%;
		.filter {
			width: 100%;
			.zoeken,
			.menu {
				display: none;
			}

			.categorie-wrapper {
				width: 100%;
				margin: 0;
				display: flex;
				flex-direction: column;
				margin: 20px 0;

				.searchbar-fullscreen {
					display: block;
					position: relative;
					padding-right: 12px;
					.icon {
						position: absolute;
						left: 6px;
						top: 50%;

						transform: translateY(-50%);
						line-height: 0;
					}
					input {
						background-color: var(--clr-white);
						border: 1px solid var(--clr-light-grey);
						padding: 12px 12px 12px 44px;
					}
				}
				h3 {
					display: block;
				}
				.categorieen {
					flex-direction: column;
					width: 100%;

					.categorie {
						border-radius: var(--radius);
						padding: 8px 0;
						font-weight: 100;
						transition: var(--transition);
					}
					.categorie:hover {
						cursor: pointer;
						transform: translateX(3px);
					}
					.active {
						color: var(--clr-dark-blue);
						background-color: transparent;
						font-weight: 700;
					}
				}
			}
		}
	}
`;

export default Filters;
