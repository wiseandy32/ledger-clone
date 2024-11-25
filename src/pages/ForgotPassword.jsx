import { auth } from "../services/firebase";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import MessageCard from "./components/MessageCard";

function ForgotPassword() {
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);

  const sendPasswordResetLink = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "https://ledger-two-olive.vercel.app/login",
      });
      setIsResetLinkSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-[120vh] mb-[10vh] bg-bottom bg-no-repeat bg-[#0B1120] bottom-10 inset-0  sm:h-[100dvh] md:h-[105dvh] relative">
      <div className="mt-[12vh] md:pt-[6vh] px-5 absolute inset-0 h-[135vh] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] md:h-full">
        <div
          className="p-2 md:p-0 md:flex md:justify-center md:items-center max-w-[600px] md:m-auto md:py-5"
          style={{ backgroundColor: "#0B1120" }}
        >
          {!isResetLinkSent ? (
            <div>
              <form
                className="flex flex-col gap-3"
                onSubmit={async (e) => await sendPasswordResetLink(e)}
              >
                <h1 className="font-extrabold text-4xl md:text-5xl  tracking-tight text-center text-white py-10 md:py-3 md:pt-0 md:w-full md:text-left">
                  Password Reset
                </h1>
                <div className="flex flex-col gap-3 md:justify-between">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="capitalize">
                      Enter email address
                    </label>
                    <input
                      type="email"
                      required
                      id={"email"}
                      name={"email"}
                      className="py-2 px-1 rounded-md"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto bg-sky-400 highlight-white/20 hover:bg-sky-400 hover:font-bold mt-3"
                >
                  Send password reset link
                </button>
              </form>
            </div>
          ) : (
            <MessageCard
              title={"Password reset email sent"}
              subtext={
                "We've sent a password reset link to your email. Please check your inbox."
              }
              cta={"Login"}
              to={"/login"}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
