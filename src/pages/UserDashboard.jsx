import React, { useEffect, useState } from "react";
import {
	PageAnimation,
	Bestellingen,
	Logout,
	UpdateUserInformation,
	UserInformation,
} from "../components";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import styled from "styled-components";

const views = [
	Bestellingen,
	UserInformation,
	Logout,
	UpdateUserInformation,
];

const UserDashboard = () => {
	window.scrollTo(0, 0);
	const [tab, setTab] = useState(0);
	const CurrentView = views[tab];
	const { user, user_loading } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user_loading) {
			if (user.naam.length === 0) {
				navigate("/login");
			}
		}
	}, [user_loading]);

	return (
		<PageAnimation>
			<Wrapper>
				<div className="user-wrapper">
					<div className="tabs">
						<div className="tab" onClick={() => setTab(0)}>
							<h4>Bestellingen</h4>
						</div>
						<div className="tab" onClick={() => setTab(1)}>
							<h4>Mijn gegevens</h4>
						</div>
						<div className="tab" onClick={() => setTab(2)}>
							<h4>Uitloggen</h4>
						</div>
					</div>
					<div className="content">
						<CurrentView setTab={setTab} />
					</div>
				</div>
			</Wrapper>
		</PageAnimation>
	);
};

const Wrapper = styled.section`
	.user-wrapper {
		width: min(100%, 1170px);
		margin-inline: auto;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: auto 1fr;
		gap: 16px;
		position: relative;
		min-height: calc(100svh - 80px);
		.tabs {
			grid-column: span 12;
			height: fit-content;
			box-shadow: 0px 4px 3px #33333310;
			position: sticky;
			top: 80px;
			background-color: var(--clr-white);
			.tab {
				padding: 16px;
				border-bottom: var(--border);
			}
		}
		.content {
			height: fit-content;
			grid-column: span 12;
			padding: 16px 0;

			.logout {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				h4 {
					margin-bottom: 32px;
					text-align: center;
				}
				button {
					width: fit-content;
					padding: 12px 36px;
					margin: 0 auto;
				}
			}

			.bestellingen {
				h4 {
					margin: 8px 0;
				}
				h4,
				h3 {
					padding: 0 16px;
				}
				.bestelling {
					display: flex;
					justify-content: space-between;
					border-top: var(--border);
					border-bottom: var(--border);
					padding: 0 16px;
					background-color: #e4e4e4;

					p {
						margin: 0;
						padding: 24px 0;
					}
				}
			}
			.user-information {
				padding: 0 16px;
				.title-row {
					display: flex;
					justify-content: space-between;
					.icon {
						line-height: 0;
						transform: translateY(-3px);
						svg {
							padding: 8px;
						}
					}
				}
			}
		}
	}
`;

export default UserDashboard;
