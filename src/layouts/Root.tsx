import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
	return (
		<>
			<Navbar />
			<main className="min-h-screen">
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Root;
