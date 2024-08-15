import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { AuthContextType } from "../providers/AuthProvider";
import { Location, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const location: Location = useLocation();
	const { user, userLoading }: AuthContextType = useAuth();

	if (userLoading) {
		return <div>Loading...</div>;
	}

	if (user) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
