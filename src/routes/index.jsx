import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthProvider from "../context/auth/AuthProvider";
import { redirect } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import NotFoundError from "@/pages/NotFound";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import UserProfile from "@/pages/UserProfile";
import UserDashboard from "@/pages/UserDashboard";
import Deposit from "@/pages/Deposit";
import Withdrawal from "@/pages/Withdrawal";
import GateWay from "@/pages/GateWay";
import { paymentGateways } from "@/data";
import DepositRequestsList from "@/pages/DepositRequestsList";
import WithdrawalRequestsList from "@/pages/WithdrawalRequestsList";
import UsersList from "@/pages/UsersList";

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <NotFoundError />,
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
      ],
    },
    {
      path: "user",
      errorElement: <NotFoundError />,
      element: (
        <AuthProvider>
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        </AuthProvider>
      ),
      children: [
        {
          index: true,
          element: <UserDashboard />,
        },
        {
          path: "profile",
          element: <UserProfile />,
        },
        {
          path: "deposit",
          element: <Deposit />,
        },
        {
          path: "withdraw",
          element: <Withdrawal />,
        },
        {
          path: "deposit/:gateway",
          loader: ({ params }) => {
            const [data] = paymentGateways.filter(
              (gateway) => gateway.type === params.gateway
            );

            if (!data) {
              return null;
            }

            return data;
          },
          element: <GateWay />,
        },
      ],
    },
    {
      path: "admin",
      errorElement: <NotFoundError />,
      element: (
        <AuthProvider>
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        </AuthProvider>
      ),
      children: [
        {
          index: true,
          element: <UsersList />,
        },
        {
          path: "Deposits",
          element: <DepositRequestsList />,
        },
        {
          path: "withdrawals",
          element: <WithdrawalRequestsList />,
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
