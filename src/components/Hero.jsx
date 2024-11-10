import { Link } from "react-router-dom";
import Slide from "./Slide";

function Hero() {
  return (
    <div className="h-[750px] bg-bottom bg-no-repeat bg-[#0B1120] bottom-10 inset-0  sm:h-[100dvh]">
      <div className="absolute inset-0 h-[100dvh] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] ">
        <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 mt-[40px] px-3 sm:px-0">
          <Slide yAxis={90}>
            <h1 className="capitalize font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center text-white py-10">
              secure your financial future with quantum financial system.
            </h1>
            <p className="mt-6 text-lg text-center max-w-3xl mx-auto text-slate-400">
              Step into a new era of financial security with QFS ledger. Manage
              your digital assets confidently with unmatched stability and
              defense against cyber threats
            </p>
          </Slide>
          <Slide delay={0.4} yAxis={90}>
            <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-2 sm:justify-center sm:space-x-6 text-sm sm:w-[50%] m-auto">
              <Link
                className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto bg-sky-500 highlight-white/20 hover:bg-sky-400"
                to="register"
              >
                Get started
              </Link>
              <Link
                className="  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto border-solid border-2 highlight-white/20 border-sky-500 hover:bg-sky-400"
                to="Login"
              >
                Login
              </Link>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
}

export default Hero;
