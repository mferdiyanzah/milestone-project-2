import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard.layout";
import Register from "../pages/register";
import GeneralLayout from "../layouts/general.layout";
import Cart from "../pages/cart";
import Login from "../pages/login";
import NotFound from "../pages/not-found";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/cart",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/auth",
    element: <GeneralLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
