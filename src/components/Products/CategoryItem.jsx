import React, { useRef } from "react";

import { motion, useMotionTemplate } from "framer-motion";

const CategoryItem = ({
	item,
	index,
	activeCategory,
	handleCategoryChange,
	offset,
	setOffset,
}) => {
	// the offset needs to be the offset of the active
	const listRef = useRef(null);

	const handleClick = () => {
		handleCategoryChange(index, "true");
	};
	const transform = useMotionTemplate`translate3d(calc(56px - ${offset}px), 0px, 0px)`;

	// useLayoutEffect(() => {
	// 	if (activeCategory === index) {
	// 		setOffset(listRef?.current.offsetLeft);
	// 	}
	// }, [activeCategory]);

	return (
		<motion.li
			className={
				activeCategory === index
					? "active categorie"
					: "categorie"
			}
			// style={{
			// 	transform: transform,
			// }}
			onClick={handleClick}
			ref={listRef}
		>
			{item}
		</motion.li>
	);
};

export default CategoryItem;
