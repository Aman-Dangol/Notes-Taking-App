import App from "@/App";
import { Home } from "@/Pages/Home/Home";
import type { RouteObject } from "react-router";

const ProtectedRoutes: RouteObject[] = [
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: Home,
      },
    ],
  },
];

export { ProtectedRoutes };
