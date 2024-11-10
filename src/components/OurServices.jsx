import Slide from "./Slide";

function OurServices() {
  return (
    <section className="h-[750px] bg-bottom bg-no-repeat bg-[#0B1120] bottom-10 inset-0 sm:h-[140dvh]">
      <div className="inset-0 h-[100dvh] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] sm:h-[140dvh] ">
        <div className="relative max-w-5xl mx-auto pt-20 mt-[40px] px-3 sm:px-0 sm:pt-0">
          <Slide yAxis={90}>
            <h2 className="capitalize font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center text-white py-10">
              Our Services
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto text-slate-400">
              Explore a full suite of secure, user-friendly solutions for
              managing and protecting your digital assets. With QFS ledger,
              enjoy seamless transactions, robust security, and unmatched
              reliability tailored to safeguard your financial future.
            </p>
          </Slide>
          <div
            className="flex flex-wrap flex-col justify-between sm:flex-row gap-5 mt-20  sm:p-10 backdrop-blur-md"
            style={{ boxShadow: "20px 20px 20px #0B1120" }}
          >
            {[
              {
                title: "wallet security",
                subtext:
                  "Our system is developed to stop any form of cyber attacks that could result to loss of assets.",
              },
              {
                title: "Stolen & asset recovery",
                subtext:
                  "Intercept and recover stolen digital assets with help of international police.",
              },
              {
                title: "sync your wallet",
                subtext:
                  "Designed to fortify your assets with anti theft and hack security system.",
              },
              {
                title: "humanitarian project",
                subtext:
                  "Get access to funds once your humanitarian project is approved.",
              },
              {
                title: "Assets & conversion",
                subtext:
                  "A universal network that is developed to facilitate the transfer of asset-backed funds.",
              },
              {
                title: "decentralization",
                subtext:
                  "Break free from current financial system as it is built to collapse.",
              },
            ].map((item, index) => (
              <Slide
                key={item.title}
                xAxis={100}
                delay={index === 0 ? 0.2 : 0.2 * index}
                className={
                  "bg-slate-800 highlight-white/5 rounded-lg p-6 text-white sm:w-[30%] hover:bg-[#0a1120] hover:shadow-[0_35px_60px_-15px_rgba(0,0,32,0.8)] flex flex-col"
                }
              >
                <div
                // key={item.title}
                // className="bg-slate-800 highlight-white/5 rounded-lg p-6 text-white sm:w-[30%] hover:bg-[#0a1120] hover:shadow-[0_35px_60px_-15px_rgba(0,0,32,0.8)] flex flex-col"
                >
                  <div className="">
                    <i className="lni lni-thunder"></i>
                    <h5 className="text-slate-300 font-semibold text-base capitalize">
                      {item.title}
                    </h5>
                    <p className="mt-6 text-slate-300">{item.subtext}</p>
                  </div>
                  {/* <div className="p-[15px_13px_15px_17px] bg-[linear-gradient(60deg,#ceff0c_0%,#e1ff63_100%)] rounded-[50px] w-5 h-5"></div> */}
                </div>
              </Slide>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurServices;
