import React from "react";
import { formatPrice } from "../../utils/formatting";

const Bestellingen = () => {
	const tempDate = new Date();
	const year = tempDate.getFullYear();
	const month = tempDate.getMonth();
	const day = tempDate.getDate();
	return (
		<div className="bestellingen">
			<h3>Uw bestellingen</h3>
			<h4>Lopende bestellingen</h4>
			<div className="bestelling">
				<p>{`${day}/${month + 1}/${year}`}</p>
				<p>{formatPrice(999)}</p>
			</div>

			<h4>Afgesloten bestellingen</h4>
			<div className="bestelling">
				<p>{`${day}/${month + 1}/${year}`}</p>
				<p>{formatPrice(999)}</p>
			</div>
			<div className="bestelling">
				<p>{`${day}/${month + 1}/${year}`}</p>
				<p>{formatPrice(999)}</p>
			</div>
			<div className="bestelling">
				<p>{`${day}/${month + 1}/${year}`}</p>
				<p>{formatPrice(999)}</p>
			</div>
		</div>
	);
};

export default Bestellingen;
