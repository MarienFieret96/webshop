import React, {
	useContext,
	useEffect,
	useReducer,
} from "react";
import reducer from "../reducer/cart_reducer";
import customFetch from "../utils/customFetch";

const initialState = {
	cart: [],
	total_items: 0,
	total_amount: 0,
	nav_layout: false,
	add_background: false,
	orders: [],
	order_loading: false,
	order_error: false,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		reducer,
		initialState,
	);
	const addToCart = (product) => {
		dispatch({
			type: "ADD_TO_CART",
			payload: product,
		});
	};
	const removeItem = (id) => {
		dispatch({ type: "REMOVE_CART_ITEM", payload: id });
	};

	const toggleAmount = (value, id) => {
		dispatch({
			type: "TOGGLE_CART_ITEM_AMOUNT",
			payload: {
				value,
				id,
			},
		});
	};

	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	const changeLayout = (visible) => {
		// console.log(visible);
		dispatch({ type: "CHANGE_LAYOUT", payload: visible });
	};

	const addWhiteBackground = (visible) => {
		dispatch({ type: "ADD_BACKGROUND", payload: visible });
	};

	const createOrder = async (order) => {
		dispatch({ type: "CREATE_ORDER_BEGIN" });
		try {
			const response = await customFetch.post(
				"/orders",
				order,
			);
			console.log(response.data);
			dispatch({ type: "CREATE_ORDER_SUCCESS" });
		} catch (error) {
			dispatch({ type: "CREATE_ORDER_ERROR" });
		}
	};

	useEffect(() => {
		dispatch({ type: "COUNT_CART_TOTALS" });
	}, [state.cart]);

	return (
		<CartContext.Provider
			value={{
				...state,
				addToCart,
				removeItem,
				toggleAmount,
				clearCart,
				changeLayout,
				addWhiteBackground,
				createOrder,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => {
	return useContext(CartContext);
};
