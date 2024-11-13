import { Link } from "react-router-dom";
import Slide from "./Slide";
import bgVideo from "../../assets/ad.mp4";

function Hero() {
  return (
    <section
      className="relative pb-[17rem] mb:pb-[7rem]"
      // className="h-[750px] bg-bottom bg-no-repeat bg-[#0B1120] bottom-10 inset-0  sm:h-[100dvh] relative"
    >
      {/* <div className="absolute inset-0 h-[100dvh] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] "> */}
      <div
        id="overlay"
        // className="absolute top-[0] left-[0] right-[0] bottom-[0] z-10 cursor-pointer bg-[rgba(0,0,0,0.3)]"
        // style={{ top: 0, bottom: 0, left: 0, right: 0 }}
      ></div>
      <div
        className="fullscreen-bg"
        // style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <video
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          className="fullscreen-bg__video max-w-[inherit]"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      </div>
      <div className="sm:max-w-[540px] md:max-w-[720px] xl:max-w-[1140px] m-auto relative max-w-5xl mx-auto pt-5 md:pt-20 sm:pt-24 lg:pt-32 mt-[40px] px-3 sm:px-0">
        <Slide yAxis={90}>
          <h1 className="h mt-[40px] md:mt-0 py-5 pt-10 md:pt-0 capitalize font-extrabold text-3xl md:text-4xl sm:text-5xl lg:text-6xl tracking-tight text-left md:text-center text-white md:py-10">
            secure your financial future with quantum financial system.
          </h1>
          {/* removed p */}
          <p className="mt-[40px] md:mt-6 md:text-lg text-left md:text-center max-w-3xl text-sm mx-auto text-white">
            qfswrdledger Ledger stands as the world&apos;s most secure ledger
            and a decentralized digital banking system. It&apos;s specially
            crafted by the Quantum Financial System in collaboration with
            Nesara/Gesara, introducing a revolutionary banking system with
            robustly backed digital assets to ensure the safety of your
            finances. It&apos;s simple, seamless, and secure, equipped to manage
            your ISO20022 coins (XRP/XLM) and various other crypto assets like
            Bitcoin, USDT, Ethereum, Dogecoin, Litecoin, TRX, etc., guarding
            against crashes and cyberattacks.
          </p>
        </Slide>
        <Slide
          delay={0.4}
          yAxis={90}
          className="w-[92%] absolute z-[100] bottom-[-10rem] md:bottom-[-7rem] mt-10 md:mt-6 sm:mt-10 flex flex-col md:flex-row gap-2 sm:justify-center sm:space-x-6 text-sm sm:w-[100%] m-auto"
        >
          <Link
            className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto highlight-white/20 bg-sky-500 hover:bg-sky-400 md:w-[30%]"
            to="register"
          >
            Get started
          </Link>
          <Link
            className="  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto border-solid border-2 highlight-white/20 border-sky-500 hover:bg-sky-400 md:w-[30%]"
            to="Login"
          >
            Login
          </Link>
        </Slide>
      </div>
      {/* </div> */}
    </section>
  );
}

export default Hero;
