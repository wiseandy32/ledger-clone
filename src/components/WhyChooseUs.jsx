import Slide from "./Slide";
import creditCardMockup from "../assets/credit-card-mockup.png";

function WhyChooseUs() {
  return (
    <section className="pt-20 mb-20 sm:pt-32 sm:mb-32 md:pt-40 md:mb-40 sm:px-10">
      <div className="mt-[100vh] sm:mt-0 flex flex-col-reverse sm:flex-row justify-between gap-16 sm:gap-0">
        <div className="flex flex-col gap-y-4 sm:gap-y-10 sm:max-w-[50%] px-5">
          <Slide yAxis={90}>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-50 capitalize">
              Why choose us
            </h2>
            <p className="mt-4 max-w-3xl space-y-6 ">
              Choose QFS Ledger for cutting-edge security, seamless assets
              management, and peace of mind. Our commitment to stability and
              protection ensures your digital assets are safe and accessible
              whenever you need them
            </p>
          </Slide>
          <div className="flex flex-wrap flex-col justify-between sm:flex-row gap-5 mt-20 backdrop-blur-md">
            {[
              {
                title: "protection",
                subtext:
                  "Get your assets secured on our ledger ee3 security system.",
              },
              {
                title: "innovation",
                subtext:
                  "QFS is equipped with Web 3 Technology to mitigate any form of centralization.",
              },
              {
                title: "decentralization",
                subtext:
                  "Break free from current financial system as it is built to collapse.",
              },
              {
                title: "secured system",
                subtext:
                  "QFS is encrypted with 256bits and our servers are fortified against any form of attack.",
              },
            ].map((item, index) => (
              <Slide
                key={item.title}
                yAxis={90}
                delay={index === 0 ? 0.2 : 0.2 * index}
                className={
                  "bg-slate-800 highlight-white/5 rounded-lg p-6 text-white sm:w-[45%] hover:bg-[#0a1120] hover:shadow-[0_35px_60px_-15px_rgba(0,0,32,0.8)] flex flex-col"
                }
              >
                <div className="">
                  <i className="lni lni-thunder"></i>
                  <h5 className="text-slate-300 font-semibold text-base capitalize">
                    {item.title}
                  </h5>
                  <p className="mt-6 text-slate-300">{item.subtext}</p>
                </div>
                {/* <div className="p-[15px_13px_15px_17px] bg-[linear-gradient(60deg,#ceff0c_0%,#e1ff63_100%)] rounded-[50px] w-5 h-5"></div> */}
              </Slide>
            ))}
          </div>
        </div>
        <Slide xAxis={100} className={"sm:w-[40%] h-[304px] sm:h-[670px]"}>
          <img src={creditCardMockup} className="w-full h-full" alt="" />
          {/* <img src="credit-card-mockup.png" alt="" /> */}
        </Slide>
      </div>
    </section>
  );
}

export default WhyChooseUs;
