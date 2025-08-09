import { createBrowserRouter } from "react-router";
import { ProtectedRoutes } from "./Protected_Routes/protected-routes";
import { unprotectedRoutes } from "@/routes/unprotected_routes.tsx/unprotected-routes";

const router = createBrowserRouter([...ProtectedRoutes, ...unprotectedRoutes]);

export { router };
