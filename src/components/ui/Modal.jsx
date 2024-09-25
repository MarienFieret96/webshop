import React, {
	useLayoutEffect,
	useState,
	useRef,
} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { motion } from "framer-motion";
import UseResize from "../../hooks/ResizeHook";
import { Close } from "../../assets/icons";
import { useCartContext } from "../../context/cart_context";
import { Counter, Prijs } from "../../components";

const dropInDesktop = {
	hidden: {
		transform: "translateY(-10%)",
	},
	visible: {
		transform: "translateY(0)",
	},
	exit: {
		transform: "translateY(10%) scale(0)",
		opacity: 0,
	},
};
const dropInMobile = {
	hidden: {
		transform: "translateY(100%)",
	},
	visible: {
		transform: "translateY(0)",
	},
	exit: {
		transform: "translateY(100%)",
	},
};

const BigModal = ({
	prijs,
	opties,
	naam,
	setModal,
	productId,
}) => {
	const [count, setCount] = useState(1);
	const [formHeight, setFormHeight] = useState(0);
	const [modalHeight, setModalHeight] = useState(0);
	const { register, handleSubmit, watch } = useForm({
		defaultValues: {
			gewicht: "",
			delen: "1",
		},
	});
	const watchWeight = watch(["gewicht", "delen"]);
	const priceInfoRef = useRef(null);
	const modalInfoRef = useRef(null);

	const { addToCart } = useCartContext();

	const handleClick = (str) => {
		if (str === "plus") {
			setCount(count + 1);
		}
		if (str === "min") {
			if (count === 1) {
				return;
			}
			setCount(count - 1);
		}
	};

	const handleClose = () => {
		setModal(false);
		document.body.style.height = "auto";
		document.body.style.overflow = "auto";
	};

	const configureOptions = (data) => {
		let tempArray = [];
		let tempId = "";
		for (const [key, value] of Object.entries(data)) {
			if (
				key !== "gewicht" &&
				key !== "delen" &&
				key !== "productOpmerking"
			) {
				if (
					typeof value === "string" ||
					value instanceof String
				) {
					tempArray.push(value);
					tempId += value;
				} else {
					if (value) {
						tempArray.push(key);
						tempId += "1";
					} else {
						tempId += "0";
					}
				}
			}
		}
		return { tempId, tempArray };
	};

	const calculatePrice = (price, gewicht) => {
		let tempAmount = 0;
		if (price.perStuk) {
			if (price.gemiddeldGewicht) {
				tempAmount =
					(price.gemiddeldGewicht / 1000) * price.prijs;
				return tempAmount;
			} else {
				tempAmount = price.prijs;
				return tempAmount;
			}
		} else {
			tempAmount = (gewicht / 1000) * price.prijs;
			return tempAmount;
		}
	};

	const onSubmit = (data) => {
		const options = configureOptions(data);
		const { tempId, tempArray } = options;
		const { gewicht, delen, productOpmerking } = data;
		const totaalPrijs = calculatePrice(prijs, gewicht);
		const id = naam + tempId + gewicht + delen;
		const productObject = {
			product: productId,
			id,
			naam,
			totaalPrijs,
			gewicht,
			delen,
			aantal: count,
			opties: tempArray,
			productOpmerking,
			prijs,
		};
		addToCart(productObject);
		handleClose();
	};

	useLayoutEffect(() => {
		setFormHeight(priceInfoRef.current.clientHeight);
		setModalHeight(modalInfoRef.current.clientHeight);
	}, []);

	return (
		<Wrapper>
			<motion.div
				className="backdrop"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{
					duration: 0.3,
				}}
				onClick={handleClose}
			>
				<motion.div
					className="modal-wrapper"
					variants={dropInDesktop}
					transition={{
						duration: 0.3,
					}}
					initial="hidden"
					animate="visible"
					exit="exit"
					onClick={(e) => e.stopPropagation()}
					ref={modalInfoRef}
				>
					<div className="wrapper">
						<div
							className="close"
							onClick={() => handleClose()}
						>
							<Close />
						</div>
						<div className="container">
							<div
								className="row price-info"
								ref={priceInfoRef}
							>
								<h2>{naam}</h2>

								{prijs.gemiddeldGewicht !== 0 && (
									<h4 className="italic">
										Ongeveer {prijs.gemiddeldGewicht} gram
										per stuk
									</h4>
								)}
								<Prijs prijs={prijs} />
							</div>

							<form
								spellCheck="false"
								onSubmit={handleSubmit(onSubmit)}
								id="optionForm"
								style={{
									height: `calc(${modalHeight}px - (93px + ${formHeight}px))`,
								}}
							>
								<div className="row">
									<h4>Aantal</h4>
									<Counter
										count={count}
										handleClick={handleClick}
									/>
								</div>

								{!prijs.perStuk && (
									<>
										<div className="row">
											<h4>Totaal gewicht</h4>
											<input
												type="number"
												required
												placeholder="500 gram"
												{...register("gewicht", { min: 1 })}
											/>
										</div>
										<div className="row">
											<h4>
												Verdeeld over {watchWeight[1]} stuk
												{watchWeight[1] === "1"
													? ""
													: "s"}{" "}
											</h4>
											<input
												type="number"
												required
												{...register("delen", { min: 1 })}
											/>
										</div>
										<div className="row">
											<h4 className="italic">
												{watchWeight[1]} stuk
												{watchWeight[1] === "1"
													? ""
													: "s"}{" "}
												&times;{" "}
												{Number.isInteger(
													Math.floor(
														parseInt(watchWeight[0]) /
															parseInt(watchWeight[1]),
													),
												)
													? Math.floor(
															parseInt(watchWeight[0]) /
																parseInt(watchWeight[1]),
													  )
													: "500"}{" "}
												gram ={" "}
												{watchWeight[0].length > 0
													? watchWeight[0]
													: "500"}{" "}
												gram
											</h4>
										</div>
									</>
								)}
								{opties.select.length > 0 && (
									<>
										{opties.select.map((item, i) => {
											return (
												<div className="row" key={i}>
													<h4>{item.vraag}</h4>
													<select {...register(item.vraag)}>
														{item.antwoord.map(
															(option, j) => {
																return (
																	<option
																		key={j}
																		value={option}
																	>
																		{option}
																	</option>
																);
															},
														)}
													</select>
												</div>
											);
										})}
									</>
								)}
								{opties.check.length > 0 && (
									<div className="row">
										{opties.check.map((item, i) => {
											return (
												<React.Fragment key={i}>
													<label>
														<input
															type="checkbox"
															{...register(item)}
														/>
														{item}
													</label>
												</React.Fragment>
											);
										})}
									</div>
								)}
								<div className="row">
									<h4>Opmerkingen</h4>
									<textarea
										name=""
										id=""
										placeholder="Eventuele opmerkingen"
										rows="5"
										{...register("productOpmerking", {
											min: 1,
										})}
									></textarea>
								</div>
							</form>
							<div className="btn-banner">
								<button
									type="submit"
									className="btn btn-primary"
									form="optionForm"
								>
									Toevoegen
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</Wrapper>
	);
};

