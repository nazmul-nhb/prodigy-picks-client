import defaultPP from "../assets/user.png";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdAppRegistration, MdMenuOpen, MdOutlineClose } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { ImProfile } from "react-icons/im";
import { FaUserLock } from "react-icons/fa6";
import { GiExitDoor } from "react-icons/gi";
import { TiInfoLargeOutline, TiShoppingCart } from "react-icons/ti";
import useGetCart from "../hooks/useGetCart";
import { ProfileLoader } from "./Loaders";
import logo from "../assets/prodigy.png";

const Navbar = () => {
	const { user, userLoading, logOut } = useAuth();
	const [openNavbar, setOpenNavbar] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>("");
	const [profilePicture, setProfilePicture] = useState<string>("");
	const [profileOpen, setProfileOpen] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { totalProducts } = useGetCart();

	useEffect(() => {
		if (user) {
			setUserName(user?.displayName || "Anonymous");
			setProfilePicture(user?.photoURL || defaultPP);
		} else {
			setUserName("Login Now!");
			setProfilePicture(defaultPP);
		}
	}, [user]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setOpenNavbar(false);
			}
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setProfileOpen(false);
			}
		};

		document.addEventListener("mouseup", handleClickOutside);

		return () => {
			document.removeEventListener("mouseup", handleClickOutside);
		};
	}, [sidebarRef, dropdownRef]);

	const navClasses = ({ isActive }: { isActive: boolean }) =>
		isActive
			? "text-prodigy-primary font-bold border-b-2 border-prodigy-primary flex items-center gap-0.5"
			: "text-prodigy-secondary hover:text-prodigy-primary font-semibold flex items-center gap-0.5";

	const navItems = (
		<>
			{user && (
				<>
					<NavLink className={navClasses} to={"cart"}>
						{totalProducts > 0 && (
							<p className="text-xs text-red-800">
								{totalProducts}
							</p>
						)}
						<TiShoppingCart />
						My Cart
					</NavLink>
				</>
			)}
			<NavLink className={navClasses} to={"/about"}>
				<TiInfoLargeOutline />
				About
			</NavLink>
		</>
	);

	const handleLogout = () => {
		logOut()
			.then(() => {
				toast.success("Logged out Successfully!");
			})
			.catch((error) => {
				console.error(error);
				toast.error(error?.message?.split(": ")[1]);
			});
	};

	return (
		<nav className="max-w-[1920px] flex items-center justify-between gap-0 md:gap-4 mx-auto shadow-md px-3 py-2 md:px-14 sticky top-0 bg-navBG bg-opacity-100 z-50 text-prodigy-secondary transition-all duration-1000 h-16">
			<div className="absolute inset-0 backdrop-filter backdrop-blur-sm -z-10"></div>

			{/* Sandwich Menubar */}
			<div
				ref={sidebarRef}
				className="sm:hidden max-[430px]:text-3xl text-4xl cursor-pointer z-50 fixed"
				onClick={() => setOpenNavbar(!openNavbar)}
			>
				{openNavbar ? (
					<MdOutlineClose className="-ml-1 text-prodigy-secondary hover:text-prodigy-primary transform transition-all duration-1000"></MdOutlineClose>
				) : (
					<MdMenuOpen className="-ml-1 text-prodigy-primary hover:text-prodigy-secondary transform transition-all duration-1000"></MdMenuOpen>
				)}
			</div>

			{/* Site <Logo & Title */}
			<NavLink
				className="ml-8 sm:ml-0 transition-all duration-500 text-2xl font-semibold text-prodigy-secondary flex items-center gap-1"
				to={"/"}
			>
				{/* Site Logo */}
				<figure className="flex items-center gap-2 font-kreonSerif hover:text-prodigy-primary hover:scale-105 transition-all duration-500">
					<img
						className="w-9 md:w-11 aspect-square"
						src={logo}
						alt="Prodigy Picks Logo"
					/>
					<span className="hidden sm:flex items-center gap-2">
						Prodigy
						<span className="text-prodigy-primary">Picks</span>
					</span>
				</figure>
			</NavLink>

			{/* Navbar Items/Links/Routes */}
			<div className="text-sm xl:text-base">
				<ul
					className={`w-3/5 sm:w-full flex flex-col sm:flex-row justify-start sm:justify-center gap-2 sm:gap-4 text-lg md:text-xl font-semibold duration-500 absolute sm:static shadow-lg shadow-slate-700 sm:shadow-none h-screen sm:h-auto p-4 sm:p-0 ${
						openNavbar
							? "md:pl-14 left-0 top-16 bg-navBG backdrop-blur-sm flex z-30"
							: "-left-full top-16"
					}`}
				>
					{navItems}
				</ul>
			</div>

			<div className="flex gap-8 items-center">
				{!user && userLoading ? (
					ProfileLoader
				) : user ? (
					<div className="flex items-center gap-2 md:gap-3">
						<Tooltip anchorSelect=".nameIcon" place="right">
							{userName}
						</Tooltip>
						<div className="relative" ref={dropdownRef}>
							<img
								className="nameIcon w-9 md:w-12 h-9 md:h-12 rounded-full border-2 border-prodigy-secondary hover:opacity-70 transition-all duration-1000 cursor-pointer"
								src={profilePicture}
								alt={userName}
								onClick={() => setProfileOpen(!profileOpen)}
							/>
							{profileOpen && (
								<div className="dropdown-arrow absolute md:right-[16%] right-[1%] mt-2 w-56 overflow-x-auto-auto rounded-md shadow-md z-30 bg-prodigy-primary shadow-[#6897bb] p-2 flex flex-col gap-2 animate__animated animate__bounceIn">
									<NavLink
										to={"/cart"}
										onClick={() =>
											setProfileOpen(!profileOpen)
										}
										className={
											"flex gap-2 items-center text-white"
										}
									>
										<ImProfile />
										{userName}
									</NavLink>
									<button
										className={
											"flex gap-2 items-center text-white"
										}
										onClick={() => {
											handleLogout();
											setProfileOpen(!profileOpen);
										}}
									>
										<GiExitDoor />
										Logout
									</button>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className="font-jokeyOneSans flex items-center gap-1 md:gap-3 text-lg md:text-xl font-medium md:pt-0 pt-1">
						<NavLink to={"/login"} className={navClasses}>
							<FaUserLock />
							Login
						</NavLink>
						<NavLink to={"/register"} className={navClasses}>
							<MdAppRegistration />
							Register
						</NavLink>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
