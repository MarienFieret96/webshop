import React from "react";
import styled from "styled-components";
import ViswinkelFoto1 from "../assets/images/foto-viswinkel-1.jpg";
import ViswinkelFoto2 from "../assets/images/foto-viswinkel-2.jpg";

const OpeningstijdenPage = () => {
	window.scrollTo(0, 0);
	const tempDate = new Date();
	const year = tempDate.getFullYear();
	return (
		<Wrapper>
			<div className="wrapper">
				<div className="container">
					<div className="text">
						<h3>Contact & Openingstijden</h3>
						<h4>Openingstijden</h4>
						<div className="row">
							<p>Maandag:</p>
							<p>Gesloten</p>
						</div>
						<div className="row">
							<p>Dinsdag:</p>
							<p>09:00 - 18:00</p>
						</div>
						<div className="row">
							<p>Woensdag:</p>
							<p>09:00 - 18:00</p>
						</div>
						<div className="row">
							<p>Donderdag:</p>
							<p>09:00 - 18:00</p>
						</div>
						<div className="row">
							<p>Vrijdag:</p>
							<p>09:00 - 18:30</p>
						</div>
						<div className="row">
							<p>Zaterdag:</p>
							<p>09:00 - 17:00</p>
						</div>
						<div className="row">
							<p>Zondag:</p>
							<p>Gesloten</p>
						</div>
					</div>
					<div className="text">
						<h4>Speciale openingstijden</h4>
						<div className="row">
							<p>Goede vrijdag:</p>
							<p>09:00 - 18:00</p>
						</div>
						<div className="row">
							<p>Koningsdag:</p>
							<p>Gesloten</p>
						</div>
						<div className="row">
							<p>Hemelvaart:</p>
							<p>Gesloten</p>
						</div>

						<div className="row">
							<p>24 december:</p>
							<p>08:00 - 16:00</p>
						</div>
						<div className="row">
							<p>Kerstdagen:</p>
							<p>Gesloten</p>
						</div>
					</div>
					<div className="text">
						<h4>Vakantie {year}</h4>
						<div className="row">
							<p>29 juli t/m 10 augustus</p>
							<p>Gesloten</p>
						</div>
					</div>
					<div className="text">
						<h4>Contact</h4>
						<div className="row">
							<p>Telefoon:</p>
							<p>
								<a href="tel:0334615806">033 - 461 58 06</a>
							</p>
						</div>
						<div className="row">
							<p>Adres:</p>
							<p>Leusderweg 50</p>
						</div>
						<div className="row">
							<p className="right">3817KB Amersfoort</p>
						</div>
						{/* <div className="row">
							<p className="right italic">
								gratis parkeren voor de deur!
							</p>
						</div> */}
					</div>
				</div>
				<div className="image-container">
					<div className="image">
						<img src={ViswinkelFoto1} alt="" />
					</div>
					<div className="image">
						<img src={ViswinkelFoto2} alt="" />
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	min-height: calc(100svh - 80px);
	.wrapper {
		padding-top: 32px;
		.container {
			display: flex;
			flex-direction: column;
			gap: 8px;
			.text {
				display: flex;
				flex-direction: column;
				h3 {
					margin-bottom: 16px;
				}
				.row {
					display: flex;
					justify-content: space-between;
					.right {
						margin-left: auto;
					}
					/* .italic {
						font-style: italic;
					} */
				}
				h4 {
					padding-bottom: 8px;
				}
			}
		}
		.image-container {
			display: none;
		}
	}
	@media screen and (min-width: 700px) {
		.wrapper {
			grid-template-columns: 350px 1fr;
			gap: 32px;
			.container {
				max-width: 350px;
				grid-column: span 1;
			}
			.image-container {
				display: flex;
				height: 100%;
				gap: 16px;
				flex-direction: column;
				justify-content: space-between;
				border-radius: var(--radius);
				.image {
					box-shadow: var(--dark-shadow);
					overflow: auto;
					border-radius: var(--radius);
					margin-left: auto;
					max-height: 320px;
					width: 100%;
					max-width: 700px;
					img {
						width: 100%;
						/* max-height: 320px; */
						max-width: 700px;
					}
				}
			}
		}
	}
`;

export default OpeningstijdenPage;
