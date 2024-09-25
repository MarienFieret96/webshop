const products_reducer = (state, action) => {
	if (action.type === "GET_PRODUCTS_BEGIN") {
		return { ...state, product_loading: true };
	}
	if (action.type === "GET_PRODUCTS_ERROR") {
		return {
			...state,
			product_loading: false,
			product_error: true,
		};
	}
	if (action.type === "GET_PRODUCTS_SUCCESS") {
		const { sortedProducts, unsortedProducts } =
			action.payload;
		return {
			...state,
			product_loading: false,
			product_error: false,
			products: sortedProducts,
			unsorted_products: unsortedProducts,
		};
	}
	if (action.type === "GET_SINGLE_PRODUCT_BEGIN") {
		return { ...state, single_product_loading: true };
	}
	if (action.type === "GET_SINGLE_PRODUCT_ERROR") {
		return {
			...state,
			single_product_loading: false,
			single_product_error: true,
		};
	}
	if (action.type === "GET_SINGLE_PRODUCT_SUCCESS") {
		return {
			...state,
			single_product_loading: false,
			single_product_error: false,
			single_product: action.payload,
		};
	}
	if (action.type === "SET_SINGLE_PRODUCT") {
		return { ...state, single_product: action.payload };
	}
	throw new Error(
		`No matching "${action.type} - action type`,
	);
};

export default products_reducer;
