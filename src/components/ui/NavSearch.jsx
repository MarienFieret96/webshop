import React, {
	useState,
	useRef,
	useDeferredValue,
	useEffect,
	useLayoutEffect,
} from "react";
import {
	motion,
	AnimatePresence,
	delay,
} from "framer-motion";
import { useCartContext } from "../../context/cart_context";
import { useSearchContext } from "../../context/search_context";
import { useProductContext } from "../../context/products_context";
import { useNavigate, useLocation } from "react-router-dom";

import { Search, Close } from "../../assets/icons";

const variants = {
	visible: {
		width: "auto",
		backgroundColor: "#fff",
		border: "1px solid var(--clr-light-grey)",
	},
	hidden: {
		width: "48px",
		backgroundColor: "#ffffff0",
		border: "1px solid transparent",
	},
};
const inputVariant = {
	visible: { backgroundColor: "#fff" },
	hidden: {
		backgroundColor: "var(--clr-white)",
	},
};
const closeVariant = {
	visible: { opacity: 1, transition: { delay: 0.1 } },
	hidden: { opacity: 0 },
};

const NavSearch = () => {
	const { addWhiteBackground, nav_layout } =
		useCartContext();
	const {
		search_items,
		updateSearchQuery,
		clearSearchQuery,
	} = useSearchContext();
	const { setSingleProduct } = useProductContext();

	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [searchItems, setSearchItems] =
		useState(search_items);
	const [query, setQuery] = useState("");

	const deferredQuery = useDeferredValue(query);

	useEffect(() => {
		updateSearchQuery(deferredQuery);
	}, [deferredQuery]);

	useLayoutEffect(() => {
		setSearchItems(search_items);
	}, [search_items]);

	const inputRef = useRef(null);
	const [searchBarOpen, setSearchBarOpen] =
		useState("hidden");

	const handleSearchButtonClick = () => {
		if (searchBarOpen === "hidden") {
			handleFocus();
		}
		if (searchBarOpen === "visible") {
			handleSearch();
		}
	};

	const handleFocus = () => {
		setSearchBarOpen("visible");
		inputRef.current.focus();
		addWhiteBackground(true);
	};
	const handleClose = () => {
		setSearchBarOpen("hidden");
		addWhiteBackground(false);
		updateSearchQuery("");
		setQuery("");
	};

	const handleSearch = () => {
		if (query === "") return;
		clearSearchQuery();
		handleClose();
		navigate(`/zoeken/${query}`);
	};

	const handleSearchOptionClick = (item) => {
		setSingleProduct(item);
		navigate(`/producten/${item.slug}`);
		handleClose();
	};

	return (
		<>
			{searchBarOpen === "visible" ? (
				<div
					className="navbar-search-overlay"
					onClick={handleClose}
				/>
			) : null}
			{/* <div className="navbar-search-overlay" /> */}

			<motion.div
				className="navbar-search"
				animate={searchBarOpen}
				variants={variants}
				transition={{ duration: 0.4 }}
			>
				<div
					className={
						pathname === "/" &&
						searchBarOpen === "hidden" &&
						nav_layout
							? "icon white"
							: "icon"
					}
					onClick={handleSearchButtonClick}
				>
					<Search />
				</div>
				<input
					type="text"
					ref={inputRef}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSearch();
						}
					}}
				/>

				<motion.div
					className="icon"
					animate={searchBarOpen}
					variants={closeVariant}
					onClick={handleClose}
				>
					<Close />
				</motion.div>
				{searchBarOpen === "visible" ? (
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
							if (index > 5) return;
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
				) : null}
			</motion.div>
		</>
	);
};

export default NavSearch;
