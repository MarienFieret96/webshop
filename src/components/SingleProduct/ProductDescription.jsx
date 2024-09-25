import React from "react";
import {
	Prijs,
	InformationContainer,
	AddToCart,
} from "../../components";
import { useProductContext } from "../../context/products_context";

const BereidingComponent = ({ item }) => {
	const bereiding = Object.entries(item)[0];

	return (
		<>
			<h4>{bereiding[0]}</h4>
			<p>{bereiding[1]}</p>
		</>
	);
};

const ProductDescription = ({ modal, setModal, size }) => {
	const { single_product } = useProductContext();
	const {
		beschrijving,
		herkomst,
		vangstmethode,
		allergenen,
		naam,
		prijs,
		bewaarAdvies,
		bereidingsWijze,
	} = single_product;
	const handleClick = () => {
		setModal(true);
		document.body.style.height = "100%";
		document.body.style.overflow = "hidden";
	};
	return (
		<>
			<div className="container description">
				<h1>{naam}</h1>
				<Prijs prijs={prijs} />

				{beschrijving.map((item, index) => {
					return <p key={index}>{item}</p>;
				})}
				<button
					className="btn btn-primary"
					onClick={handleClick}
				>
					Toevoegen
				</button>
			</div>
			{bereidingsWijze.length !== 0 ? (
				<InformationContainer title={"bereidingswijze"}>
					{bereidingsWijze.map((item, index) => {
						return (
							<BereidingComponent key={index} item={item} />
						);
					})}
				</InformationContainer>
			) : null}

			<InformationContainer title={"bewaaradvies"}>
				<p style={{ paddingTop: "4px" }}>{bewaarAdvies}</p>
			</InformationContainer>
			{herkomst ? (
				<InformationContainer title={"extra informatie"}>
					<h4>Herkomst</h4>
					<p>{herkomst}</p>
					<h4>Vangstmethode</h4>
					<p>{vangstmethode}</p>
				</InformationContainer>
			) : null}

			<InformationContainer title={"Allergenen"}>
				<p style={{ paddingTop: "12px" }}>
					{allergenen.map((item, index) => {
						return <span key={index}>{item}, </span>;
					})}
				</p>
			</InformationContainer>
		</>
	);
};

export default ProductDescription;
