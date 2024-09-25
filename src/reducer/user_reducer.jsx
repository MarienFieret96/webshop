const user_reducer = (state, action) => {
	if (action.type === "GET_USER_BEGIN") {
		return { ...state, user_loading: true };
	}
	if (action.type === "GET_USER_ERROR") {
		return {
			...state,
			user_loading: false,
			user_error: true,
		};
	}
	if (action.type === "GET_USER_SUCCESS") {
		return {
			...state,
			user_loading: false,
			user_error: false,
			user: action.payload,
		};
	}
	if (action.type === "SET_USER") {
		const { user, datum, opmerking } = action.payload;
		return {
			...state,
			user,
			opmerking,
			datum,
		};
	}
	if (action.type === "LOGIN_BEGIN") {
		return { ...state, user_loading: true };
	}
	if (action.type === "LOGIN_ERROR") {
		return {
			...state,
			user_loading: false,
			user_error: true,
		};
	}
	if (action.type === "LOGIN_SUCCESS") {
		return {
			...state,
			user_loading: false,
			user_error: false,
			user: action.payload,
		};
	}

	if (action.type === "REGISTER_BEGIN") {
		return { ...state, user_loading: true };
	}
	if (action.type === "REGISTER_ERROR") {
		return {
			...state,
			user_loading: false,
			user_error: true,
		};
	}
	if (action.type === "REGISTER_SUCCESS") {
		return {
			...state,
			user_loading: false,
			user_error: false,
			user: action.payload,
		};
	}

	throw new Error(
		`No matching "${action.type} - action type`,
	);
};

export default user_reducer;
