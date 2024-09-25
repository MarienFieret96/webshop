import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(-1);
	};
	return (
		<main className="center error">
			<div className="wrapper">
				<div className="container">
					<h2>Er is iets fout gegaan</h2>
					<button
						className="btn btn-primary"
						onClick={handleClick}
					>
						Terug
					</button>
				</div>
			</div>
		</main>
	);
};

export default Error;
