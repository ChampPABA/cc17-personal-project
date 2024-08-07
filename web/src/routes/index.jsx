import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../features/authentication/components/ProtectedRoute";
import RedirectIfLogged from "../features/authentication/components/RedirectIfLogged";
import QuotationManagement from "../pages/QuotationManagement";
import QuotationPage from "../pages/QuotationPage";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const MainContainer = lazy(() => import("../layouts/MainContainer"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainContainer />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <QuotationManagement /> },
      { path: "/profile", element: <h1>Profile</h1> },
      { path: "/user_management", element: <h1>User Management</h1> },
      {
        path: "/quotation_management",
        element: (
          <>
            <QuotationManagement />
          </>
        ),
      },
      {
        path: "/quotation/:id",
        element: <QuotationPage />,
      },
      { path: "/quotation/", element: <QuotationPage /> },
      { path: "/settings", element: <h1>Settings</h1> },
      { path: "/support", element: <h1>Support</h1> },
    ],
  },
  {
    path: "/login",
    element: (
      <RedirectIfLogged>
        <LoginPage />
      </RedirectIfLogged>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
