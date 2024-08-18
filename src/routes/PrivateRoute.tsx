import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Location, Navigate, useLocation } from "react-router-dom";
import { MainLoader } from "../components/Loaders";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const location: Location = useLocation();
	const { user, userLoading } = useAuth();

	if (userLoading) {
		return MainLoader;
	}
	
	if (user) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
