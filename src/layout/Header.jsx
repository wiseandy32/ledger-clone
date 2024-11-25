import { Link } from "react-router-dom";
import MobileNav from "../pages/components/MobileNav";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  return (
    <>
      <header className="flex items-center px-2 md:px-5 justify-between h-20 text-slate-200 font-semibold text-sm fixed pt-6 leading-6 w-full bg-[#0B1120] z-[1000]">
        <MobileNav />
        <Link to={"/"}>
          <img src={logo} width={160} height={20} alt="" />
        </Link>
        <nav className="hidden md:flex flex-col md:flex-row gap-16 md:gap-0 pt-24 md:pt-0 md:justify-end items-center capitalize fixed md:static h-[100vh] md:h-auto w-[100vw] top-[0] left-[0] z-[999999] bg-[#0b1120]">
          <ul className="flex flex-col md:flex-row justify-center md:w-auto w-full items-center gap-4">
            {[
              { title: "home", path: "/" },
              { title: "about", path: "/" },
              { title: "services", path: "/" },
            ].map((link) => (
              <li
                key={link.title}
                className="hover:text-sky-400 text-2xl md:text-sm font-semibold"
              >
                <Link to={link.path}>{link.title}</Link>
              </li>
            ))}
          </ul>
          {!path.includes("admin") || !path.includes("user") ? (
            <div className="flex items-center flex-col md:flex-row px-5 md:px-0 gap-4 w-full md:w-auto md:border-l-2 md:border-slate-200 md:border-solid md:ml-6 md:pl-6 ">
              {[
                { title: "sign up", path: "register" },
                { title: "login", path: "login" },
              ].map((link) => (
                <Link
                  key={link.title}
                  className={`focus:outline-none ${
                    link.path === "register"
                      ? "bg-sky-500 hover:bg-sky-400 md:bg-transparent md:hover:bg-transparent md:hover:text-sky-400"
                      : "border-solid border-2 border-sky-500 hover:bg-sky-400 md:border-none md:hover:bg-transparent md:hover:text-sky-400"
                  }  text-white font-semibold h-12 px-6 md:px-0 rounded-lg w-full flex items-center justify-center sm:w-auto`}
                  to={link.path}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          ) : null}
        </nav>
      </header>
    </>
  );
}

export default Header;
