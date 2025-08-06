import App from "@/App";
import type { RouteObject } from "react-router";

const ProtectedRoutes: RouteObject[] = [
  {
    path: "/",
    Component: App,
  },
];

export { ProtectedRoutes };
