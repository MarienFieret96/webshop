import React from "react";
import { motion } from "framer-motion";
import Picture1 from "../../assets/images/picture-1.jpg";
import Picture2 from "../../assets/images/picture-2.jpg";
import Picture3 from "../../assets/images/picture-3.jpg";
import Picture4 from "../../assets/images/picture-4.jpg";

const Hero = ({ opacity }) => {
	return (
		<section className="hero">
			<div className="images">
				<motion.div
					className="overlay"
					style={{ opacity }}
				></motion.div>
				<img className="first" src={Picture1} alt="" />
				<img className="second" src={Picture2} alt="" />
				<img className="third" src={Picture3} alt="" />
				<img className="fourth" src={Picture4} alt="" />
			</div>
		</section>
	);
};

export default Hero;
