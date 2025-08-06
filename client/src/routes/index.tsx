import { createBrowserRouter } from "react-router";
import { ProtectedRoutes } from "./Protected_Routes/protected-routes";

const router = createBrowserRouter([...ProtectedRoutes]);

export { router };
