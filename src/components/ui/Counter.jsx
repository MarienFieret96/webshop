import React from "react";
import { Minus, Plus } from "../../assets/icons";

const Counter = ({ count, handleClick, id }) => {
	return (
		<div className="counter">
			<div
				className="center"
				onClick={() => handleClick("min", id)}
			>
				<Minus />
			</div>
			<span>{count}</span>
			<div
				className="center"
				onClick={() => handleClick("plus", id)}
			>
				<Plus />
			</div>
		</div>
	);
};

export default Counter;
