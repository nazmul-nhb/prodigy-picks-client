import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
	return (
		<>
			<Navbar />
			<main className="max-w-[1920px] w-full min-h-[90vh] mx-auto bg-[#d7ecfb]">
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Root;
