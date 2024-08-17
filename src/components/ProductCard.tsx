import React, { useState } from "react";
import { MdOutlineInfo } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon
import moment from "moment";
import { IoIosCloseCircle } from "react-icons/io";

interface Product {
	_id: string;
	title: string;
	image: string;
	price: number;
	brand: string;
	category: string;
	ratings: number;
	createdAt: Date;
}

interface ProductProps {
	product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
		document.body.classList.add("modal-open");
	};

	const handleCloseModal = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsModalOpen(false);
			setIsClosing(false);
			document.body.classList.remove("modal-open");
		}, 300);
	};

	const { _id, title, image, price, brand, category, ratings, createdAt } =
		product;

	return (
		<div>
			<div className="group flex flex-col items-center gap-4 p-2 bg-white border rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
				{/* Image */}
				<div className="w-64 h-64 overflow-hidden rounded-lg">
					<img
						src={image}
						alt={title}
						className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
					/>
				</div>
				{/* Product Info */}
				<div className="flex flex-col items-center text-center">
					<h3 className="text-lg font-semibold text-gray-800 group-hover:text-nexus-primary">
						{title}
					</h3>
					<p className="text-sm text-gray-600">Price: ${price}</p>
					<p className="text-sm text-gray-600">Brand: {brand}</p>
					<p className="text-sm text-gray-600">
						Category: {category}
					</p>
					<p className="text-sm text-gray-600">
						Ratings: ⭐ {ratings}
					</p>
					<p className="text-xs text-gray-500">
						Added on:{" "}
						{moment(createdAt).format("MMMM DD, YYYY [at] hh:mm A")}
					</p>
				</div>
				{/* Buttons */}
				<div className="flex gap-2 mt-4">
					<button className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-red-500 rounded-lg transition duration-300 ease-in-out hover:bg-red-600">
						<TiShoppingCart />
						Add to Cart
					</button>
					<button
						onClick={handleOpenModal}
						className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
					>
						<MdOutlineInfo />
						Details
					</button>
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<>
					<div
						className="modal-background"
						onClick={handleCloseModal}
					></div>
					<div
						className={
							isClosing
								? "modal-content-container zoom-out scrollbar-custom scrollbar-thin"
								: "modal-content-container scrollbar-custom scrollbar-thin"
						}
					>
						<div
							className={
								isClosing
									? "modal-content modal-content-close"
									: "modal-content"
							}
						>
							{/* Close Button */}
							<IoIosCloseCircle
								onClick={handleCloseModal}
								className="absolute top-1 right-1 text-2xl md:text-3xl bg-white rounded-full text-red-700 hover:text-nhb hover:scale-110 transition-all duration-500 cursor-pointer"
								title="Close"
							/>
							{/* Modal Content */}
							<div className="p-4">
								<h2 className="text-2xl font-semibold">
									{title}
								</h2>
								<img
									src={image}
									alt={title}
									className="w-full h-auto mt-4 rounded-md"
								/>
								<p className="mt-4">Brand: {brand}</p>
								<p>Category: {category}</p>
								<p>Price: ${price}</p>
								<p>Ratings: ⭐ {ratings}</p>
								<p className="text-xs text-gray-500 mt-2">
									Added on:{" "}
									{moment(createdAt).format(
										"MMMM DD, YYYY [at] hh:mm A"
									)}
								</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ProductCard;
