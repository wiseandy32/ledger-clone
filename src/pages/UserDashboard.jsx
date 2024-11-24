import { useAuth } from "@/context/auth/use-auth";
import { useTheme } from "@/context/theme-provider";
import { wallets } from "@/data";
import { db } from "@/services/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";

function UserDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [dashboardWallets, setDashboardWallets] = useState(wallets);

  useEffect(() => {
    const getLatestChanges = onSnapshot(
      doc(db, "users", user?.docRef),
      (doc) => {
        // TODO: merge with existing data.
        const data = doc.data();
        console.log(data);
        // const currentDocs = [];
        // doc.forEach((d) => currentDocs.push(d.data()));
        // setDocs(currentDocs);
      }
    );
    return () => getLatestChanges();
  }, [user?.docRef]);

  return (
    <>
      <div className="">
        <h1 className="text-2xl md:text-4xl font-bold">
          Welcome, {user?.name}
        </h1>
        <p className="md:mt-2 text-sm">
          Here&apos;s an overview of your account and the latest crypto currency
          prices.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-10 mt-3">
        {dashboardWallets.map((wallet, index) => (
          <div
            key={wallet.name}
            className={`md:col-start-[${index + 1}] md:col-end-[${
              index + 3
            }] bg-muted/50 flex gap-6 min-w-[200px] items-center  p-4 rounded-sm shadow-[0_.5rem_1rem_rgba(255,_255,_255,_0.15)]"
          `}
          >
            <div
              className={`h-10 w-10 grid place-content-center ${
                wallet.name.includes("Ledger") ? "bg-purple-700" : ""
              }`}
            >
              {!wallet.name.includes("Ledger") ? (
                <img src={wallet.icon} className="w-full h-full" alt="" />
              ) : (
                <wallet.icon />
              )}
            </div>
            <div>
              <p className="font-bold">{user?.ledger_balance || "$0.00"}</p>
              <p>
                {wallet.name}{" "}
                {!wallet.name.includes("Withdrawal") ? "Balance" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        <CryptoCurrencyMarket
          colorTheme={theme}
          width="100%"
        ></CryptoCurrencyMarket>
      </div>
    </>
  );
}

export default UserDashboard;
