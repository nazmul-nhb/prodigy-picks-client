import { useEffect } from "react";
import SocialLogin from "../components/SocialLogin";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	useEffect(() => {
		if (user) {
			navigate(from, { replace: true });
		}
	}, [from, navigate, user]);

	return (
		<section>
			<SocialLogin />
		</section>
	);
};

export default Login;
