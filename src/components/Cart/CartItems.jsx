import React from "react";
import { useNavigate } from "react-router-dom";
import CartRow from "./CartRow";
import { useCartContext } from "../../context/cart_context";
import { formatPrice } from "../../utils/formatting";

const CartItems = ({ setCurrentStep }) => {
	const navigate = useNavigate();
	const { cart, total_amount } = useCartContext();

	return (
		<div className="wrapper cart">
			<div className="container">
				<h2>Uw producten</h2>
			</div>
			<div className="cart-rows">
				{cart.map((item, index) => {
					return (
						<CartRow
							key={item.id}
							item={item}
							index={index}
						/>
					);
				})}
			</div>
			<div className="container totaal">
				<h4>Totaal: {formatPrice(total_amount)}</h4>
			</div>
			<div className="container buttons">
				<button
					className="btn btn-secondary"
					onClick={() => navigate(-1)}
				>
					Terug
				</button>
				<button
					className="btn btn-primary"
					onClick={() => setCurrentStep(1)}
				>
					Doorgaan
				</button>
			</div>
			<div className="container asterisk">
				<p>
					* Prijs kan afwijken van uiteindelijk bedrag
					vanwege variatie in gewicht bij producten.
				</p>
			</div>
		</div>
	);
};

export default CartItems;
