import type { RouteObject } from "react-router";
import App from "../../App";

const ProtectedRoutes: RouteObject[] = [
  {
    path: "/",
    Component: App,
  },
];

export { ProtectedRoutes };
