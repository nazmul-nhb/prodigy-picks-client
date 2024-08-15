import useAuth from "../hooks/useAuth";

const Home = () => {
	const { user } = useAuth();
	return (
		<section className="flex justify-center items-center animate-bounce text-3xl font-bold my-8">
            Hello from Home!
            {user?.email}
		</section>
	);
};

export default Home;
