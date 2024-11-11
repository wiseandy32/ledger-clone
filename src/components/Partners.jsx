import Slide from "./Slide";
import firstPartner from "../assets/first-partner.webp";
import secondPartner from "../assets/second-partner.webp";
import thirdPartner from "../assets/third-partner.webp";
import fourthPartner from "../assets/fourth-partner.webp";
import fifthPartner from "../assets/fifth-partner.webp";
import sixthPartner from "../assets/sixth-partner.webp";

function Partners() {
  return (
    <section className="h-[120dvh] bg-bottom bg-no-repeat bg-[#0B1120] bottom-10 inset-0 sm:h-[55dvh] mb-10">
      <div className="inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] ">
        {/* removed max-w-5xl px-3 sm:px-0 */}
        <div className="relative mx-auto pt-20 mt-[40px] sm:pt-0 px-5 sm:px-10">
          <Slide yAxis={90}>
            <h2 className="capitalize font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center text-white sm:py-10 pb-10">
              our partners
            </h2>
          </Slide>
          <div className="w-full flex flex-wrap flex-col justify-between sm:flex-row gap-5 sm:py-10 backdrop-blur-md">
            {[
              firstPartner,
              secondPartner,
              thirdPartner,
              fourthPartner,
              fifthPartner,
              sixthPartner,
            ].map((src, index) => (
              <Slide
                key={src}
                delay={index === 0 ? 0.2 : 0.2 * index}
                xAxis={100}
              >
                <img src={src} key={src} height={160} width={160} alt="" />
              </Slide>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partners;
