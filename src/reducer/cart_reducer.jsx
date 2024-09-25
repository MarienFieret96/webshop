const cart_reducer = (state, action) => {
	if (action.type === "ADD_TO_CART") {
		const { aantal, id } = action.payload;
		const tempItem = state.cart.find((i) => i.id === id);
		if (tempItem) {
			const tempCart = state.cart.map((cartItem) => {
				if (cartItem.id === id) {
					let newAmount = cartItem.aantal + aantal;
					return { ...cartItem, aantal: newAmount };
				} else {
					return cartItem;
				}
			});
			console.log(tempCart);
			return { ...state, cart: tempCart };
		} else {
			return {
				...state,
				cart: [...state.cart, action.payload],
			};
		}
	}
	if (action.type === "REMOVE_CART_ITEM") {
		const tempCart = state.cart.filter(
			(item) => item.id !== action.payload,
		);
		return { ...state, cart: tempCart };
	}
	if (action.type === "TOGGLE_CART_ITEM_AMOUNT") {
		const { id, value } = action.payload;
		const tempCart = state.cart.map((item) => {
			if (item.id === id) {
				if (value === "plus") {
					let newAmount = item.aantal + 1;

					return { ...item, aantal: newAmount };
				}
				if (value === "min") {
					let newAmount = item.aantal - 1;
					if (newAmount < 1) {
						newAmount = 1;
					}
					return { ...item, aantal: newAmount };
				}
			}
			console.log();
			return item;
		});
		return { ...state, cart: tempCart };
	}
	if (action.type === "CLEAR_CART") {
		return { ...state, cart: [] };
	}
	if (action.type === "COUNT_CART_TOTALS") {
		const { total_items, total_amount } = state.cart.reduce(
			(total, cartItem) => {
				const { aantal, totaalPrijs } = cartItem;
				total.total_items += aantal;
				total.total_amount += totaalPrijs * aantal;
				return total;
			},
			{ total_items: 0, total_amount: 0 },
		);
		return { ...state, total_items, total_amount };
	}
	if (action.type === "CHANGE_LAYOUT") {
		const newLayout = action.payload;
		return { ...state, nav_layout: newLayout };
	}
	if (action.type === "ADD_BACKGROUND") {
		const newLayout = action.payload;
		return { ...state, add_background: newLayout };
	}
	if (action.type === "CREATE_ORDER_BEGIN") {
		return {
			...state,
			order_loading: true,
			order_error: false,
		};
	}
	if (action.type === "CREATE_ORDER_ERROR") {
		return {
			...state,
			order_loading: false,
			order_error: true,
		};
	}
	if (action.type === "CREATE_ORDER_SUCCESS") {
		return {
			...state,
			order_loading: false,
			order_error: false,
		};
	}
	throw new Error(
		`No matching "${action.type} - action type`,
	);
};

export default cart_reducer;
