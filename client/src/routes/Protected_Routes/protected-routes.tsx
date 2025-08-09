import App from "@/App";
import { Home } from "@/Pages/Home";
import type { RouteObject } from "react-router";

const ProtectedRoutes: RouteObject[] = [
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "home",
        Component: Home,
      },
    ],
  },
];

export { ProtectedRoutes };
