import React, { useEffect } from "react";

const Waiting = ({ setCurrentStep }) => {
	useEffect(() => {
		setTimeout(() => {
			setCurrentStep(4);
		}, 3000);
	}, []);
	return (
		<div className="wrapper">
			<div className="container success">
				<div className="loader" />
				<h2>Uw bestelling wordt geplaatst...</h2>

				<p>Een moment geduld alstublieft!</p>
			</div>
		</div>
	);
};

export default Waiting;
