import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import moment from "moment";
import { FaTag } from "react-icons/fa6";
import { MdStar } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { SlBadge } from "react-icons/sl";
import { BiCategoryAlt } from "react-icons/bi";
import { MainLoader } from "./Loaders";

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

	if (isLoading) return MainLoader;

	return (
		<div className="col-span-5 flex flex-col gap-4 border px-3 py-4">
			{/* Title */}
			<h2 className="font-kreonSerif text-xl md:text-2xl lg:text-3xl text-prodigy-primary">
				{title}
			</h2>
			<div className="flex flex-col md:flex-row gap-4 w-full">
				{/* Image */}
				<img
					src={image}
					alt={title}
					className="md:w-1/2 w-full object-cover border p-1"
				/>
				<div className="md:w-1/2 w-full flex flex-col gap-4 justify-between items-start">
					{/* Product Details */}
					<div className="flex flex-col items-start gap-2 text-gray-700">
						<div className="flex items-center gap-2">
							<SlBadge className="text-prodigy-primary" />
							<p className="font-semibold">Brand: {brand}</p>
						</div>
						<div className="flex items-center gap-2">
							<BiCategoryAlt className="text-prodigy-primary" />
							<p className="font-semibold">
								Category: {category}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<FaTag className="text-prodigy-primary" />
							<p className="font-semibold">Price: ${price}</p>
						</div>
						<div className="flex items-center gap-2">
							<MdStar className="text-prodigy-primary" />
							<p className="font-semibold">
								Ratings: ⭐ {ratings}
							</p>
						</div>
						<div className="flex items-center gap-2 text-gray-500">
							<FaCalendarAlt className="text-gray-500" />
							<p className="text-sm">
								Added on:{" "}
								{moment(createdAt).format(
									"MMMM DD, YYYY [at] hh:mm A"
								)}
							</p>
						</div>
					</div>
					<button className="px-6 py-2 bg-prodigy-primary text-white font-semibold rounded-lg shadow-md hover:bg-prodigy-secondary transition-colors duration-300">
						Order Now
					</button>
				</div>
			</div>
			<hr className="mt-4" />
			{/* Description */}
			<p className="whitespace-pre-wrap text-justify">
				<b className="text-prodigy-primary">Details:</b>
				<br />
				{description}
			</p>
		</div>
	);
};

export default ProductDetails;
