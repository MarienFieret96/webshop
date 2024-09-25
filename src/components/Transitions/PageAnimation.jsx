import React from "react";
import { motion } from "framer-motion";

const PageAnimation = ({ children }) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
				transition: { duration: 0.3 },
			}}
			exit={{
				opacity: 0,
				transition: { duration: 0 },
			}}
		>
			{children}
		</motion.div>
	);
};

export default PageAnimation;