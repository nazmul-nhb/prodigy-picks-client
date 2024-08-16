import moment from "moment";
import React from "react";
import { MdFavoriteBorder, MdOutlineInfo } from "react-icons/md";
import { Link } from "react-router-dom";

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
	const { _id, title, image, price, brand, category, ratings, createdAt } = product;

	return (
		<Link to={`/product/${_id}`} className="block group">
			<div className="flex flex-col items-center gap-4 p-2 bg-white border rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform group-hover:-translate-y-1 hover:shadow-2xl">
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
					<button
						onClick={(e) => e.preventDefault()} // Prevents navigating away when clicking the button
						className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-red-500 rounded-lg transition duration-300 ease-in-out hover:bg-red-600"
					>
						<MdFavoriteBorder />
						Add to Wishlist
					</button>
					<Link
						to={`/product/${_id}`}
						className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
					>
						<MdOutlineInfo />
						Details
					</Link>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
