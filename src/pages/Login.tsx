import { useEffect, useState } from "react";
import SocialLogin from "../components/SocialLogin";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useSaveUser from "../hooks/useSaveUser";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { Credentials } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ButtonLoader } from "../components/Loaders";

interface ErrorObject extends Error {
	message: string;
}

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { user, userLoading, loginWithEmail } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const saveUser = useSaveUser();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Credentials>();

	useEffect(() => {
		if (user) {
			navigate(from, { replace: true });
		}
	}, [from, navigate, user]);

	useEffect(() => {
		if (errors.email?.message && typeof errors.email.message === "string") {
			toast.error(errors.email.message, { duration: 2000 });
			return;
		}
		if (
			errors.password?.message &&
			typeof errors.password.message === "string"
		) {
			toast.error(errors.password.message, { duration: 2000 });
			return;
		}
	}, [errors.email, errors.password]);

	const handleLogin: SubmitHandler<Credentials> = (loginInfo) => {
		loginWithEmail(loginInfo)
			.then((result) => {
				toast.success("Successfully Logged in!");
				const user = result.user;
				const userInfo = {
					name: user?.displayName as string,
					email: user?.email as string,
				};
				saveUser(userInfo);
				navigate(from, { replace: true });
			})
			.catch((error: ErrorObject) => {
				console.error("Login Error: ", error);
				if (
					error.message ===
					"Firebase: Error (auth/invalid-credential)."
				) {
					Swal.fire({
						title: "Error!",
						text: "Email & Password Did Not Match!",
						icon: "error",
						confirmButtonText: "Close",
					});
				} else if (
					error.message ===
					"Firebase: Error (auth/network-request-failed)."
				) {
					Swal.fire({
						title: "Network Error!",
						text: "Please, Check Your Network Connection!",
						icon: "error",
						confirmButtonText: "Close",
					});
				} else {
					Swal.fire({
						title: "Error!",
						text: error.message.split(": ")[1] || error.message,
						icon: "error",
						confirmButtonText: "Close",
					});
				}
			});
	};

	return (
		<section className="mx-6 md:mx-10 py-2 md:py-8 p-2 md:px-4 flex flex-col items-center">
			<Helmet>
				<title>Login - Prodigy Picks</title>
			</Helmet>
			<h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 font-kreonSerif">
				Please, Login
			</h2>
			<div className="flex-1 flex flex-col items-center gap-2 w-full sm:w-3/4 md:w-3/5 lg:w-2/5">
				{/* Social Media Login */}
				<SocialLogin />
				{/* Divider */}
				<div className="flex items-center w-full my-4">
					<hr className="w-full dark:text-gray-600" />
					<p className="px-3 dark:text-gray-600">OR</p>
					<hr className="w-full dark:text-gray-600" />
				</div>
				{/* Email Password Login */}
				<form
					onSubmit={handleSubmit(handleLogin)}
					className="w-full flex flex-col gap-6 px-4 lg:px-8 py-4 lg:py-6 shadow-lg shadow-prodigy-primary  rounded-md bg-[#bbd3eb4b]"
				>
					<h2 className="text-xl md:text-2xl font-medium font-kreonSerif text-center">
						Login with Email & Password
					</h2>
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2 pl-2 bg-transparent rounded-lg border border-prodigy-secondary">
							<label htmlFor="email">
								<MdEmail />
							</label>
							<input
								{...register("email", {
									required: {
										value: true,
										message: "Provide your email address.",
									},
								})}
								className="px-2 rounded-r-lg py-1 bg-transparent w-full border-l border-prodigy-secondary focus:outline-0"
								type="email"
								name="email"
								id="email"
								placeholder="Your Email"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2 bg-transparent pl-2 rounded-lg border border-prodigy-secondary">
							<label htmlFor="password">
								<RiLockPasswordFill />
							</label>
							<div className="relative w-full">
								<input
									{...register("password", {
										required: {
											value: true,
											message:
												"Provide a valid password.",
										},
									})}
									className="px-2 pr-8 rounded-r-lg py-1 bg-transparent w-full border-l border-prodigy-secondary focus:outline-0"
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									placeholder="Your Password"
								/>
								<span
									className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? <FaEyeSlash /> : <FaEye />}
								</span>
							</div>
						</div>
					</div>

					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700 transition-all duration-500"
					>
						{userLoading ? ButtonLoader : "Login!"}
					</button>
					<p className="text-center text-sm md:text-base font-medium">
						New to this site?{" "}
						<Link
							className="hover:pl-4 text-[#3c5cc3] font-bold hover:text-prodigy-secondary transition-all duration-500"
							to={"/register"}
						>
							Register Here!
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Login;
