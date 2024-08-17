import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const axiosSecure: AxiosInstance = axios.create({
	baseURL: "https://prodigy-picks-server.vercel.app",
});

const useAxiosSecure = () => {
	const navigate = useNavigate();
	const { logOut } = useAuth();

	// request interceptor to add authorization header for every secure API call
	axiosSecure.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("prodigy-token");
			if (token && config.headers) {
				config.headers.authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error: AxiosError) => {
			// pass the error below
			return Promise.reject(error);
		}
	);

	// handling 401 and 403 status codes
	axiosSecure.interceptors.response.use(
		(response: AxiosResponse) => response,
		async (error: AxiosError) => {
			const status = error.response?.status;
			console.error("Status Error: ", status);

			// log out the user if there's an issue with the token
			if (status === 401 || status === 403) {
				await logOut();
				navigate("/login");
			}

			return Promise.reject(error);
		}
	);

	return axiosSecure;
};

export default useAxiosSecure;
