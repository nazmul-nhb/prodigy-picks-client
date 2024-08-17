import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import useGetCart from "../hooks/useGetCart";
import useAuth from "../hooks/useAuth";

const Cart = () => {
	const { user } = useAuth();
	const { cartItems, totalPrice, totalProducts } = useGetCart();

	const cartProducts = cartItems.map((cartItem) => {
		const { _id, products, quantity } = cartItem;
		return { ...products, quantity, cartId: _id };
	});

	return (
		<section className="py-8 mx-auto px-8">
			<Helmet>
				<title>{user?.displayName}'s Cart - Prodigy Picks</title>
			</Helmet>
			<h3 className="text-2xl md:text3xl lg:text-4xl font-bold mb-4 hover:text-blue-600 transition-colors duration-300 text-center">
				{totalProducts} Items in Cart worth ${totalPrice}
			</h3>
			<div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{cartProducts?.map((product) => (
					<ProductCard
						key={product._id}
						product={product}
						fromCart={true}
					/>
				))}
			</div>
		</section>
	);
};

export default Cart;
