import React, {
	useContext,
	useEffect,
	useReducer,
} from "react";
import reducer from "../reducer/user_reducer";
import customFetch from "../utils/customFetch";

const initialState = {
	login: false,
	user: {
		naam: "",
		telefoon: "",
		email: "",
	},
	opmerking: "",
	datum: "",
	user_loading: false,
	user_error: false,
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		reducer,
		initialState,
	);

	const getUser = async () => {
		dispatch({ type: "GET_USER_BEGIN" });
		try {
			const response = await customFetch.get(
				"users/showMe",
			);
			const user = response.data.user;
			dispatch({ type: "GET_USER_SUCCESS", payload: user });
		} catch (error) {
			dispatch({ type: "GET_USER_ERROR" });
		}
	};

	const setUser = (order) => {
		dispatch({ type: "SET_USER", payload: order });
	};

	const logIn = async (data) => {
		dispatch({ type: "LOGIN_BEGIN" });
		try {
			const response = await customFetch.post(
				"auth/login",
				data,
			);
			const user = response.data.user;
			console.log(user);
			dispatch({ type: "LOGIN_SUCCESS", payload: user });
			return true;
		} catch (error) {
			dispatch({ type: "LOGIN_ERROR" });
			return false;
		}
	};

	const registerUser = async (data) => {
		dispatch({ type: "REGISTER_BEGIN" });
		try {
			const response = await customFetch.post(
				"auth/register",
				data,
			);
			const user = response.data.user;
			dispatch({ type: "REGISTER_SUCCESS", payload: user });
			return true;
		} catch (error) {
			dispatch({ type: "REGISTER_ERROR" });
			return false;
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<UserContext.Provider
			value={{ ...state, logIn, registerUser, setUser }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	return useContext(UserContext);
};
