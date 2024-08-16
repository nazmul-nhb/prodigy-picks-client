import moment from "moment";
import React from "react";

interface Product {
	_id: string;
	title: string;
	image: string;
	description: string;
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
	return (
		<div>
			<h2>{product.title}</h2>
			<img src={product.image} alt={product.title} />
			<p>{product.description}</p>
			<p>Price: ${product.price}</p>
			<p>Brand: {product.brand}</p>
			<p>Category: {product.category}</p>
			<p>Ratings: {product.ratings}</p>
			<p>
				Created At:{" "}
				{moment(product.createdAt).format("MMMM DD, YYYY [at] hh:mm A")}
			</p>
		</div>
	);
};

export default ProductCard;
