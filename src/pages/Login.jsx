import { Link } from "react-router-dom";
import { loginFormFields } from "../data";
import welcomeBackGif from "../assets/welcome-back-optimize.gif";
import { useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { loginWithGoogle } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { deleteUserData, getSingleDocument } from "@/lib/helpers";

function Login() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");
      console.log(email, password);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getSingleDocument("uid", user.uid);

      if (userDoc.isDeleted) {
        await deleteUserData(user.uid, user);
        localStorage.removeItem("id");
        setError("This user does not exist");
        return;
      }

      // if (!user.emailVerified) {
      //   signOut(auth);
      //   return setError(
      //     "Email verification is required. Please verify your email to proceed"
      //   );
      // }
      navigate(state?.from || "/user");
    } catch (error) {
      const { code } = error;

      if (code === "auth/invalid-credential") {
        setError("Invalid email or password");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <section className="h-[120vh] mb-[10vh] bg-bottom bg-no-repeat bg-[#0B1120] bottom-10 inset-0  sm:h-[100dvh] md:h-[105dvh] relative">
      <div className="mt-[12vh] md:pt-[6vh] px-2 sm:px-5 absolute inset-0 h-[135vh] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] md:h-full">
        <div
          className="p-2 md:flex md:justify-between md:items-center max-w-[1200px] md:m-auto md:p-5"
          style={{ backgroundColor: "#0B1120" }}
        >
          <div className="hidden md:block w-[45%]">
            <img className="w-full h-full" src={welcomeBackGif} alt="" />
          </div>
          <div className="md:w-[45%]">
            <form
              className="flex flex-col gap-3"
              onSubmit={async (e) => await login(e)}
            >
              <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-5xl tracking-tight text-center text-white py-10 md:py-5 md:pt-10 md:w-full md:text-left">
                Welcome back!
              </h1>
              {!error ? null : (
                <p className="text-white bg-red-500 w-full p-2 rounded-md font-semibold text-xs sm:text-sm">
                  {error}
                </p>
              )}
              <div className="flex flex-col gap-3 md:justify-between">
                {loginFormFields.map((field) => (
                  <div className="flex flex-col gap-1" key={field.name}>
                    <label htmlFor={field.name} className="capitalize">
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      placeholder={field?.placeholder}
                      required
                      id={field.name}
                      name={field.name}
                      className="py-5"
                    />
                  </div>
                ))}
              </div>
              <Link
                to={"forgot-password"}
                className="self-end text-blue-400 text-xs sm:text-sm"
              >
                Forgot password?
              </Link>
              <Button
                variant="gooeyLeft"
                type="submit"
                disabled={isSubmitting && !error}
              >
                {!isSubmitting || error ? null : (
                  <Loader2 className="animate-spin mr-2" />
                )}
                {!isSubmitting || error ? "Login" : "Signing in"}
              </Button>
            </form>
            <div className="flex py-4 gap-2 text-xs sm:text-sm text-slate-50">
              <p>Don&apos;t have have an account? </p>
              <Link to={"/register"} className="text-blue-400">
                Create one
              </Link>
            </div>
            {/* <div className="capitalize flex items-center mt-6">
              <span className="w-[30%] h-[0.7px] bg-white md:w-full"></span>
              <p className="capitalize bg-white text-black text-xs sm:text-sm p-1 rounded-md md:w-full text-center">
                or continue with
              </p>
              <span className="w-[30%] h-[0.7px] bg-white md:w-full"></span>
            </div> */}

            {/* <div className="md:flex justify-center gap-4">
              <button
                onClick={async () => await loginWithGoogle(navigate)}
                className="mt-6 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto border-solid border-2 highlight-white/20  border-sky-500 hover:bg-sky-400 gap-4 md:w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  aria-hidden="true"
                  className="crayons-icon crayons-icon--default"
                >
                  <path
                    d="M18.09 18.75c2.115-1.973 3.052-5.25 2.49-8.393h-8.392v3.473h4.777a3.945 3.945 0 0 1-1.777 2.67l2.902 2.25Z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M4.215 15.982A9 9 0 0 0 18.09 18.75l-2.902-2.25a5.37 5.37 0 0 1-8.018-2.813l-2.955 2.296Z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M7.17 13.687c-.375-1.17-.375-2.25 0-3.42L4.215 7.965a9.06 9.06 0 0 0 0 8.025l2.955-2.303Z"
                    fill="#FBBC02"
                  ></path>
                  <path
                    d="M7.17 10.267c1.035-3.24 5.438-5.115 8.393-2.347l2.58-2.528A8.85 8.85 0 0 0 4.215 7.965l2.955 2.302Z"
                    fill="#EA4335"
                  ></path>
                </svg>
                Google
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