const SmallModal = ({
	prijs,
	opties,
	naam,
	setModal,
	productId,
}) => {
	const [count, setCount] = useState(1);
	const { register, handleSubmit, watch } = useForm({
		defaultValues: {
			gewicht: "",
			delen: "1",
		},
	});
	const watchWeight = watch(["gewicht", "delen"]);

	const { addToCart } = useCartContext();

	const handleClick = (str) => {
		if (str === "plus") {
			setCount(count + 1);
		}
		if (str === "min") {
			if (count === 1) {
				return;
			}
			setCount(count - 1);
		}
	};

	const handleClose = () => {
		setModal(false);
		document.body.style.height = "auto";
		document.body.style.overflow = "auto";
	};

	const configureOptions = (data) => {
		let tempArray = [];
		let tempId = "";
		for (const [key, value] of Object.entries(data)) {
			if (
				key !== "gewicht" &&
				key !== "delen" &&
				key !== "productOpmerking"
			) {
				if (
					typeof value === "string" ||
					value instanceof String
				) {
					tempArray.push(value);
					tempId += value;
				} else {
					if (value) {
						tempArray.push(key);
						tempId += "1";
					} else {
						tempId += "0";
					}
				}
			}
		}
		return { tempId, tempArray };
	};

	const calculatePrice = (price, gewicht) => {
		let tempAmount = 0;
		if (price.perStuk) {
			if (price.gemiddeldGewicht) {
				tempAmount =
					(price.gemiddeldGewicht / 1000) * price.prijs;
				return tempAmount;
			} else {
				tempAmount = price.prijs;
				return tempAmount;
			}
		} else {
			tempAmount = (gewicht / 1000) * price.prijs;
			return tempAmount;
		}
	};

	const onSubmit = (data) => {
		const options = configureOptions(data);
		const { tempId, tempArray } = options;
		const { gewicht, delen, productOpmerking } = data;
		const totaalPrijs = calculatePrice(prijs, gewicht);
		const id = naam + tempId + gewicht + delen;
		const productObject = {
			product: productId,
			id,
			naam,
			totaalPrijs,
			gewicht,
			delen,
			aantal: count,
			opties: tempArray,
			productOpmerking,
		};
		addToCart(productObject);
		handleClose();
	};

	return (
		<Wrapper>
			<motion.div
				className="modal-wrapper"
				variants={dropInMobile}
				transition={{
					duration: 0.3,
				}}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<div className="wrapper">
					<div
						className="close"
						onClick={() => handleClose()}
					>
						<Close />
					</div>
					<div className="container">
						<div className="row">
							<h2>{naam}</h2>

							{prijs.gemiddeldGewicht !== 0 && (
								<h4 className="italic">
									Ongeveer {prijs.gemiddeldGewicht} gram per
									stuk
								</h4>
							)}
							<Prijs prijs={prijs} />
						</div>

						<form
							spellCheck="false"
							onSubmit={handleSubmit(onSubmit)}
							id="optionForm"
						>
							<div className="row">
								<h4>Aantal</h4>
								<Counter
									count={count}
									handleClick={handleClick}
								/>
							</div>

							{!prijs.perStuk && (
								<>
									<div className="row">
										<h4>Totaal gewicht</h4>
										<input
											type="number"
											required
											placeholder="500 gram"
											{...register("gewicht", { min: 1 })}
										/>
									</div>
									<div className="row">
										<h4>
											Verdeeld over {watchWeight[1]} stuk
											{watchWeight[1] === "1"
												? ""
												: "s"}{" "}
										</h4>
										<input
											type="number"
											required
											{...register("delen", { min: 1 })}
										/>
									</div>
									<div className="row">
										<h4 className="italic">
											{watchWeight[1]} stuk
											{watchWeight[1] === "1"
												? ""
												: "s"}{" "}
											&times;{" "}
											{Number.isInteger(
												Math.floor(
													parseInt(watchWeight[0]) /
														parseInt(watchWeight[1]),
												),
											)
												? Math.floor(
														parseInt(watchWeight[0]) /
															parseInt(watchWeight[1]),
												  )
												: "500"}{" "}
											gram ={" "}
											{watchWeight[0].length > 0
												? watchWeight[0]
												: "500"}{" "}
											gram
										</h4>
									</div>
								</>
							)}
							{opties.select.length > 0 && (
								<>
									{opties.select.map((item, i) => {
										return (
											<div className="row" key={i}>
												<h4>{item.vraag}</h4>
												<select {...register(item.vraag)}>
													{item.antwoord.map(
														(option, j) => {
															return (
																<option
																	key={j}
																	value={option}
																>
																	{option}
																</option>
															);
														},
													)}
												</select>
											</div>
										);
									})}
								</>
							)}
							{opties.check.length > 0 && (
								<div className="row">
									{opties.check.map((item, i) => {
										return (
											<React.Fragment key={i}>
												<label>
													<input
														type="checkbox"
														{...register(item)}
													/>
													{item}
												</label>
											</React.Fragment>
										);
									})}
								</div>
							)}
							<div className="row">
								<h4>Opmerkingen</h4>
								<textarea
									name=""
									id=""
									placeholder="Eventuele opmerkingen"
									rows="5"
									{...register("productOpmerking", {
										min: 1,
									})}
								></textarea>
							</div>
						</form>
					</div>
				</div>
			</motion.div>
		</Wrapper>
	);
};

