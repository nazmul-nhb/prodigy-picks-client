import React, { useState } from "react";
import moment from "moment";
import { MdMoreTime, MdOutlineInfo } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosCloseCircle } from "react-icons/io";
import ProductDetails from "./ProductDetails";
import { BiCategoryAlt } from "react-icons/bi";
import { SlBadge } from "react-icons/sl";
import useAuth from "../hooks/useAuth";
import useAddToCart from "../hooks/useAddToCart";
import useGetCart from "../hooks/useGetCart";
import { HiOutlineTrash } from "react-icons/hi2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { RiStarSFill } from "react-icons/ri";

interface Product {
	_id: string;
	cartId?: string;
	title: string;
	image: string;
	price: number;
	brand: string;
	category: string;
	ratings: number;
	quantity?: number;
	createdAt: Date;
}

interface ProductProps {
	product: Product;
	fromCart?: boolean;
}

const ProductCard: React.FC<ProductProps> = ({ product, fromCart }) => {
	const { user } = useAuth();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const { refetchCart } = useGetCart();
	const { addToCart } = useAddToCart();
	const axiosSecure = useAxiosSecure();

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

	const {
		_id,
		title,
		image,
		price,
		brand,
		category,
		quantity,
		ratings,
		createdAt,
		cartId,
	} = product;

	// function to add item to cart
	const handleAddToCart = (id: string) => {
		const cartItem = {
			userEmail: user?.email as string,
			products: id,
			quantity: 1,
		};
		addToCart(cartItem, refetchCart);
	};

	// function to remove items from cart
	const handleRemoveFromCart = (id: string, title: string) => {
		Swal.fire({
			title: "Are You Sure?",
			text: `Remove "${title}" from Your Cart?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ff0000",
			cancelButtonColor: "#2a7947",
			confirmButtonText: "Yes, Remove It!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosSecure
					.delete(`/carts/${id}?email=${user?.email}`)
					.then((res) => {
						if (res.data?.success) {
							refetchCart();
							Swal.fire({
								title: "Removed!",
								text: `"${title}" Removed from Your Cart!`,
								icon: "success",
							});
							toast.success(`Item Removed from YOur Cart!`);
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		});
	};

	return (
		<div className="w-full">
			<div title={title} className="group flex flex-col items-center gap-4 p-4 bg-white border rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
				{/* Image */}
				<div className="relative">
					<div className="w-full aspect-square overflow-hidden rounded-lg">
						<img
							src={image}
							alt={title}
							className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105"
						/>
						<div className="flex justify-between w-full text-xl font-bold z-20 absolute bottom-0 px-3 bg-[#294f736c] text-white rounded-b-lg">
							<div className="absolute inset-0 backdrop-filter backdrop-blur-sm -z-10 rounded-b-lg"></div>
							<p>${price}</p>
							<p className="flex items-center">
								<RiStarSFill /> {ratings}
							</p>
						</div>
					</div>
				</div>
				{/* Product Info */}
				<div className="flex flex-col gap-2 w-full">
					<div className="flex justify-between items-center font-semibold">
						<p className="text-gray-600 flex items-center gap-1">
							<SlBadge /> {brand}
						</p>
						<p className="text-gray-600 flex items-center gap-1">
							<BiCategoryAlt /> {category}
						</p>
					</div>
					<h3
						title={title}
						className="line-clamp-1 text-xl font-bold text-gray-800 group-hover:text-prodigy-primary"
					>
						{fromCart && <sup>({quantity}x)</sup>}
						{title}
					</h3>
					<p className="text-sm text-gray-500 flex items-center gap-1">
						<MdMoreTime />
						{moment(createdAt).format("MMMM DD, YYYY [at] hh:mm A")}
					</p>
				</div>
				{/* Buttons */}
				<div className="flex gap-2 justify-between mt-2 w-full">
					{fromCart ? (
						<button
							onClick={() =>
								handleRemoveFromCart(cartId as string, title)
							}
							className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-red-500 rounded-lg transition duration-500 ease-in-out hover:bg-red-700 font-semibold"
						>
							<HiOutlineTrash />
							Remove from Cart
						</button>
					) : (
						<button
							onClick={() => handleAddToCart(_id)}
							className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-red-500 rounded-lg transition duration-500 ease-in-out hover:bg-red-700 font-semibold"
						>
							<TiShoppingCart />
							Add to Cart
						</button>
					)}
					<button
						onClick={handleOpenModal}
						className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg transition duration-500 ease-in-out hover:bg-blue-700 font-semibold"
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
								? "modal-content-container md:w-4/5 w-[96%] zoom-out scrollbar-custom scrollbar-thin"
								: "modal-content-container md:w-4/5 w-[96%] scrollbar-custom scrollbar-thin"
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
							<ProductDetails id={_id} />
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ProductCard;
