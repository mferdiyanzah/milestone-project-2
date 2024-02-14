import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard.layout";
import Register from "../pages/register";
import GeneralLayout from "../layouts/general.layout";
import MainDashboard from "../pages/main-dashboard";
import Login from "../pages/login";
import NotFound from "../pages/not-found";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <MainDashboard />,
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
