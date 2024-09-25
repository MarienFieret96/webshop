import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
	const tempDate = new Date();
	const year = tempDate.getFullYear();
	const { pathname } = useLocation();
	return (
		<section
			className="footer"
			style={{ marginTop: pathname !== "/" ? "80px" : 0 }}
		>
			<div className="wrapper">
				<div className="slogan">
					<h4>Sinds 1966</h4>
					<h2>De visspecialist van Amersfoort</h2>
				</div>
				<div className="contact-gegevens">
					<h4>Fieret voor Zeebanket</h4>
					<p>Leusderweg 50 / 52</p>
					<p>3817 KB, Amersfoort</p>

					<p>
						<a href="tel:0334615806">033 - 461 58 06</a>
					</p>
				</div>
				<div className="openingstijden">
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
				<div className="navigation">
					<h4>Snel naar</h4>
					<p>
						<Link to="/producten">Producten</Link>
					</p>

					<p>
						<Link to="/openingstijden">Openingstijden</Link>
					</p>

					<p>
						<Link to="/openingstijden">Feestdagen</Link>
					</p>

					<p>
						<Link to="gebruiker">Mijn profiel</Link>
					</p>

					<p>
						<Link to="winkelwagen">Winkelwagen</Link>
					</p>
				</div>
				<div className="bottom-links">
					<p>
						&copy; {year} Fieret voor Zeebanket - Marien
						Fieret
					</p>
					<div className="links">
						<p>
							<Link to="algemene-voorwaarden">
								Algemene voorwaarden
							</Link>
						</p>
						<p>
							<Link to="privacy">Privacy agreement</Link>
						</p>
						<p>
							<Link to="disclaimer">Disclaimer</Link>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Footer;
