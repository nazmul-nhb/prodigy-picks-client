import { useCallback } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";

// type for user information
interface UserInfo {
	name: string;
	email: string;
}

const useSaveUser = () => {
	const axiosPublic = useAxiosPublic();

	/**
	 * Saves user information to the database.
	 *
	 * @param {UserInfo} userInfo - The user information to save.
	 * @param {string} userInfo.name - The name of the user.
	 * @param {string} userInfo.email - The email address of the user.
	 *
	 * @returns {Promise<void>} - A promise that resolves when the user info is saved.
	 *
	 * @example
	 * const saveUser = useSaveUser();
	 * saveUser({ name: "John Doe", email: "john@example.com" });
	 */

	const saveUser = useCallback(
		async (userInfo: UserInfo) => {
			try {
				const response = await axiosPublic.post("/users", userInfo);

				if (response.data?.success) {
					toast.success("Saved User Info in the DB!");
				}
			} catch (error) {
				const errorMessage =
					(error as Error).message || "Server Error!";
				Swal.fire({
					title: "Error!",
					text: errorMessage,
					icon: "error",
					confirmButtonText: "Close",
				});
			}
		},
		[axiosPublic]
	);

	return saveUser;
};

export default useSaveUser;
