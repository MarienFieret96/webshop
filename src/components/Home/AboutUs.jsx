import React, { useRef } from "react";
import FotoViswinkel from "../../assets/images/foto-viswinkel-1.jpg";
import {
	motion,
	useScroll,
	useTransform,
	useMotionTemplate,
} from "framer-motion";

const AboutUs = ({ device, transform }) => {
	// console.log("about");
	if (!device)
		return (
			<section className="about">
				<div className="about-container">
					<motion.div
						className="text-container"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ margin: "100% 0px -150px 0px" }}
					>
						<h4>Over Ons</h4>
						<p>
							Fieret voor Zeebanket is een familiebedrijf
							met een rijke historie van meer dan 58 jaar.
							In 1966 begon Joost Fieret met de winkel, en
							sinds 1987 werd hij bijgestaan door zijn zoon
							Gijsbert Fieret.
						</p>
						<p>
							In 1996 namen Gijsbert en zijn vrouw Marleen
							de zaak over en transformeerden deze grondig
							om een uitgebreid assortiment verse vis te
							kunnen bieden.
						</p>
						<p>
							Bij ons vindt u een overvloed aan verse vis,
							grotendeels wildvang, variërend van hele
							vissen tot filets. Onze vis wordt rechtstreeks
							van de afslag ingekocht en ter plekke
							gefileerd, wat garant staat voor de hoogste
							kwaliteit en de beste smaak. Daarnaast bieden
							wij een breed assortiment aan schelpdieren
							zoals mosselen en oesters, die dagelijks vers
							uit Yerseke worden aangeleverd. Heeft u liever
							iets makkelijks? Dan kunt u kiezen uit onze
							smakelijke kant-en-klaar maaltijden. Ook
							hebben wij een ruime selectie aan gerookte vis
							en salades, perfect voor op brood of bij de
							borrel.
						</p>
						<p>Wij verwelkomen u graag in onze winkel!</p>
					</motion.div>
					<motion.div
						className="image-container"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ margin: "100% 0px -150px 0px" }}
					>
						<img src={FotoViswinkel} alt="" />
					</motion.div>
				</div>
			</section>
		);

	return (
		<section className="about">
			<div className="about-container">
				<div className="text-container">
					<h4>Over Ons</h4>
					<p>
						Fieret voor Zeebanket is al ruim 58 jaar een
						echt familiebedrijf. In 1966 is de winkel
						opgericht door Joost Fieret. Sinds 1987 staat
						ook zijn zoon Gijsbert Fieret bij hem in de
						zaak.
					</p>
					<p>
						In 1996 heeft Gijsbert, samen met zijn vrouw
						Marleen, de winkel overgenomen. Al snel werd de
						winkel helemaal verbouwd om ruimte te creëeren
						voor een royaal assortiment aan verse vis.
					</p>
					<p>
						Het grootste gedeelte van de toonbank wordt
						gevuld met verse vis, veelal wildvang. Zowel
						hele vissen als filets zijn bij ons te krijgen.
						De verse vis wordt rechtstreeks van de afslag
						ingekocht en in huis gefileerd. Zo wordt de
						kwaliteit en smaak gewaarborgd. Ook kunt u bij
						ons terecht voor mosselen, oesters en
						verschillende soorten schelpdieren. Dit wordt
						elke nacht vers aangeleverd vanuit Yerseke. Meer
						zin in iets makkelijks? Kies dan een van onze
						heerlijke kant & klaar maaltijden. Daarnaast
						hebben wij ook een ruime selectie aan gerookte
						vis en salades. Lekker voor op brood of bij de
						borrel.
					</p>
					<p>Tot snel bij ons in de winkel!</p>
				</div>
				<motion.div
					className="image-container"
					style={{ transform }}
				>
					<img src={FotoViswinkel} alt="" />
				</motion.div>
			</div>
		</section>
	);
};

export default AboutUs;
