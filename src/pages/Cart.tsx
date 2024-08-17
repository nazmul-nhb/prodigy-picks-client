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

	console.log(cartProducts);

	return (
		<section className="my-8 mx-auto px-8">
			<Helmet>
				<title>{user?.displayName}'s Cart - Prodigy Picks</title>
			</Helmet>
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
