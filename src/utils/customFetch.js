import axios from "axios";

let baseUrl = "";

if (process.env.NODE_ENV === "production") {
	baseUrl =
		"https://order-system-api-m5k8.onrender.com/api/v1";
} else {
	baseUrl = "http://localhost:5000/api/v1";
}

const customFetch = axios.create({
	baseURL: baseUrl,
	withCredentials: true,
	headers: {
		"Content-type": "application/json",
	},
});

export default customFetch;
