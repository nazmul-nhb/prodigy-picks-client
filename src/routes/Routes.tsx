import { createBrowserRouter, RouteObject } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";

// define route object type
const routes: RouteObject[] = [
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
];

export const router = createBrowserRouter(routes);
