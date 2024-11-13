import { Link } from "react-router-dom";
import Slide from "./Slide";
import aboutUsImage from "@/assets/about-image-2.avif";

function AboutUs() {
  // bg-[#0f0f0f]
  return (
    <section
      className="mt-20 md:mt-20 mb-20 sm:pt-32 sm:mb-32 md:pt-20 md:mb-40 md:px-5"
      id="about"
    >
      <div className="flex flex-col-reverse justify-center lg:flex-row-reverse gap-10 md:gap-10">
        <Slide
          xAxis={-90}
          className={
            "sm:max-w-[540px] md:max-w-[720px] xl:max-w-[1140px] m-auto"
          }
        >
          <div className="flex flex-col sm:max-w-full px-5 sm:px-2 md:px-0 text-slate-50">
            <p className="text-sm mb-2 text-sky-500 capitalize">
              Manage your digital assets
            </p>
            <h2 className="md:mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-50 capitalize md:max-w-[60%] lg:max-w-full">
              {/* About QFS Ledger */}
              secure solutions for your digital assets and money
            </h2>
            <p className="mt-4 max-w-3xl space-y-6">
              {/* Holdings BRC Investment Group is one of the most transformative
              technologies since the invention of the Internet. Holdings BRC
              Investment Group stands firmly in support of financial freedom and
              the liberty that Bitcoin provides globally for anyone to
              voluntarily participate in a permissionless and decentralized
              network which empowers people to not be marginalized by
              governments and financial institutions. */}
              This is a platform where you can buy & sell all your chosen
              cryptocurrencies and digital assets at affordable prices. It is a
              platform to leverage blockchain technology.
            </p>
            <ul className="about-description-box">
              <li>
                <p>Seamless User Experience</p>
              </li>
              <li>
                <p>Secure and fast payments</p>
              </li>
              <li>
                <p>A wallet you can trust</p>
              </li>
            </ul>
            <Link
              to={"login"}
              // removed bg-slate-900
              className=" focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-[fit-content] highlight-white/20 bg-sky-500 hover:bg-sky-400"
            >
              Connect wallet
            </Link>
          </div>
        </Slide>
        <Slide
          xAxis={90}
          // delay={0.4}
          className={"lg:pr-10 rounded-md relative lg:w-[40%] md:rounded-md"}
        >
          <img src={aboutUsImage} alt="" className="w-full h-full md:rounded" />
          {/* <div
            className="overlay w-full h-full z-10"
            style={{
              position: "absolute",
              inset: "0 0 0 0",
              backgroundColor: "rgba(11, 17, 32, 0.5)",
            }}
          ></div> */}
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
    </section>
  );
}

export default AboutUs;
