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
import { useEffect } from "react";

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
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getSingleDocument(user.uid);

      if (userDoc.isDeleted) {
        // await deleteUserData(user.uid, user);
        localStorage.removeItem("id");
        signOut(auth);
        setIsSubmitting(false);
        setError("This user does not exist");
        return;
      }

      if (!user.emailVerified) {
        signOut(auth);
        setIsSubmitting(false);
        setError(
          "Email verification is required. Please verify your email to proceed",
        );
        return;
      }
      navigate(!state ? "/user" : state.from);
    } catch (error) {
      const { code } = error;
      console.log(error);
      if (code === "auth/invalid-credential") {
        setError("Invalid email or password");
      }
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="mt-[16vh] bg-bottom bg-no-repeat bottom-10">
      <div className="p-2 px-3 md:flex md:justify-between md:items-center max-w-[1200px] md:m-auto md:p-5">
        <div className="hidden md:block w-[45%]">
          <img className="w-full h-full" src={welcomeBackGif} alt="" />
        </div>
        <div className="md:w-[45%]">
          <form className="flex flex-col gap-3" onSubmit={(e) => login(e)}>
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
            <Button variant="gooeyLeft" type="submit" disabled={isSubmitting}>
              {!isSubmitting ? null : <Loader2 className="animate-spin mr-2" />}
              {!isSubmitting || error ? "Login" : "Signing in"}
            </Button>
          </form>
          <div className="flex py-4 gap-2 text-xs sm:text-sm text-slate-50">
            <p>Don&apos;t have have an account? </p>
            <Link to={"/register"} className="text-blue-400">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
