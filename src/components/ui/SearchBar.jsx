import React, {
	useState,
	useDeferredValue,
	useEffect,
	useLayoutEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useSearchContext } from "../../context/search_context";
import { useProductContext } from "../../context/products_context";
import { useNavigate } from "react-router-dom";

import { Search, Close } from "../../assets/icons";

const SearchBar = ({
	clicked,
	filterBar,
	setSearchStatus,
	handleClick,
}) => {
	const {
		search_items,
		updateSearchQuery,
		clearSearchQuery,
	} = useSearchContext();
	const { setSingleProduct } = useProductContext();
	const [searchBarStatus, setSearchBarStatus] =
		useState(false);
	const [query, setQuery] = useState("");
	const [searchItems, setSearchItems] =
		useState(search_items);

	const deferrredQuery = useDeferredValue(query);

	const navigate = useNavigate();

	useEffect(() => {
		updateSearchQuery(deferrredQuery);
	}, [deferrredQuery]);

	useLayoutEffect(() => {
		setSearchItems(search_items);
	}, [search_items]);

	const handleFocus = () => {
		setSearchBarStatus(true);
	};
	const handleClose = () => {
		updateSearchQuery("");
		setQuery("");
		setSearchBarStatus(false);
		if (filterBar) {
			setSearchStatus(false);
		}
	};

	const handleSearch = () => {
		if (query === "") return;
		clearSearchQuery();
		handleClose();
		navigate(`/zoeken/${query}`);
		if (!filterBar) {
			handleClick("close");
		}
	};

	const handleSearchOptionClick = (item) => {
		setSingleProduct(item);
		handleClose();
		navigate(`/producten/${item.slug}`);
		if (!filterBar) {
			handleClick("close");
		}
	};

	return (
		<Wrapper>
			{searchBarStatus && (
				<div
					className="backdrop"
					onClick={handleClose}
				></div>
			)}
			<div
				className={
					searchBarStatus
						? "searchbar-wrapper active"
						: "searchbar-wrapper"
				}
			>
				<div className="searchbar">
					<div className="main-search center">
						<Search />
					</div>
					{clicked ? (
						<input
							type="text"
							placeholder="Waar ben je naar op zoek?"
							autoFocus
							onFocus={handleFocus}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleSearch();
								}
							}}
						/>
					) : (
						<input
							type="text"
							placeholder="Waar ben je naar op zoek?"
							onFocus={handleFocus}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleSearch();
								}
							}}
						/>
					)}

					{searchBarStatus && (
						<div
							className="close-btn center"
							onClick={handleClose}
						>
							<Close />
						</div>
					)}
				</div>
				<div
					className="search-results"
					style={{
						height:
							query.length > 0
								? `calc(${searchItems.length} * 50px + 50px)`
								: 0,
						maxHeight: "300px",
						bottom: searchItems.length * -50 - 8 - 50,
						border:
							searchItems.length > 0
								? "1px solid var(--clr-light-grey)"
								: "none",
					}}
				>
					{query.length > 0 ? (
						<div
							className="search-result"
							style={{ border: "none" }}
							onClick={handleSearch}
						>
							<Search />

							<h4>Zoek "{query}"</h4>
						</div>
					) : null}

					{searchItems.map((item, index) => {
						if (index > 3) return;
						return (
							<div
								className="search-result"
								key={index}
								onClick={() =>
									handleSearchOptionClick(item)
								}
							>
								<Search />
								<h4>{item.naam}</h4>
							</div>
						);
					})}
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	min-height: 49.6px;
	/* .active {
		box-shadow: var(--dark-shadow);
	} */
	.searchbar-wrapper {
		position: absolute;
		width: 100%;
		z-index: 991;
		border-radius: 24px;
		border: var(--border-dark);
		transition: var(--transition);
		background-color: var(--clr-white);
		overflow-x: clip;
		opacity: 1;
		.searchbar {
			display: flex;
			align-items: center;
			padding: 0 8px;
			input {
				border: none;
				background-color: transparent;
				flex: 1;
				padding: 12px 8px;
			}
			input:focus {
				border: none;
				outline: none;
			}
		}
		.search-results {
			position: absolute;
			z-index: 992;

			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: var(--clr-white);
			border-radius: var(--radius);
			border: 1px solid var(--clr-dark-blue);

			overflow: hidden;
			.search-result {
				display: flex;
				align-items: center;
				height: 50px;
				border-top: 1px solid var(--clr-light-grey);
				padding: 0 8px;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
				h4 {
					padding: 0 8px;
				}
			}
		}
	}
`;

export default SearchBar;
