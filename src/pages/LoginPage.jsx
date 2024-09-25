import React, { useEffect } from "react";
import { PageAnimation } from "../components";
import { Spinner } from "../assets/icons";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	email: z
		.string()
		.min(1, { message: "Voer een emailadres in!" })
		.email({ message: "Voer een geldig email adres in!" }),
	password: z
		.string()
		.min(1, { message: "Voer een wachtwoord in!" }),
});

const LoginPage = () => {
	window.scrollTo(0, 0);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(schema) });
	const { logIn, user, user_loading } = useUserContext();
	const navigate = useNavigate();
	const onSubmit = async (data) => {
		const newUser = await logIn(data);
		if (newUser) {
			navigate("/gebruiker");
		}
	};

	return (
		<PageAnimation>
			<Wrapper>
				<div className="wrapper">
					<div className="container">
						<h2>Inloggen</h2>
						<p onClick={() => navigate("/registreren")}>
							Nog geen account? <span>Registreren</span>
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
								type="password"
								placeholder="Wachtwoord"
								{...register("password")}
							/>
							{errors.password && (
								<div className="error-message">
									{errors.password.message}
								</div>
							)}
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
									Inloggen
								</button>
							)}
						</form>
						<button
							type="button"
							className="btn btn-tertiary"
							onClick={() => console.log(user)}
						>
							Wachtwoord vergeten
						</button>
					</div>
				</div>
			</Wrapper>
		</PageAnimation>
	);
};

const Wrapper = styled.main`
	padding: 32px 0;
	min-height: calc(100svh - 80px);
	.wrapper {
		form,
		.container {
			display: flex;
			flex-direction: column;
			gap: 16px;
			h2 {
				margin: 0;
			}
			p {
				margin: 0;
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
			button {
				margin-top: 8px;
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

export default LoginPage;
