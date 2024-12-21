import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
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
import { fetchUserByID } from "@/lib/helpers";
import TransactionHistoryPage from "@/pages/Transactions";

const router = createBrowserRouter(
  [
    {
      path: "/",
      loader: () => {
        const uid = localStorage.getItem("id");
        if (uid) {
          return redirect("/user");
        }

        return null;
      },
      element: <Layout />,
      errorElement: <NotFoundError />,
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
      loader: async ({ request }) => {
        const uid = localStorage.getItem("id");
        const from = "/" + request.url.split("/").slice(3).join("/");
        if (!uid) {
          return redirect("/login", { state: { from } });
        }
        const userPromise = fetchUserByID(uid);

        return { user: userPromise };
      },
      path: "/user",
      element: <DashboardLayout />,
      errorElement: <NotFoundError />,
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
              (gateway) =>
                gateway.type.toLowerCase() === params.gateway.toLowerCase()
            );

            if (!data) {
              return null;
            }

            return data;
          },
          element: <GateWay />,
        },
        {
          path: "transactions",
          element: <TransactionHistoryPage />,
        },
      ],
    },
    {
      loader: async ({ request }) => {
        const uid = localStorage.getItem("id");
        const from = "/" + request.url.split("/").slice(3).join("/");

        if (!uid) {
          return redirect("/login", { state: { from } });
        }

        const user = await fetchUserByID(uid);
        if (!user.isAdmin) {
          return redirect("/user");
        }
        return user;
      },
      path: "admin",
      element: <DashboardLayout />,
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
