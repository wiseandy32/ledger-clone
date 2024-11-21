import { useAuth } from "@/context/auth/use-auth";
import { wallets } from "@/data";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";

function UserDashboard() {
  const { user } = useAuth();
  return (
    <>
      <div className="">
        <h1 className=" text-md md:text-4xl font-bold">
          {/* <h1 className="text-4xl font-bold border-b-2 border-solid border-sidebar-border"> */}
          Welcome, {user?.displayName}
        </h1>
        {/* <p>
          We are delighted to have you, and we hope you will have a great stay
          with us!!
        </p> */}
        <p className="md:mt-2 text-sm">
          Here&apos;s an overview of your account and the latest crypto currency
          prices.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-10 mt-3">
        {wallets.map((wallet, index) => (
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
              <p className="font-bold">$0.00</p>
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
          colorTheme="dark"
          width="100%"
        ></CryptoCurrencyMarket>
      </div>
    </>
  );
}

export default UserDashboard;
