import { createBrowserRouter, RouteObject } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import Cart from "../pages/Cart";

// define route object type
const routes: RouteObject[] = [
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: (
					<PrivateRoute>
						{" "}
						<Home />
					</PrivateRoute>
				),
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
];

export const router = createBrowserRouter(routes);
