import React from "react";
import { Helmet } from "react-helmet-async";
import {
	FaCheckCircle,
	FaEnvelope,
	FaUserShield,
	FaSearch,
	FaFilter,
	FaSortAmountDown,
} from "react-icons/fa";

const About: React.FC = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<Helmet>
				<title>About - Prodigy Picks</title>
			</Helmet>
			<h3 className="text-2xl md:text-3xl font-bold mb-4 hover:text-blue-600 transition-all duration-300 text-center">
				About Us
			</h3>
			<p className="text-lg mb-4">
				Welcome to our full-stack product management application. This
				platform allows users to browse, search, and filter a wide range
				of products efficiently. Our goal is to provide an intuitive and
				user-friendly experience for managing products and discovering
				new items.
			</p>
			<h2 className="text-2xl font-semibold mb-2 flex items-center space-x-2">
				<FaUserShield className="text-blue-500 text-xl transition-transform duration-300 transform hover:scale-110" />
				<span>Our Mission</span>
			</h2>
			<p className="text-lg mb-4">
				Our mission is to streamline the process of product management
				and provide a comprehensive tool for users to easily find and
				manage their products. We strive to deliver a high-quality
				experience through effective search, filtering, and sorting
				functionalities.
			</p>
			<h2 className="text-2xl font-semibold mb-2 flex items-center space-x-2">
				<FaCheckCircle className="text-green-500 text-xl transition-transform duration-300 transform hover:scale-110" />
				<span>Features</span>
			</h2>
			<ul className="list-disc list-inside mb-4">
				<li className="flex items-center space-x-2 mb-2">
					<FaSearch className="text-blue-500 transition-transform duration-300 transform hover:scale-110" />
					<span>
						Efficient pagination for faster loading of products
					</span>
				</li>
				<li className="flex items-center space-x-2 mb-2">
					<FaFilter className="text-blue-500 transition-transform duration-300 transform hover:scale-110" />
					<span>
						Robust search functionality for quick product discovery
					</span>
				</li>
				<li className="flex items-center space-x-2 mb-2">
					<FaCheckCircle className="text-blue-500 transition-transform duration-300 transform hover:scale-110" />
					<span>
						Advanced filtering options including brand, category,
						and price range
					</span>
				</li>
				<li className="flex items-center space-x-2 mb-2">
					<FaSortAmountDown className="text-blue-500 transition-transform duration-300 transform hover:scale-110" />
					<span>Sorting capabilities by price and date added</span>
				</li>
				<li className="flex items-center space-x-2 mb-2">
					<FaUserShield className="text-blue-500 transition-transform duration-300 transform hover:scale-110" />
					<span>
						Secure authentication with Google and Email/Password
					</span>
				</li>
			</ul>
			<h2 className="text-2xl font-semibold mb-2 flex items-center space-x-2">
				<FaEnvelope className="text-blue-500 text-xl transition-transform duration-300 transform hover:scale-110" />
				<span>Contact Us</span>
			</h2>
			<p className="text-lg mb-4">
				For any inquiries or feedback, please feel free to reach out to
				us at
				<a
					href="mailto:nazmulnhb@gmail.com"
					className="text-blue-500 hover:border-b hover:border-prodigy-primary hover:text-prodigy-primary transition-all duration-300 ml-2"
				>
					nazmulnhb@gmail.com
				</a>
				.
			</p>
		</div>
	);
};

export default About;
