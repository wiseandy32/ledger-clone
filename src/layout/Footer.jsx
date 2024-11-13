import { Link } from "react-router-dom";
import Slide from "../pages/components/Slide";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="pt-20 mb-20 sm:pt-32 sm:mb-32 md:pt-20 md:mb-5 sm:px-10 text-white">
      <div className="sm:mt-0 flex flex-col-reverse sm:flex-row justify-between gap-16 sm:gap-0">
        <div
          className="flex flex-col sm:flex-row justify-between gap-y-4 sm:gap-y-10 w-full px-5 sm:px-0"
          // style={{ border: "2px solid red" }}
        >
          <Slide yAxis={90} className="sm:w-[33%]">
            <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-50 capitalize">
              <img src={logo} width={160} height={20} alt="" />
            </div>

            <p className="mt-4 max-w-3xl space-y-6 ">
              JOIN THE BIGGEST FINANCIAL REVOLUTIONARY SYSTEM DESIGNED TO
              OVERTAKE THE WORLD&apos;S BANKING SYSTEM BY ELIMINATING CONTROL OF
              MONEY BY CABALS.
            </p>
          </Slide>
          <div className="flex justify-between mt-10 md:w-[50%] sm:justify-evenly">
            <ul className="capitalize">
              <Slide yAxis={90} delay={0.1}>
                <p className="font-semibold text-md">company</p>
              </Slide>
              {[
                { title: "home", path: "home" },
                { title: "about", path: "about" },
                { title: "services", path: "contact" },
                // { title: "privacy policy", path: "/" },
              ].map((link, index) => (
                <Slide
                  key={link.title}
                  yAxis={90}
                  delay={index === 0 ? 0.2 : 0.2 * index}
                >
                  <li key={link.title} className="hover:text-sky-400 mt-4">
                    <Link href={link.path}>{link.title}</Link>
                  </li>
                </Slide>
              ))}
            </ul>
            <ul className="capitalize">
              <Slide yAxis={90}>
                <p className="font-semibold text-md">support</p>
              </Slide>
              {[
                { title: "help center", path: "home" },
                { title: "contact us", path: "about" },
                { title: "legal", path: "/" },
              ].map((link, index) => (
                <Slide
                  key={link.path}
                  yAxis={90}
                  delay={index === 0 ? 0.2 : 0.2 * index}
                >
                  <li key={link.title} className="hover:text-sky-400 mt-4">
                    <Link href={link.path}>{link.title}</Link>
                  </li>
                </Slide>
              ))}
            </ul>
          </div>
          <div className="">
            <Slide yAxis={90} delay={0.1} className={"mt-10 sm:mt-0"}>
              <label htmlFor="newsletter" className="block">
                Subscribe to our news letter
              </label>
              <input
                type="email"
                id="newsletter"
                className="bg-transparent border-solid border-2 border-white my-4 px-2 py-1 rounded-xl w-full"
              />
            </Slide>
            <Slide yAxis={90} delay={0.3}>
              <button className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto bg-sky-500 highlight-white/20 hover:bg-sky-400">
                Subscribe
              </button>
            </Slide>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
