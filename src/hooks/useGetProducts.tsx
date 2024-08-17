import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

/**
 * Interface for a product object.
 */
interface Product {
	_id: string;
	title: string;
	image: string;
	description: string;
	price: number;
	brand: string;
	category: string;
	ratings: number;
	createdAt: Date;
}

/**
 * Interface for the response object containing the products data.
 */
interface ProductsResponse {
	productCount: number;
	totalPages: number;
	products: Product[];
	categories: string[];
	brands: string[];
}

/**
 * Custom hook to fetch a list of products with React Query.
 *
 * @param queryKey - A unique query key for the React Query cache.
 * @param queryParams - Optional query parameters to filter or modify the products request.
 * @returns An object containing the products data, loading and error states, and a refetch function.
 */

const useGetProducts = (
	queryKey: (string | number)[] = ["products"],
	queryParams: Record<string, string | number> = {}
): {
	productCount: number;
	totalPages: number;
	products: Product[];
	categories: string[];
	brands: string[];
	isProductsLoading: boolean;
	isProductsError: boolean;
	productsError: unknown;
	refetchProducts: () => void;
} => {
	const axiosSecure = useAxiosSecure();
	const queryString = new URLSearchParams(
		queryParams as Record<string, string>
	).toString();

	const {
		data = {} as ProductsResponse,
		isLoading: isProductsLoading,
		isError: isProductsError,
		error: productsError,
		refetch: refetchProducts,
	} = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await axiosSecure.get(`/products?${queryString}`);
			return res.data;
		},
	});

	const { productCount, totalPages, products, brands, categories } = data;

	return {
		productCount,
		totalPages,
		products,
		brands,
		categories,
		isProductsLoading,
		isProductsError,
		productsError,
		refetchProducts,
	};
};

export default useGetProducts;
