/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function MessageCard({ title, subtext, cta, to }) {
  return (
    <div className="mt-[12vh] md:pt-[6vh] sm:px-5 w-full">
      <div className="p-5 md:p-0 md:flex md:justify-center md:items-center max-w-[600px] md:m-auto md:py-3 md:pb-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-extrabold text-2xl md:text-3xl tracking-tight md:text-center text-white md:py-5 md:pt-10 md:w-full">
            {title}
          </h1>
          <p>{subtext}</p>
          <Link
            to={to}
            className="flex focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-black font-semibold h-12 px-6 rounded-lg w-[fit-content] items-center justify-center sm:w-auto bg-sky-400 highlight-white/20 hover:bg-sky-400 hover:font-bold mt-3"
          >
            {cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
