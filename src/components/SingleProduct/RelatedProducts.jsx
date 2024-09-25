import React from "react";
import RelatedProductCard from "./RelatedProductCard";

const RelatedProducts = ({ producten, titel }) => {
	return (
		<div className="container related">
			<h3>{titel}</h3>
			<div className="products">
				{producten.map((item, index) => {
					return (
						<RelatedProductCard key={index} item={item} />
					);
				})}
			</div>
		</div>
	);
};

export default RelatedProducts;
