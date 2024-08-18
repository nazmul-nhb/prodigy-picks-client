import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUserEdit } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import SocialLogin from "../components/SocialLogin";
import { MdEmail, MdImage } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { User } from "firebase/auth";
import useSaveUser from "../hooks/useSaveUser";
import { ButtonLoader } from "../components/Loaders";

interface RegInfo {
	name: string;
	photo: string;
	email: string;
	password: string;
}

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { createUser, updateUserProfile, userLoading, user, setUser } =
		useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	const saveUser = useSaveUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegInfo>();

	useEffect(() => {
		if (user) {
			navigate(from, { replace: true });
		}
	}, [from, navigate, user]);

	useEffect(() => {
		if (errors.name) {
			toast.error(errors.name.message as string, { duration: 2000 });
			return;
		}
		if (errors.email) {
			toast.error(errors.email.message as string, { duration: 2000 });
			return;
		}
		if (errors.photo) {
			toast.error(errors.photo.message as string, { duration: 2000 });
			return;
		}
		if (errors.password) {
			toast.error(errors.password.message as string, { duration: 2000 });
			return;
		}
	}, [errors.email, errors.name, errors.password, errors.photo]);

	const handleRegister: SubmitHandler<RegInfo> = (regInfo) => {
		const { name, photo, email, password } = regInfo;
		// register new user on firebase
		createUser({ email, password })
			.then(() => {
				// update profile
				updateUserProfile(name, photo)
					.then(() => {
						const userInfo = { name, email };
						saveUser(userInfo);
					})
					.catch((error) => {
						Swal.fire({
							title: "Error!",
							text: error.message.split(": ")[1] || error.message,
							icon: "error",
							confirmButtonText: "Close",
						});
					});

				toast.success("Registration Successful!");
				// set name & image for newly registered user
				setUser((prevUser) => {
					if (!prevUser) return null;

					return {
						...prevUser,
						displayName: name as string,
						photoURL: photo as string,
					} as User;
				});
				navigate(from, { replace: true });
			})
			.catch((error) => {
				console.error("Registration Error: ", error);
				if (
					error.message ===
					"Firebase: Error (auth/email-already-in-use)."
				) {
					Swal.fire({
						title: "Registration Failed!",
						text: "Your Email is Already Registered!",
						icon: "warning",
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
				<title>Register - Prodigy Picks</title>
			</Helmet>
			<h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 font-kreonSerif">
				Please, Register
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
				{/* Email Password Registration */}
				<form
					onSubmit={handleSubmit(handleRegister)}
					className="w-full flex flex-col gap-4 px-4 lg:px-8 py-4 lg:py-6 shadow-lg shadow-prodigy-primary rounded-md bg-[#bbd3eb4b]"
				>
					<h3 className="text-xl md:text-2xl font-medium font-kreonSerif text-center">
						Register with Email & Password
					</h3>
					{/* Name */}
					<div className="flex flex-col gap-3">
						<label className="font-medium" htmlFor="name">
							Your Name *
						</label>
						<div className="flex items-center gap-2 bg-transparent pl-2 rounded-lg border border-prodigy-secondary">
							<FaUserEdit className="text-gray-500" />
							<input
								{...register("name", {
									required: {
										value: true,
										message: "You must provide your name.",
									},
								})}
								className="px-2 rounded-r-lg py-1 border-l border-prodigy-secondary bg-transparent w-full focus:bg-transparent focus:outline-0"
								type="text"
								name="name"
								id="name"
								placeholder="Enter Your Name"
							/>
						</div>
					</div>
					{/* Email */}
					<div className="flex flex-col gap-3">
						<label className="font-medium" htmlFor="email">
							Your Email *
						</label>
						<div className="flex items-center gap-2 bg-transparent pl-2 rounded-lg border border-prodigy-secondary">
							<MdEmail className="text-gray-500" />
							<input
								{...register("email", {
									required: {
										value: true,
										message:
											"Provide a valid email address!",
									},
								})}
								className="px-2 rounded-r-lg py-1 border-l border-prodigy-secondary bg-transparent w-full focus:outline-0"
								type="email"
								name="email"
								id="email"
								placeholder="Enter Your Email"
							/>
						</div>
					</div>
					{/* Profile Picture */}
					<div className="flex flex-col gap-3">
						<label className="font-medium" htmlFor="photo">
							Profile Picture URL *
						</label>
						<div className="flex items-center gap-2 bg-transparent pl-2 rounded-lg border border-prodigy-secondary">
							<MdImage className="text-gray-500" />
							<input
								{...register("photo", {
									required: {
										value: true,
										message: "Provide a valid photo URL.",
									},
								})}
								className="px-2 rounded-r-lg py-1 border-l border-prodigy-secondary bg-transparent w-full focus:outline-0"
								type="text"
								name="photo"
								id="photo"
								placeholder="Enter Your Profile Picture URL "
							/>
						</div>
					</div>
					<div className="flex flex-col gap-3">
						<label className="font-medium" htmlFor="password">
							Your Password *
						</label>
						<div className="flex items-center gap-2 bg-transparent  pl-2 rounded-lg border border-prodigy-secondary">
							<RiLockPasswordFill className="text-gray-500" />
							<div className="relative w-full">
								<input
									{...register("password", {
										required: {
											value: true,
											message:
												"You must choose a password.",
										},
										minLength: {
											value: 6,
											message:
												"Password must contain 6 characters!",
										},
										validate: {
											isCapital: (value) => {
												if (/(?=.*[A-Z])/.test(value)) {
													return true;
												}
												return "Password must contain uppercase!";
											},
											isLower: (value) => {
												if (/(?=.*[a-z])/.test(value)) {
													return true;
												}
												return "Password must contain lowercase!";
											},
											isNumeric: (value) => {
												if (/(?=.*[0-9])/.test(value)) {
													return true;
												}
												return "Password must contain a number!";
											},
											isSpecialChar: (value) => {
												if (
													/(?=.*[!@#$%^&*()_+\-~=[\]{};'`:"\\|,.<>/?])/.test(
														value
													)
												) {
													return true;
												}
												return "Password must contain a symbol!";
											},
										},
									})}
									className="px-2 pr-8 rounded-r-lg py-1 border-l border-prodigy-secondary bg-transparent w-full focus:outline-0"
									type={showPassword ? "text" : "password"}
									name="password"
									id="password"
									placeholder="Enter Your Password"
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
						{userLoading ? ButtonLoader : "Register New Account"}
					</button>
					<p className="text-center text-sm md:text-base font-medium">
						Already have an Account?{" "}
						<Link
							className="hover:pl-4 text-[#3c5cc3] font-bold hover:text-prodigy-secondary transition-all duration-500"
							to={"/login"}
						>
							Login Here!
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Register;
