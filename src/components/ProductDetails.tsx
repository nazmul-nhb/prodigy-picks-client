import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import moment from "moment";

const ProductDetails = ({ id }: { id: string }) => {
	const axiosSecure = useAxiosSecure();

	// get a single product by the id
	const { data: product = {}, isLoading } = useQuery({
		queryKey: ["product"],
		queryFn: async () => {
			const res = await axiosSecure.get(`/products/single/${id}`);
			return res.data.product;
		},
    });
    
	const {
		title,
		image,
		price,
		description,
		brand,
		category,
		ratings,
		createdAt,
	} = product;

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="p-4">
			<h2 className="text-2xl font-semibold">{title}</h2>
			<img
				src={image}
				alt={title}
				className="w-full h-auto mt-4 rounded-md"
			/>
			<p>{description}</p>
			<p className="mt-4">Brand: {brand}</p>
			<p>Category: {category}</p>
			<p>Price: ${price}</p>
			<p>Ratings: ⭐ {ratings}</p>
			<p className="text-xs text-gray-500 mt-2">
				Added on:{" "}
				{moment(createdAt).format("MMMM DD, YYYY [at] hh:mm A")}
			</p>
		</div>
	);
};

export default ProductDetails;