const Modal = ({
	prijs,
	opties,
	naam,
	setModal,
	productId,
}) => {
	const { width } = UseResize();
	if (width < 700) {
		return (
			<SmallModal
				prijs={prijs}
				opties={opties}
				naam={naam}
				setModal={setModal}
				productId={productId}
			/>
		);
	}
	return (
		<BigModal
			prijs={prijs}
			opties={opties}
			naam={naam}
			setModal={setModal}
			productId={productId}
		/>
	);
};

const Wrapper = styled.div`
	.modal-wrapper {
		position: fixed;
		top: 0;
		height: 100svh;
		width: min(100%, 80ch);
		margin: auto;
		z-index: 992;
		overflow-y: auto;
		background-color: var(--clr-white);
		padding: 32px 0 80px 0;
		.wrapper {
			.close {
				position: absolute;
				top: -24px;
				right: -8px;
				z-index: 3;
			}
			.container {
				display: flex;
				flex-direction: column;
				gap: 16px;
				form {
					display: flex;
					flex-direction: column;
					gap: 16px;
				}
				.row {
					display: flex;
					flex-direction: column;
					gap: 4px;
					label {
						display: flex;
						align-items: center;
						justify-content: start;
						gap: 8px;
						input[type="checkbox"] {
							width: auto;
							accent-color: var(--clr-dark-beige);
						}
					}
					.prijs {
						display: flex;
						gap: 12px;
					}
				}
				.btn-banner {
					display: none;
				}
				.counter {
					display: flex;
					flex-direction: row;
					align-items: center;
					gap: 8px;
					/* width of 1 div - path of minus svg / 2 (because two sides) + 2px for inherit margin */
					transform: translateX(
						calc((-48px + 16px) / 2 + 2px)
					);
					div {
						width: 48px;
					}
				}
				.italic {
					/* font-style: italic; */
					font-weight: 400;
					margin-bottom: 8px;
				}
			}
		}
	}
	@media screen and (min-width: 700px) {
		height: 100vh;
		width: 100%;
		z-index: 990;
		background-color: #00000040;
		position: fixed;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		.modal-wrapper {
			height: min(600px, 80vh);
			border: var(--border);
			border-radius: var(--radius);
			box-shadow: var(--dark-shadow);
			position: relative;
			z-index: 999;
			overflow: hidden;
			padding: 0;
			.wrapper {
				width: 100%;
				.container {
					.price-info {
						width: 100%;
						padding: 24px 24px 0 24px;
						position: relative;
					}
					.price-info::before {
						content: "";
						height: 24px;
						width: 100%;
						position: absolute;
						bottom: -38px;
						left: 0;
						background: linear-gradient(
							var(--clr-white),
							transparent
						);
						z-index: 1;
						pointer-events: none;
					}
					form {
						overflow-y: auto;
						padding: 24px 24px 24px 24px;
					}

					.btn-banner {
						display: block;
						position: fixed;
						padding: 0 24px 24px 24px;
						margin-top: -24px;
						width: 100%;
						bottom: 0;
						left: 0;
					}
					.btn-banner::before {
						content: "";
						height: 44px;
						width: calc(100% - 24px);
						margin-right: auto;
						position: absolute;
						top: -44px;
						left: 0;
						background: linear-gradient(
							transparent 25%,
							var(--clr-white) 50%,
							var(--clr-white) 100%
						);
						z-index: 1;
						pointer-events: none;
					}
				}
				.close {
					top: 8px;
					right: 8px;
					height: 48px;
					width: 48px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
`;

export default Modal;
