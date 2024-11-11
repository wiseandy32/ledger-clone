import { Link } from "react-router-dom";
import Slide from "./Slide";
import aboutUsImage from "../assets/about-us-image.png";

function AboutUs() {
  return (
    <div className="pt-20 mb-20 sm:pt-32 sm:mb-32 md:pt-40 md:mb-40">
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-32 sm:gap-0">
        <Slide xAxis={-90} className={"sm:max-w-[50%]"}>
          <div className="flex flex-col gap-y-10 sm:max-w-full px-5 sm:px-10 ">
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-50 capitalize">
              About QFS Ledger
            </h2>
            <p className="mt-4 max-w-3xl space-y-6 ">
              Holdings BRC Investment Group is one of the most transformative
              technologies since the invention of the Internet. Holdings BRC
              Investment Group stands firmly in support of financial freedom and
              the liberty that Bitcoin provides globally for anyone to
              voluntarily participate in a permissionless and decentralized
              network which empowers people to not be marginalized by
              governments and financial institutions.
            </p>
            <Link
              to={"about"}
              className="bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-[fit-content] border-solid border-2 border-sky-500 highlight-white/20 hover:bg-sky-400"
            >
              Learn more
            </Link>
          </div>
        </Slide>
        <Slide xAxis={90} delay={0.4} className={"sm:pr-10"}>
          {/* <div> */}
          <img src={aboutUsImage} alt="" />
          {/* </div> */}
        </Slide>
      </div>
      {/* <div className="flex flex-wrap flex-col justify-between sm:flex-row gap-5 mt-20">
        {[
          {
            title: "ONLINE Wallets",
            subtext:
              "Best for security because it comes with the strongest security features and track record of any crypto online wallet.",
          },
          {
            title: "Multi Currency Support",
            subtext:
              "Multi-currency support means that shoppers can pay for your products or services using the currency.",
          },
          {
            title: "24/7 Live Support",
            subtext:
              "When you need help, our team of experts will work with you via our 24/7 live chat to reach a quick and efficient.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="col-md-4 boxes  bg-slate-800 highlight-white/5 rounded-lg p-6 text-white sm:w-[30%]"
          >
            <div className="">
              <i className="lni lni-thunder"></i>
              <h5 className="text-slate-300 font-semibold text-base">
                {item.title}
              </h5>
              <p className="mt-6 text-slate-300">{item.subtext}</p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default AboutUs;
