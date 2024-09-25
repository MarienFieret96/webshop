import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartContext } from "../../context/cart_context";
import { Back, Trash } from "../../assets/icons";
import { Counter } from "../../components";
import { formatPrice } from "../../utils/formatting";

const CartRow = ({ item, index }) => {
	const [open, setOpen] = useState(false);
	const {
		aantal,
		delen,
		gewicht,
		id,
		naam,
		opties,
		productOpmerking,
		totaalPrijs,
	} = item;
	const optiesLength = opties.length;
	const { removeItem, toggleAmount } = useCartContext();

	return (
		<div
			className="cart-row"
			style={{
				borderTop:
					index === 0 && "1px solid var(--clr-light-grey)",
			}}
		>
			<div className="first-row">
				<motion.div
					className="show center"
					initial={false}
					animate={{
						transform: open
							? "rotate(-270deg)"
							: "rotate(-90deg)",
					}}
					onClick={() => setOpen(!open)}
				>
					<Back />
				</motion.div>
				<p onClick={() => setOpen(!open)}>{naam}</p>
				{gewicht.length > 0 ? (
					<p
						className="gewicht desktop"
						onClick={() => setOpen(!open)}
					>
						{delen} &times; {gewicht / delen} gram
					</p>
				) : (
					<p
						className="gewicht desktop"
						onClick={() => setOpen(!open)}
					>
						{gewicht}
					</p>
				)}
				<Counter
					count={aantal}
					handleClick={toggleAmount}
					id={id}
				/>
				<p className="prijs desktop">
					{formatPrice(totaalPrijs * aantal)} *
				</p>
				<div
					className="trash center"
					onClick={() => removeItem(id)}
				>
					<Trash />
				</div>
			</div>

			<motion.div
				className="second-row"
				initial={false}
				animate={{
					height: open ? "auto" : "0",
				}}
			>
				{gewicht.length > 0 ? (
					<p className="gewicht mobile">
						{delen} &times; {gewicht / delen} gram
					</p>
				) : (
					<p className="gewicht mobile">{gewicht}</p>
				)}

				<p className="opties">
					{opties.map((optie, i) => {
						return (
							<span key={optie}>
								{optie}
								{i + 1 === optiesLength ? "" : "; "}
							</span>
						);
					})}
				</p>
				<p className="opmerking desktop">
					{productOpmerking}
				</p>
			</motion.div>
		</div>
	);
};

export default CartRow;
