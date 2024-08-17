import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

/**
 * Interface representing the cart item to be added.
 */
interface CartItem {
	userEmail: string;
    products: string;
    quantity:number
}

/**
 * Custom hook for adding items to the cart.
 *
 * @returns An object containing:
 * - `addToCart`: A function to add an item to the cart.
 * - `cartLoading`: A boolean indicating if the cart is loading.
 */
const useAddToCart = () => {
	const axiosSecure = useAxiosSecure();
	const [cartLoading, setCartLoading] = useState<boolean>(false);

	/**
	 * Adds an item to the cart and optionally triggers a refetch.
	 *
	 * @param cartItem - The item to add to the cart.
	 * @param refetch - An optional refetch function from useQuery.
	 */
	const addToCart = (cartItem: CartItem, refetch?: () => void) => {
		setCartLoading(true);
		axiosSecure
			.post("/carts", cartItem)
			.then((res) => {
				if (res.data?.success) {
					toast.success(res.data?.message || "Item Added to Cart!");
				} else {
					toast.error(
						res.data?.message || "Failed to Add Item to Cart!"
					);
				}

				// Only call refetch if it's provided
				if (refetch) {
					refetch();
				}
			})
			.catch((error) => {
				console.error(error);
				const errorMessage =
					(error as Error).message || "Server Error!";
				Swal.fire({
					title: "Error!",
					text: errorMessage,
					icon: "error",
					confirmButtonText: "Close",
				});
			})
			.finally(() => {
				setCartLoading(false);
			});
	};

	return { addToCart, cartLoading };
};

export default useAddToCart;
