import React from "react";
import { Edit } from "../../assets/icons";

const UserInformation = ({ setTab }) => {
	return (
		<div className="user-information">
			<div className="title-row">
				<h3>Uw gegevens</h3>
				<div className="icon" onClick={() => setTab(3)}>
					<Edit />
				</div>
			</div>
			<div className="row">
				<h4>Naam:</h4>
				<p>Marien Fieret</p>
			</div>
			<div className="row">
				<h4>Email:</h4>
				<p>marienfieret@hotmail.com</p>
			</div>
			<div className="row">
				<h4>Telefoon:</h4>
				<p>0618844511</p>
			</div>
		</div>
	);
};

export default UserInformation;
