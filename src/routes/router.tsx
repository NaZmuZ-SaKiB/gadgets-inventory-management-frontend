import { createBrowserRouter } from "react-router-dom";

import App from "../App.tsx";
import AddProductPage from "@/pages/AddProduct.tsx";
import AuthenticationPage from "@/pages/Auth.tsx";
import CategoryPage from "@/pages/Category.tsx";
import BrandPage from "@/pages/Brand.tsx";
import StockPage from "@/pages/Stock.tsx";
import DuplicateProduct from "@/pages/DuplicateProduct.tsx";
import SalesPage from "@/pages/Sales.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import CheckoutPage from "@/pages/Checkout.tsx";
import UserManagementPage from "@/pages/UserManagement.tsx";
import ProtectedRoute from "@/components/layouts/ProtectedRoute.tsx";
import { USER_ROLE } from "@/constants/user.constant.ts";
import ProfilePage from "@/pages/ProfilePage.tsx";
import UpdateProfilePage from "@/pages/UpdateProfilePage.tsx";
import UpdateProductPage from "@/pages/UpdateProduct.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/stock",
        element: <StockPage />,
      },
      {
        path: "/add-product",
        element: <AddProductPage />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/brand",
        element: <BrandPage />,
      },
      {
        path: "/product/:productId",
        element: <UpdateProductPage />,
      },
      {
        path: "/duplicate-product/:productId",
        element: <DuplicateProduct />,
      },
      {
        path: "/sales",
        element: <SalesPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/user-management",
        element: (
          <ProtectedRoute role={[USER_ROLE.ADMIN]}>
            <UserManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-user",
        element: (
          <ProtectedRoute role={[USER_ROLE.ADMIN, USER_ROLE.MANAGER]}>
            <AuthenticationPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "/profile/edit/:id",
        element: <UpdateProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthenticationPage />,
  },
]);

export default router;
