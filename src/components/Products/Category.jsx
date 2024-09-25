import React, { useEffect, useRef } from "react";
// import { products } from "../../utils/data";
import { ProductCard } from "../../components";
import { useInView } from "framer-motion";
import Zeebaars from "../../assets/images/zeebaars.jpg";

const Category = ({
	cat,
	index,
	handleCategoryChange,
	products,
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		amount: 1,
		margin: "-200px 0px",
	});
	useEffect(() => {
		if (isInView) {
			handleCategoryChange(index, "false");
		}
	}, [isInView]);
	return (
		<div className="cat" id={`category-${index}`}>
			<div className="category-banner">
				<h2 ref={ref}>{cat}</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Aut, amet.
				</p>
			</div>
			{products?.map((item, j) => {
				return (
					<ProductCard item={item} key={j} index={index} />
				);
			})}
		</div>
	);
};

export default Category;
