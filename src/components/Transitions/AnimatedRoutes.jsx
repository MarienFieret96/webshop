import React from "react";
import {
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
	CartPage,
	ErrorPage,
	HomePage,
	LoginPage,
	PaymentPage,
	PaymentStatus,
	ProductsPage,
	RegisterPage,
	SingleProductPage,
	UpdatePasswordPage,
	UserDashboard,
	PrivacyAgreementPage,
	DisclaimerPage,
	AlgemeneVoorwaardenPage,
	OpeningstijdenPage,
	SearchPage,
} from "../../pages";

function AnimatedRoutes() {
	const location = useLocation();
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<HomePage />} />

				<Route
					path="/producten"
					element={<ProductsPage />}
				/>

				<Route
					path="/producten/:productId"
					element={<SingleProductPage />}
				/>

				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/registreren"
					element={<RegisterPage />}
				/>
				<Route
					path="/update-wachtwoord"
					element={<UpdatePasswordPage />}
				/>
				<Route path="/winkelwagen" element={<CartPage />} />
				<Route
					path="/openingstijden"
					element={<OpeningstijdenPage />}
				/>

				<Route
					path="/gebruiker"
					element={<UserDashboard />}
				/>
				<Route
					path="/algemene-voorwaarden"
					element={<AlgemeneVoorwaardenPage />}
				/>
				<Route
					path="/disclaimer"
					element={<DisclaimerPage />}
				/>
				<Route
					path="/privacy"
					element={<PrivacyAgreementPage />}
				/>
				<Route
					path="/zoeken/:searchTerm"
					element={<SearchPage />}
				/>
				<Route path="/betalen" element={<PaymentPage />} />
				<Route
					path="/betalen/status"
					element={<PaymentStatus />}
				/>
				<Route path="/*" element={<ErrorPage />} />
			</Routes>
		</AnimatePresence>
	);
}

export default AnimatedRoutes;
