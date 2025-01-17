import React from "react";

const Spinner = () => {
	return (
		<svg className="spinner" viewBox="0 0 50 50">
			<circle
				className="path"
				cx="25"
				cy="25"
				r="20"
				fill="none"
				stroke="#22223b"
				strokeWidth="5"
			></circle>
		</svg>
	);
};

export default Spinner;
