import Slide from "./Slide";

function HowItWorks() {
  return (
    <section className="h-[155dvh] bg-bottom bg-no-repeat bg-[#0B1120] bottom-10 inset-0 sm:h-[100dvh]">
      <div className="inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] ">
        <div className="relative max-w-5xl mx-auto pt-20 mt-[40px] px-3 sm:px-0 sm:pt-0">
          <Slide yAxis={90}>
            <h2 className="capitalize font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center text-white py-10">
              How it works
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto text-slate-400">
              Get started in minutes: create an account, add your assets, and
              let QFS Ledger handle the rest with powerful security backed by
              quantum technology and smooth,reliable transactions.
            </p>
          </Slide>
          <div
            className="flex flex-wrap flex-col justify-between sm:flex-row gap-5 mt-20  sm:p-10 backdrop-blur-md"
            style={{ boxShadow: "20px 20px 20px #0B1120" }}
          >
            {[
              {
                title: "step 1",
                subtext:
                  "Sign up for onboarding on QFS, then verify your identity.",
              },
              {
                title: "step 2",
                subtext:
                  "Once KYC Submission is Approved, proceed to Sync your wallet with KYC. You can also Apply for Humanitarian Project.",
              },
              {
                title: "step 3",
                subtext:
                  "Bid for the new QFS cards that allow you to shop Worldwide.",
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
                {/* <div
                  key={item.title}
                  className="bg-slate-800 highlight-white/5 rounded-lg p-6 text-white sm:w-[30%] hover:bg-[#0a1120] hover:shadow-[0_35px_60px_-15px_rgba(0,0,32,0.8)] flex flex-col"
                > */}
                <div className="">
                  <i className="lni lni-thunder"></i>
                  <h5 className="text-slate-300 font-semibold text-base capitalize">
                    {item.title}
                  </h5>
                  <p className="mt-6 text-slate-300">{item.subtext}</p>
                </div>
                {/* <div className="p-[15px_13px_15px_17px] bg-[linear-gradient(60deg,#ceff0c_0%,#e1ff63_100%)] rounded-[50px] w-5 h-5"></div> */}
                {/* </div> */}
              </Slide>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
