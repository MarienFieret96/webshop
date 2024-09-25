import React from "react";
import { motion } from "framer-motion";

const Quote = () => {
	return (
		<section className="quote">
			<div className="quote-container">
				<motion.h4
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ margin: "100% 0px -300px 0px" }}
				>
					Sinds 1966
				</motion.h4>
				<motion.h1
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ margin: "100% 0px -300px 0px" }}
				>
					De Visspecialist van Amersfoort
				</motion.h1>
			</div>
		</section>
	);
};

export default Quote;
