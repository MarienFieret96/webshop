import React, { useState } from "react";
import { motion } from "framer-motion";
import { Back } from "../../assets/icons";

const InformationContainer = ({ children, title }) => {
	const [open, setOpen] = useState(false);
	return (
		<div
			className="information-wrapper"
			onClick={() => setOpen(!open)}
			style={{
				borderBottom:
					title === "Allergenen"
						? "1px solid var(--clr-light-grey)"
						: "none",
				paddingBottom:
					title === "Allergenen" ? "16px" : "0",
			}}
		>
			<div className="title">
				<h3>{title}</h3>
				<motion.div
					className="down-button"
					initial={false}
					animate={{
						transform: open
							? "rotate(90deg)"
							: "rotate(270deg)",
					}}
				>
					<Back />
				</motion.div>
			</div>

			<motion.div
				className="information-container"
				initial={false}
				animate={{ height: open ? "auto" : "0" }}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default InformationContainer;
