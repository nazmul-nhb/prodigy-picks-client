import "./index.css";
import "animate.css";
import { StrictMode } from "react";
import { router } from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				 <HelmetProvider>
				<RouterProvider router={router} />
					<Toaster />
				</HelmetProvider>
			</QueryClientProvider>
		</AuthProvider>
	</StrictMode>
);
