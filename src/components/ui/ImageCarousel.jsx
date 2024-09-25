import React from "react";

const ImageCarousel = ({ afbeeldingen }) => {
	return (
		<div className="container image">
			<img src={afbeeldingen[0]} alt="" />
		</div>
	);
};

export default ImageCarousel;
