import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user_context";

const Success = ({ setCurrentStep }) => {
	const navigate = useNavigate();
	const { user } = useUserContext();

	return (
		<div className="wrapper">
			<div className="container success">
				<h2>Bedankt voor uw bestelling!</h2>
				<p>
					U ontvangt een bevestiging van uw bestelling op{" "}
					{user.email} binnen enkele minuten.
				</p>

				<button
					className="btn btn-primary"
					onClick={() => navigate("/")}
				>
					Naar Homepage
				</button>
			</div>
		</div>
	);
};

export default Success;
