import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import AuthProvider from "../context/auth/AuthProvider";
import { redirect } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <AuthProvider>
          <Layout />
        </AuthProvider>
      ),
      loader: ({ request }) => {
        const user = JSON.parse(localStorage.getItem("id"));
        const destinationPath = request?.url.split("/").pop().toLowerCase();

        if (user && ["register", "login"].includes(destinationPath)) {
          return redirect("/dashboard");
        }

        return null;
      },
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login/forgot-password",
          element: <ForgotPassword />,
        },
        {
          element: <ProtectedRoutes />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
      v7_startTransition: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
