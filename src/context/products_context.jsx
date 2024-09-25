import React, {
	useContext,
	useEffect,
	useReducer,
	useRef,
} from "react";
import reducer from "../reducer/products_reducer";
import customFetch from "../utils/customFetch";
import { useNavigate } from "react-router-dom";

const initialState = {
	unsorted_products: [],
	products: [],
	product_loading: false,
	product_error: false,
	single_product: {},
	single_product_loading: false,
	single_product_error: false,
};

const ProductContext = React.createContext();

export const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		reducer,
		initialState,
	);

	const fetchCategories = (products) => {
		const verseVis = [];
		const verseFilet = [];
		const maaltijden = [];
		const kantEnKlaar = [];
		const schotels = [];
		const schaaldieren = [];
		const oesters = [];
		const gerookteVis = [];
		const salades = [];
		const broodjes = [];
		const gebakkenVis = [];
		const sauzen = [];
		const zeewierProducten = [];
		const soepen = [];
		const diepvries = [];
		const conserven = [];
		const wijnen = [];
		const overig = [];
		products.forEach((product) => {
			switch (product.categorie) {
				case "Verse vis":
					verseVis.push(product);
					break;
				case "Verse filet":
					verseFilet.push(product);
					break;

				case "Maaltijden":
					maaltijden.push(product);
					break;
				case "Kant en klaar":
					kantEnKlaar.push(product);
					break;
				case "Schotels":
					schotels.push(product);
					break;
				case "Schaal- en schelpdieren":
					schaaldieren.push(product);
					break;
				case "Oesters":
					schaaldieren.push(product);
					break;
				case "Gerookte vis":
					gerookteVis.push(product);
					break;
				case "Salades":
					salades.push(product);
					break;
				case "Broodjes":
					broodjes.push(product);
					break;
				case "Gebakken vis":
					gebakkenVis.push(product);
					break;
				case "Sauzen":
					sauzen.push(product);
					break;
				case "zeewierProducten":
					zeewierProducten.push(product);
					break;
				case "Soepen":
					soepen.push(product);
					break;
				case "Diepvries":
					diepvries.push(product);
					break;
				case "Conserven":
					conserven.push(product);
					break;
				case "Wijnen":
					wijnen.push(product);
					break;
				case "Overig":
					overig.push(product);
					break;
				default:
					console.log(
						`geen categorie met de naam ${product.categorie} `,
					);
			}
		});
		const categoryArray = [
			verseVis,
			verseFilet,
			maaltijden,
			kantEnKlaar,
			schotels,
			schaaldieren,
			oesters,
			gerookteVis,
			salades,
			broodjes,
			gebakkenVis,
			sauzen,
			zeewierProducten,
			soepen,
			diepvries,
			conserven,
			wijnen,
			overig,
		];
		return categoryArray;
	};

	const fetchProducts = async () => {
		dispatch({ type: "GET_PRODUCTS_BEGIN" });
		try {
			const response = await customFetch.get("/products");
			const unsortedProducts = response.data.products;
			const sortedProducts = fetchCategories(
				unsortedProducts,
			);
			dispatch({
				type: "GET_PRODUCTS_SUCCESS",
				payload: { sortedProducts, unsortedProducts },
			});
		} catch (error) {
			dispatch({ type: "GET_PRODUCTS_ERROR" });
		}
	};

	const findObjectByProperty = (array, property, value) => {
		return array.find((item) => item[property] === value);
	};

	const fetchSingleProduct = (id, slug) => {
		dispatch({ type: "GET_SINGLE_PRODUCT_BEGIN" });
		try {
			const product = findObjectByProperty(
				state.products[id],
				"slug",
				slug,
			);
			dispatch({
				type: "GET_SINGLE_PRODUCT_SUCCESS",
				payload: product,
			});
		} catch (error) {
			dispatch({ type: "GET_SINGLE_PRODUCT_ERROR" });
		}
	};

	const setSingleProduct = (product) => {
		dispatch({
			type: "SET_SINGLE_PRODUCT",
			payload: product,
		});
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<ProductContext.Provider
			value={{
				...state,
				fetchSingleProduct,
				setSingleProduct,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => {
	return useContext(ProductContext);
};
