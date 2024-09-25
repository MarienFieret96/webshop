import React, { useState } from "react";
import { PageAnimation } from "../components";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Check, Spinner } from "../assets/icons";
import { useUserContext } from "../context/user_context";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	email: z
		.string()
		.min(1, { message: "Voer een emailadres in!" })
		.email({ message: "Voer een geldig email adres in!" }),
	name: z.string().min(1, { message: "Voer een naam in!" }),
	telephone: z
		.string()
		.min(1, { message: "Voer een telefoonnummer in!" })
		.length(10, {
			message: "Voer een geldig telefoonnummer in!",
		}),
	password: z.string().min(8, {
		message: "Wachtwoord moet 8 karakters of langer zijn",
	}),
});

const RegisterPage = () => {
	window.scrollTo(0, 0);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(schema) });
	const navigate = useNavigate();
	const { registerUser, user_loading } = useUserContext();
	const [confirm, setConfirm] = useState(false);

	const onSubmit = async (data) => {
		if (data.password !== data.password2) {
			setConfirm(true);
			return;
		} else {
			setConfirm(false);
		}
		const newUser = await registerUser(data);
		if (newUser) {
			navigate("/gebruiker");
		}
	};

	return (
		<PageAnimation>
			<Wrapper>
				<div className="wrapper">
					<div className="container">
						<h2>Registreren</h2>
						<p onClick={() => navigate("/login")}>
							Al een account? <span>Inloggen</span>
						</p>
						<form
							spellCheck="false"
							onSubmit={handleSubmit(onSubmit)}
						>
							<input
								type="text"
								placeholder="E-mailadres"
								{...register("email")}
							/>
							{errors.email && (
								<div className="error-message">
									{errors.email.message}
								</div>
							)}
							<input
								type="text"
								placeholder="Naam"
								{...register("name")}
							/>
							{errors.name && (
								<div className="error-message">
									{errors.name.message}
								</div>
							)}
							<input
								type="text"
								placeholder="Telefoon"
								{...register("telephone")}
							/>
							{errors.telephone && (
								<div className="error-message">
									{errors.telephone.message}
								</div>
							)}
							<input
								type="text"
								placeholder="Wachtwoord"
								{...register("password")}
							/>
							{errors.password && (
								<div className="error-message">
									{errors.password.message}
								</div>
							)}
							<input
								type="text"
								placeholder="Wachtwoord herhalen"
								{...register("password2")}
							/>
							{confirm && (
								<div className="error-message">
									Wachtwoorden komen niet overeen!
								</div>
							)}

							<div className="row">
								<Check />
								<p>Minimaal 8 karakters</p>
							</div>
							<div className="row">
								<Check />
								<p>Minimaal 1 hoofdletter</p>
							</div>
							<div className="row">
								<Check />
								<p>Minimaal 1 kleine letter</p>
							</div>

							{user_loading ? (
								<button
									className="btn btn-primary"
									disabled
								>
									<span className="invisible">laden</span>
									<Spinner />
								</button>
							) : (
								<button className="btn btn-primary">
									Registreren
								</button>
							)}
						</form>
						<p className="privacy">
							Door te registreren ga ik akkoord met{" "}
							<span
								onClick={() =>
									navigate("/algemene-voorwaarden")
								}
							>
								algemene voorwaarden
							</span>{" "}
							en het{" "}
							<span onClick={() => navigate("/privacy")}>
								privacy beleid
							</span>
							.
						</p>
					</div>
				</div>
			</Wrapper>
		</PageAnimation>
	);
};

const Wrapper = styled.main`
	padding: 32px 0;
	min-height: calc(100svh - 80px);
	height: auto;
	.wrapper {
		form,
		.container {
			display: flex;
			flex-direction: column;
			gap: 12px;
			p {
				span {
					text-decoration: underline;
					text-underline-offset: 3px;
				}
				span:hover {
					cursor: pointer;
				}
			}
			.error-message {
				color: var(--clr-red);
				margin-top: -12px;
			}
			.row {
				display: flex;
				align-items: center;
				gap: 8px;
				p {
					margin: 0;
					display: flex;
					align-items: center;
				}
				svg {
					width: 18px;
					min-width: 18px;
					height: 18px;
					min-height: 18px;
					padding: 2px;
					background-color: var(--clr-light-grey);
					border-radius: 999px;
				}
			}
			.privacy,
			button {
				margin-top: 16px;
				position: relative;
				.invisible {
					opacity: 0;
				}
			}
		}
	}
	@media screen and (min-width: 700px) {
		.wrapper {
			display: flex;
			justify-content: center;

			.container {
				width: 464px;
				padding: 64px 32px;
				margin-top: 32px;
				border: 1px solid var(--clr-light-grey);
				border-radius: var(--radius);
				box-shadow: var(--light-shadow);
			}
		}
	}
`;

export default RegisterPage;
