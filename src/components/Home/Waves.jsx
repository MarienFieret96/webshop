import React from "react";
import Wave from "../../assets/images/wave.png";

const Waves = ({ width }) => {
	return (
		<section
			className="waves"
			style={{
				marginTop:
					width < 700
						? `calc((${width}px - 32px) * 2 + 32px)`
						: 0,
			}}
		>
			<div
				className="wave wave1"
				style={{ backgroundImage: `url(${Wave})` }}
			></div>
			<div
				className="wave wave2"
				style={{ backgroundImage: `url(${Wave})` }}
			></div>
			<div
				className="wave wave3"
				style={{ backgroundImage: `url(${Wave})` }}
			></div>
			<div
				className="wave wave4"
				style={{ backgroundImage: `url(${Wave})` }}
			></div>
		</section>
	);
};

export default Waves;
