import React, { useState } from "react";
import {
	PageAnimation,
	CartItems,
	CustomerInfo,
	ProgressBar,
	Success,
	Waiting,
	Confirmation,
} from "../components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cart_context";

const views = [
	CartItems,
	CustomerInfo,
	Confirmation,
	Waiting,
	Success,
];

const WinkelwagenLeeg = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/producten");
	};
	return (
		<main className="center error">
			<div className="wrapper">
				<div className="container">
					<h2>Uw winkelwagen is nog leeg</h2>
					<button
						className="btn btn-primary"
						onClick={handleClick}
					>
						Producten
					</button>
				</div>
			</div>
		</main>
	);
};

const CartPage = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const CurrentView = views[currentStep];
	const { cart } = useCartContext();
	const handleClick = (i) => {
		if (i > currentStep) return;
		if (currentStep === 4) return;
		setCurrentStep(i);
	};
	window.scrollTo(0, 0);
	if (cart.length === 0) {
		return (
			<PageAnimation>
				<WinkelwagenLeeg />
			</PageAnimation>
		);
	}

	return (
		<PageAnimation>
			<Wrapper>
				<ProgressBar
					currentStep={currentStep}
					handleClick={handleClick}
				/>
				<CurrentView setCurrentStep={setCurrentStep} />
			</Wrapper>
		</PageAnimation>
	);
};

const Wrapper = styled.section`
	padding: 32px 0 80px 0;
	min-height: calc(100svh - 80px);
	.progress {
		padding-bottom: 32px;
		.container {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			.relative {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 6px;
				.step {
					aspect-ratio: 1;
					height: 36px;
					background-color: transparent;
					border: 2px solid var(--clr-light-grey);
					color: var(--clr-light-grey);
					border-radius: 999px;
					font-size: var(--fs-300);
					position: relative;

					svg {
						padding: 6px;
						path {
							stroke: var(--clr-white);
							stroke-width: 3;
						}
					}
				}
				.inactive {
					font-weight: 400;
				}
				.active {
					font-weight: 600;
				}

				.glow {
					position: absolute;
					aspect-ratio: 1;
					height: 36px;
					background-color: var(--clr-dark-beige);
					opacity: 0.3;
					border-radius: 999px;
				}
			}
		}
	}
	.cart {
		display: flex;
		flex-direction: column;

		.cart-row {
			width: 100%;
			border-bottom: 1px solid var(--clr-light-grey);
			p {
				margin: 0;
				display: flex;
				align-items: center;
			}
			.first-row {
				display: grid;
				grid-template-columns: 40px 1fr 96px 32px;
				gap: 16px;
				padding: 12px 0;
				.counter {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					div,
					span {
						aspect-ratio: 1;
						width: 32px;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
				.trash {
					height: 32px;
					padding-right: 10px;
					svg {
						padding: 5px;
					}
				}
				.show {
					transform: rotate(270deg);
				}
			}
			.second-row {
				display: grid;
				grid-template-columns: 40px 1fr 96px 32px;
				gap: 16px;
				overflow: hidden;
				p {
					margin: 12px 0;
				}
				.gewicht {
					grid-column: 2 / 3;
					display: flex;
					align-items: start;
				}
				.opties {
					grid-column: 3 / 5;
					display: flex;
					flex-direction: column;
					align-items: start;
				}
			}
			.desktop {
				display: none;
			}
		}
		.totaal {
			h4 {
				text-align: end;
			}
		}

		.buttons {
			display: flex;
			justify-content: space-between;
			.btn {
				width: 150px;
			}
		}
	}
	.info {
		.info-container {
			grid-column: span 12;
			display: flex;
			flex-direction: column;
			gap: 16px;
			form {
				display: flex;
				flex-direction: column;
				gap: 16px;
				.row {
					position: relative;
					display: flex;
					flex-direction: column;
					h4 {
						padding-bottom: 4px;
					}
					.error-message {
						color: var(--clr-red);
						padding-bottom: 4px;
					}
				}
			}

			.buttons {
				grid-column: span 12;
				display: flex;
				justify-content: space-between;
				margin-top: 16px;
				.btn {
					width: 150px;
				}
			}
		}
	}
	.confirm {
		display: flex;
		flex-direction: column;
		gap: 16px;
		.customer-info {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
		.row {
			display: flex;
			flex-direction: column;
			gap: 4px;
			.edit-row {
				display: flex;
				justify-content: space-between;
				gap: 4px;
				position: relative;
				.icon {
					position: absolute;
					top: -6px;
					right: 0;
					svg {
						padding: 8px;
					}
				}
			}
			p {
				margin: 0;
			}
			span {
				color: blue;
				text-decoration: underline;
			}
		}
		.buttons {
			grid-column: span 12;
			display: flex;
			justify-content: space-between;
			margin-top: 16px;
			.btn {
				width: 150px;
			}
		}
		.title-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			margin-bottom: -16px;
			.icon {
				/* position: absolute;
				top: -6px;
				right: 0; */
				svg {
					padding: 8px;
				}
			}
		}
		.desktop {
			display: none;
		}
	}
	.success {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 32px;

		h2 {
			text-align: center;
			text-transform: none;
			margin: 32px 0;
			max-width: 500px;
		}
		p {
			text-align: center;
			margin-bottom: 32px;
			max-width: 500px;
		}
	}
	@media screen and (min-width: 700px) {
		.cart {
			.cart-row {
				.first-row {
					grid-template-columns: 40px 1fr 1fr 96px 96px 32px;
					padding: 12px 32px;
					.mobile {
						display: none;
					}
					.desktop {
						display: flex;
						justify-content: center;
					}
				}
				.second-row {
					grid-template-columns: 40px 1fr 2fr 32px;
					padding: 0 32px;
					.mobile {
						display: none;
					}
					.desktop {
						display: flex;
						justify-content: center;
					}
					.opties {
						grid-column: 2 / 3;
					}
				}
			}
		}
		.info {
			.info-container {
				width: 100%;
				form {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr 1fr;

					.row {
						grid-column: span 2;
					}

					.opmerking,
					.buttons {
						grid-column: span 4;
					}
					.date {
						grid-column: span 1;
					}
				}
			}
		}
		.confirm {
			display: grid;
			grid-template-columns: 1fr 1fr;
			h2,
			.buttons {
				grid-column: span 2;
			}
			.customer-info,
			.cart-info {
				border-top: var(--border);
				/* border-radius: var(--radius);
				box-shadow: var(--light-shadow); */
				padding: 16px 0;
			}
			.desktop {
				display: flex;
			}
			.mobile {
				display: none;
			}
		}
		.success {
			button {
				width: 350px;
			}
		}
	}
`;

export default CartPage;
