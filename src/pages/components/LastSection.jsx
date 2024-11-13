import { Link } from "react-router-dom";
import Slide from "./Slide";
import handHoldingCreditCardMockup from "../../assets/hand-holding-credit-card.webp";

function LastSection() {
  return (
    <section className="pt-20 mb-20 sm:pt-32 sm:mb-32 md:pt-40 md:mb-40 sm:px-10">
      <div className="sm:mt-0 flex flex-col-reverse sm:flex-row justify-between gap-16 sm:gap-0">
        <div className="flex flex-col gap-y-4 sm:gap-y-10 sm:max-w-[50%] px-5">
          <Slide xAxis={-90}>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-50 capitalize">
              your financial freedom begins here
            </h2>
            <p className="mt-4 max-w-3xl space-y-6 ">
              The history of money is entering a new era, You might just wake up
              with no money. We might just wake up one day with no money.
              Convert all paper money into a digitally gold backed currency.
            </p>
          </Slide>
          <Slide yAxis={90} delay={0.4}>
            <Link
              className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center bg-sky-500 highlight-white/20 hover:bg-sky-400 sm:w-[fit-content]"
              to="register"
            >
              Get started
            </Link>
          </Slide>
        </div>
        <Slide xAxis={90} delay={0.3} className="sm:w-[40%] h-[402px]">
          <img
            src={handHoldingCreditCardMockup}
            className="w-full h-full object-contain"
            alt=""
          />
        </Slide>
      </div>
    </section>
  );
}

export default LastSection;
