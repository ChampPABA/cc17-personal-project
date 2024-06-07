import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
