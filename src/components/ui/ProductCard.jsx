import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatting";
import { Plus } from "../../assets/icons";
import { useProductContext } from "../../context/products_context";
import { Prijs } from "../../components";
import { categorieen } from "../../utils/data";

const ProductCard = ({ item, index }) => {
	const { naam, prijs, smallImage, slug } = item;
	const { setSingleProduct } = useProductContext();
	const navigate = useNavigate();

	const handleClick = () => {
		setSingleProduct(item);
		navigate(`/producten/${slug}`);
	};

	return (
		<div className="container" onClick={handleClick}>
			<div className="img-container center">
				<img src={smallImage} alt="" />
			</div>
			<div className="text-container">
				<h4 className="name">{naam}</h4>
				<Prijs prijs={prijs} />
			</div>
			<div className="icon">
				<Plus />
			</div>
		</div>
	);
};

export default ProductCard;
