import { Login } from "@/Pages/login";
import type { RouteObject } from "react-router";

const unprotectedRoutes: RouteObject[] = [
  {
    path: "/login",
    Component: Login,
  },
];

export { unprotectedRoutes };
