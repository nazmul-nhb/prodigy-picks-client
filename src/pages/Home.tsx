import { Helmet } from "react-helmet-async";
import Products from "../components/Products";

const Home = () => {
	return (
		<section className="flex justify-center items-center py-8 mx-auto px-4 w-full">
			<Helmet>
				<title>Prodigy Picks : : Eco Essentials</title>
			</Helmet>
			<Products />
		</section>
	);
};

export default Home;
