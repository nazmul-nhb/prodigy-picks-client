import { createBrowserRouter, RouteObject } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";

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
		],
	},
];

export const router = createBrowserRouter(routes);
