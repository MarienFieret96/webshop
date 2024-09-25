import React from "react";
import { formatPrice } from "../../utils/formatting";

const Prijs = ({ prijs }) => {
	const stuksPrijs =
		prijs.perStuk && !prijs.gemiddeldGewicht;
	return (
		<h4>
			{formatPrice(prijs.prijs)}{" "}
			<span>
				{!stuksPrijs ? "per 100 gram" : "per stuk"}
			</span>
		</h4>
	);
};

export default Prijs;
