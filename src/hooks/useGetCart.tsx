import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

// Define the interfaces for your data
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

interface CartItem {
	_id: string;
	userEmail: string;
	products: Product;
	quantity: number;
	__v: number;
}

interface CartResponse {
	success: boolean;
	totalPrice: number;
	cartItems: CartItem[];
}

interface UseGetCartReturnType {
	isCartLoading: boolean;
	isError: boolean;
	error: unknown;
	totalProducts: number;
	cartItems: CartItem[];
	totalPrice: number;
	refetchCart: () => void;
}

/**
 * Custom hook to fetch and manage the cart items for the authenticated user.
 * @returns {UseGetCartReturnType} - Object containing cart data and related states.
 */

const useGetCart = (): UseGetCartReturnType => {
	const axiosSecure = useAxiosSecure();
	const { user, userLoading } = useAuth();

	const {
		isLoading: isCartLoading,
		isError,
		error,
		data,
		refetch: refetchCart,
	} = useQuery<CartResponse>({
		queryKey: ["cartItems", user?.email, userLoading],
		enabled: !!user?.email && !userLoading,
		queryFn: async () => {
			const res = await axiosSecure.get(`/carts/${user?.email}`);
			return res.data;
		},
	});

	// Extract cartItems and totalPrice safely from the response data
	const cartItems = data?.cartItems || [];
	const totalPrice = data?.totalPrice || 0;

	// Calculate the total number of products in the cart
	const totalProducts =
		cartItems.reduce((total, item) => total + item.quantity, 0) || 0;

	return {
		isCartLoading,
		isError,
		error,
		totalProducts,
		cartItems,
		totalPrice,
		refetchCart,
	};
};

export default useGetCart;
