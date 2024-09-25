import React, {
	useState,
	useEffect,
	useDeferredValue,
	useRef,
} from "react";

import { motion } from "framer-motion";
import CategoryItem from "./CategoryItem";
import { Search, MenuTwo } from "../../assets/icons";
import { categorieen } from "../../utils/data";
import { useSearchContext } from "../../context/search_context";

const FilterBar = ({
	activeCategory,
	handleCategoryChange,
	setFindCategory,
	setSearchStatus,
}) => {
	const { updateSearchQuery } = useSearchContext();
	const [query, setQuery] = useState("");
	const deferredQuery = useDeferredValue(query);

	useEffect(() => {
		updateSearchQuery(deferredQuery);
	}, [deferredQuery]);

	const ref = useRef(0);
	// const [offset, setOffset] = useState(56);
	// const [offsetRight, setOffsetRight] = useState(0);
	// const [deviceWidth, setDeviceWidth] = useState(
	// 	document.body.clientWidth,
	// );

	// useEffect(() => {
	// 	setOffsetRight(ref.current.scrollWidth);
	// }, [offset]);
	return (
		<div className="filter">
			<div
				className="center zoeken"
				onClick={() => setSearchStatus(true)}
			>
				<Search />
			</div>
			<motion.div
				className="categorie-wrapper"
				ref={ref}
				// drag="x"
				// dragConstraints={{
				// 	left:
				// 		-offsetRight + deviceWidth + offset - 3 * 56,
				// 	right: offset - 56,
				// }}
				// dragElastic={0.05}
			>
				{/* <div className="searchbar-fullscreen">
					<div className="icon">
						<Search />
					</div>
					<input
						type="text"
						placeholder="Zoeken"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div> */}
				<h3>Categorieën</h3>
				<ul className="categorieen">
					{categorieen.map((item, index) => {
						return (
							<CategoryItem
								item={item}
								index={index}
								activeCategory={activeCategory}
								key={index}
								handleCategoryChange={handleCategoryChange}
								// setOffset={setOffset}
								// offset={offset}
							/>
						);
					})}
				</ul>
			</motion.div>
			<div
				className="center menu"
				onClick={() => console.log(ref)}
			>
				<MenuTwo />
			</div>
		</div>
	);
};

export default FilterBar;
