import { depositMethods } from "@/data";
import { useNavigate } from "react-router-dom";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";

function Deposit() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">
          {/* <h1 className="text-4xl font-bold border-b-2 border-solid border-sidebar-border"> */}
          Fund your Account
        </h1>
        <p className="md:mt-2 text-sm">Pick your preferred payment method</p>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-10 mt-3">
        {depositMethods.map((wallet, index) => (
          <div
            key={wallet.name}
            className={`md:col-start-[${index + 1}] md:col-end-[${
              index + 3
            }] cursor-pointer bg-muted/50 flex gap-6 min-w-[200px] items-center  p-4 rounded-sm shadow-[0_.5rem_1rem_rgba(255,_255,_255,_0.15)]"
            `}
            onClick={() => navigate(wallet.path)}
          >
            <div className="h-10 w-10 grid place-content-center">
              <img src={wallet.icon} className="w-full h-full" alt="" />
            </div>
            <span className="uppercase">{wallet.name}</span>
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

export default Deposit;
