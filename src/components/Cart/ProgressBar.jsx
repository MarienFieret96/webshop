import React from "react";
import { motion } from "framer-motion";
import { Check } from "../../assets/icons";

const Step = ({
	step,
	currentStep,
	index,
	handleClick,
}) => {
	let status =
		currentStep === index
			? "active"
			: currentStep < index
			? "inactive"
			: "complete";
	return (
		<motion.div
			animate={status}
			className="relative"
			onClick={() => handleClick(index)}
		>
			<div>
				<motion.div
					className="glow"
					variants={{
						active: {
							scale: 1,
							transition: {
								delay: 0,
								duration: 0.2,
							},
						},
						complete: {
							scale: 1.25,
						},
					}}
					transition={{
						delay: 0.2,
						duration: 0.6,
						type: "tween",
						ease: "circOut",
					}}
				></motion.div>
				<motion.div
					initial={false}
					variants={{
						inactive: {
							backgroundColor: "var(--clr-white)",
							border: "2px solid var(--clr-light-grey)",
							color: "var(--clr-light-grey)",
						},
						active: {
							backgroundColor: "var(--clr-white)",
							border: "2px solid var(--clr-dark-beige)",
							color: "var(--clr-dark-beige)",
						},
						complete: {
							backgroundColor: "var(--clr-dark-beige)",
							border: "2px solid var(--clr-dark-beige)",
						},
					}}
					transition={{ duration: 0.2 }}
					className={`step center ${status}`}
				>
					{status === "complete" ? <Check /> : index + 1}
				</motion.div>
			</div>
			<motion.h6
				variants={{
					inactive: { color: "var(--clr-light-grey)" },
					active: { color: "var(--clr-dark-blue)" },
					complete: { color: "var(--clr-dark-blue)" },
				}}
			>
				{step}
			</motion.h6>
		</motion.div>
	);
};

const ProgressBar = ({ currentStep, handleClick }) => {
	const steps = [
		"Winkelwagen",
		"Gegevens",
		"Controleren",
		"Klaar",
	];

	return (
		<div className="wrapper progress">
			<div className="container">
				{steps.map((step, index) => {
					return (
						<Step
							key={step}
							index={index}
							step={step}
							currentStep={currentStep}
							handleClick={handleClick}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ProgressBar;
