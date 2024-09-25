import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import { AnimatedRoutes } from "./components";
import { NavigationParent, Footer } from "./components";

import { ProductProvider } from "./context/products_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { SearchProvider } from "./context/search_context";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserProvider>
			<ProductProvider>
				<SearchProvider>
					<CartProvider>
						<BrowserRouter>
							<NavigationParent />
							<AnimatedRoutes />
							<Footer />
						</BrowserRouter>
					</CartProvider>
				</SearchProvider>
			</ProductProvider>
		</UserProvider>
	</React.StrictMode>,
);
