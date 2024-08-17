import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdInfo, MdSupport } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";

const Footer = () => {
	return (
		<footer className="bg-prodigy-secondary text-white py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center md:flex-row md:justify-between">
					{/* Footer Title and Subtitle */}
					<div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
						<h2 className="text-2xl font-bold mb-2">
							Prodigy Picks
						</h2>
						<p className="text-lg font-semibold">Eco Essentials</p>
					</div>

					{/* Footer Links */}
					<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
						<div className="flex flex-col items-center md:items-start">
							<h3 className="text-lg font-semibold mb-2 flex items-center">
								<MdInfo className="mr-2" />
								Company
							</h3>
							<a
								href="#"
								className="text-prodigyBG hover:text-white transition duration-300 ease-in-out flex items-center"
							>
								<MdInfo className="mr-2 transition-transform duration-300 ease-in-out transform hover:scale-110" />
								About Us
							</a>
							<a
								href="#"
								className="text-prodigyBG hover:text-white transition duration-300 ease-in-out flex items-center"
							>
								<HiOutlineShoppingCart className="mr-2 transition-transform duration-300 ease-in-out transform hover:scale-110" />
								Careers
							</a>
							<a
								href="#"
								className="text-prodigyBG hover:text-white transition duration-300 ease-in-out flex items-center"
							>
								<MdSupport className="mr-2 transition-transform duration-300 ease-in-out transform hover:scale-110" />
								Contact
							</a>
						</div>
						<div className="flex flex-col items-center md:items-start">
							<h3 className="text-lg font-semibold mb-2 flex items-center">
								<MdSupport className="mr-2" />
								Customer Service
							</h3>
							<a
								href="#"
								className="text-prodigyBG hover:text-white transition duration-300 ease-in-out flex items-center"
							>
								<MdSupport className="mr-2 transition-transform duration-300 ease-in-out transform hover:scale-110" />
								FAQ
							</a>
							<a
								href="#"
								className="text-prodigyBG hover:text-white transition duration-300 ease-in-out flex items-center"
							>
								<HiOutlineShoppingCart className="mr-2 transition-transform duration-300 ease-in-out transform hover:scale-110" />
								Returns
							</a>
							<a
								href="#"
								className="text-prodigyBG hover:text-white transition duration-300 ease-in-out flex items-center"
							>
								<HiOutlineShoppingCart className="mr-2 transition-transform duration-300 ease-in-out transform hover:scale-110" />
								Shipping
							</a>
						</div>
						<div className="flex flex-col items-center md:items-start">
							<h3 className="text-lg font-semibold mb-2 flex items-center">
								<MdInfo className="mr-2" />
								Follow Us
							</h3>
							<a
								href="#"
								className="text-prodigyBG hover:text-white transition duration-300 ease-in-out flex items-center"
							>
								<FaFacebookF className="mr-2 transition-transform duration-300 ease-in-out transform hover:scale-110" />
								Facebook
							</a>
							<a
								href="#"
								className="text-prodigyBG hover:text-white transition duration-300 ease-in-out flex items-center"
							>
								<FaInstagram className="mr-2 transition-transform duration-300 ease-in-out transform hover:scale-110" />
								Instagram
							</a>
							<a
								href="#"
								className="text-prodigyBG hover:text-white transition duration-300 ease-in-out flex items-center"
							>
								<FaTwitter className="mr-2 transition-transform duration-300 ease-in-out transform hover:scale-110" />
								Twitter
							</a>
						</div>
					</div>
				</div>
				<div className="mt-8 text-center text-sm text-prodigyBG">
					<p>
						&copy; {new Date().getFullYear()} Prodigy Picks. All
						rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
