import React from "react";
import { useProductContext } from "../../context/products_context";
import { useNavigate } from "react-router-dom";
import { categorieen } from "../../utils/data";

const RelatedProductCard = ({ item }) => {
	const navigate = useNavigate();
	const { products, fetchSingleProduct } =
		useProductContext();
	const findCategory = (str, arr) => {
		return arr.indexOf(str);
	};
	const categoryIndex = findCategory(
		item.categorie,
		categorieen,
	);
	const findProductByName = (array, property, value) => {
		return array.find((item) => item[property] === value);
	};
	const findProduct = () => {
		console.log("hi");
		const product = findProductByName(
			products[categoryIndex],
			"naam",
			item.naam,
		);
		return product;
	};
	const relatedProduct = findProduct();
	const handleClick = () => {
		fetchSingleProduct(categoryIndex, relatedProduct.slug);
		navigate(`/producten/${relatedProduct.slug}`);
	};
	if (!relatedProduct) return;
	return (
		<div
			className="product-card"
			onClick={() => handleClick()}
		>
			<img
				src={relatedProduct.smallImage}
				alt={relatedProduct.naam}
			/>
			<h4>{relatedProduct.naam}</h4>
		</div>
	);
};

export default RelatedProductCard;
