import React from "react";
import { useUserContext } from "../../context/user_context";
import { Edit } from "../../assets/icons";
import { useCartContext } from "../../context/cart_context";

const Confirmation = ({ setCurrentStep }) => {
	const { user, opmerking, datum } = useUserContext();
	const { cart, createOrder } = useCartContext();

	const handleSubmit = () => {
		console.log("submit");
		const newOrder = {
			naam: user.naam,
			telefoon: user.telefoon,
			items: cart,
			betaalStatus: "nee",
			opmerking,
			datum,
			aangenomenDoor: "online",
		};
		createOrder(newOrder);
		setCurrentStep(3);
	};

	const dagen = [
		"Zondag",
		"Maandag",
		"Dinsdag",
		"Woensdag",
		"Donderdag",
		"Vrijdag",
		"Zaterdag",
	];
	const maanden = [
		"januari",
		"februari",
		"maart",
		"april",
		"mei",
		"juni",
		"juli",
		"augustus",
		"september",
		"oktober",
		"november",
		"december",
	];
	const dag = dagen[datum.getDay()];
	const maand = maanden[datum.getMonth()];
	const date = datum.getDate();
	const uur = datum.getHours();
	const minuut = datum.getMinutes();

	return (
		<div className="wrapper">
			<div className="container confirm">
				<h2>Controleren</h2>
				<div className="title-row">
					<h3>Gegevens</h3>
					<div
						className="icon"
						onClick={() => setCurrentStep(1)}
					>
						<Edit />
					</div>
				</div>
				<div className="title-row desktop">
					<h3>Winkelwagen</h3>
					<div
						className="icon"
						onClick={() => setCurrentStep(0)}
					>
						<Edit />
					</div>
				</div>
				<div className="customer-info">
					<div className="row">
						<div className="edit-row">
							<h4>Contact</h4>
						</div>
						<p>{user.naam}</p>
						<p>{user.email}</p>
						<p>{user.telefoon}</p>
					</div>
					<div className="row">
						<div className="edit-row">
							<h4>Datum</h4>
						</div>
						{minuut === 0 ? (
							<p>
								{`${dag} ${date} ${maand} om ${uur}:${minuut}0`}
							</p>
						) : (
							<p>
								{`${dag} ${date} ${maand} om ${uur}:${minuut}`}
							</p>
						)}
					</div>
					<div className="row">
						<div className="edit-row">
							<h4>Opmerkingen</h4>
						</div>
						<p>
							{opmerking.length === 0 ? "-" : opmerking}
						</p>
					</div>
				</div>
				<div className="title-row mobile">
					<h3>Winkelwagen</h3>
					<div
						className="icon"
						onClick={() => setCurrentStep(0)}
					>
						<Edit />
					</div>
				</div>
				<div className="cart-info">
					<div className="row">
						<div className="edit-row">
							<h4>Artikelen</h4>
						</div>
						{cart.map((item, index) => {
							if (item.gewicht.length === 0) {
								return (
									<p
										key={index}
									>{`${item.aantal} x ${item.naam}`}</p>
								);
							}
							return (
								<p key={index}>{`${item.aantal} x ${
									item.delen
								} x ${
									parseInt(item.gewicht) /
									parseInt(item.delen)
								} gram ${item.naam}`}</p>
							);
						})}
					</div>
				</div>
				<div className="container buttons">
					<button
						className="btn btn-secondary"
						onClick={() => setCurrentStep(1)}
					>
						Terug
					</button>
					<button
						className="btn btn-primary"
						onClick={handleSubmit}
					>
						Bestellen
					</button>
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
