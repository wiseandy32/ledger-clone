import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MobileNav() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <>
      <div
        className="absolute top-[28px] right-[-10px] grid items-center w-12 h-12 text-white z-[9999999] md:hidden"
        onClick={() => setIsMenuVisible((prev) => !prev)}
      >
        {!isMenuVisible ? (
          <GiHamburgerMenu className="h-6 w-6" />
        ) : (
          <ImCross className="h-6 w-6" />
        )}
      </div>
      <motion.nav
        variants={{
          close: {
            translateX: "100vw",
          },
          open: {
            translateX: 0,
          },
        }}
        transition={{
          duration: 0.5,
          damping: 8,
          stiffness: 100,
        }}
        initial="hidden"
        animate={!isMenuVisible ? "close" : "open"}
        className="flex md:hidden flex-col md:flex-row gap-16 md:gap-0 pt-24 md:pt-0 md:justify-end items-center capitalize fixed md:static h-[100vh] md:h-auto w-[100vw] top-[0] left-[0] z-[999999] bg-[#0b1120]"
      >
        <ul className="flex flex-col md:flex-row justify-center md:w-auto w-full items-center gap-4">
          {[
            { title: "home", path: "#home" },
            { title: "about", path: "#about" },
            { title: "services", path: "contact" },
          ].map((link) => (
            <li
              key={link.title}
              className="hover:text-sky-400 text-2xl md:text-sm font-semibold"
            >
              <a href={link.path}>{link.title}</a>
            </li>
          ))}
        </ul>
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
              } focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 md:px-0 rounded-lg w-full flex items-center justify-center sm:w-auto`}
              to="register"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </motion.nav>
    </>
  );
}

export default MobileNav;
