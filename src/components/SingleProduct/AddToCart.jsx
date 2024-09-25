import React, { useState } from "react";

const AddToCart = ({ modal, setModal, size }) => {
	const [disable, setDisable] = useState(false);
	const handleClick = () => {
		if (!modal) {
			setDisable(true);
			setTimeout(() => {
				setDisable(false);
			}, 300);
			setModal(true);
			document.body.style.height = "100%";
			document.body.style.overflow = "hidden";
		}
	};
	return (
		<div className={`add-to-cart center ${size}`}>
			<div className="wrapper">
				<div className="container">
					{modal ? (
						<button
							className="btn btn-primary"
							disabled={disable}
							form="optionForm"
							type="submit"
						>
							Toevoegen
						</button>
					) : (
						<button
							className="btn btn-primary"
							onClick={handleClick}
							disabled={disable}
						>
							Toevoegen
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddToCart;
