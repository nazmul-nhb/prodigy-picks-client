import axios, { AxiosInstance } from "axios";

const axiosPublic: AxiosInstance = axios.create({
	baseURL: "https://prodigy-picks-server.vercel.app",
});

const useAxiosPublic = (): AxiosInstance => {
	return axiosPublic;
};

export default useAxiosPublic;
