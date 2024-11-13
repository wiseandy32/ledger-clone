import { Link } from "react-router-dom";
import { registrationFormField } from "../data";
import { useState } from "react";
import registrationImage from "../assets/registration-image.webp";
import { useNavigate } from "react-router-dom";
import { addDataToDb, createUser, updateUserProfile } from "../utils/auth";
import {
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";
import MessageCard from "./components/MessageCard";

function Register() {
  const [error, setError] = useState("");
  const [isVerificationLinkSent, setIsVerificationLinkSent] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userInfo = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      username: formData.get("username"),
    };

    try {
      // create a new user
      await createUser(
        formData.get("email"),
        formData.get("password"),
        setError
      );
      // update user displayName
      await updateUserProfile({
        displayName: `${userInfo.username}`,
      });
      // save user details to db
      await addDataToDb("users", userInfo);
      await sendEmailVerification(auth.currentUser);

      // sign the user out
      await signOut(auth);
      setIsVerificationLinkSent(true);
      console.log("Document written");
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-[120vh] mb-[10vh] bg-bottom bg-no-repeat bg-[#0B1120] bottom-10 inset-0  sm:h-[100dvh] md:h-[125dvh] relative">
      <div className="mt-[12vh] md:pt-[6vh] px-5 absolute inset-0 h-[135vh] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] md:h-full">
        {!isVerificationLinkSent ? (
          <div
            className="p-2 md:flex md:justify-between md:items-center max-w-[1200px] md:m-auto md:p-5"
            style={{ backgroundColor: "#0B1120" }}
          >
            <div className="hidden md:block w-[45%]">
              <img
                className="w-full h-full"
                // src="../../../assets/registration-image.webp"
                src={registrationImage}
                alt=""
              />
            </div>

            <div className="md:w-[45%]">
              <form
                className="flex flex-col gap-3"
                onSubmit={async (e) => await onSubmit(e)}
                id="registrationForm"
              >
                <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-5xl tracking-tight text-center text-white py-10 md:py-5 md:pt-10 md:w-full md:text-left">
                  Create an account
                </h1>
                {!error ? null : (
                  <p className="text-white bg-red-500 w-full p-2 rounded-md font-semibold">
                    {error}
                  </p>
                )}

                <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:justify-between">
                  {registrationFormField.map((field) => (
                    <div
                      className="flex flex-col gap-1 md:w-[45%]"
                      key={field.name}
                    >
                      <label htmlFor={field.name} className="capitalize">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field?.placeholder}
                        required
                        id={field.name}
                        name={field.name}
                        pattern={field?.pattern}
                        title={field?.title}
                        minLength={field?.min}
                        onBlur={
                          field.name !== "confirmPassword"
                            ? null
                            : (e) => {
                                const password =
                                  e.target.parentElement.previousSibling
                                    .lastChild.value;
                                if (password !== e.target.value) {
                                  setError(
                                    "Passwords do not match. Please ensure both fields are identical"
                                  );
                                } else {
                                  setError("");
                                }
                              }
                        }
                        className="py-2 px-1 rounded-md"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="hasAcceptedTerms"
                    id="hasAcceptedTerms"
                    required
                  />
                  <label htmlFor="hasAcceptedTerms" className="">
                    I accept the terms and privacy policy
                  </label>
                </div>
                <button
                  type="submit"
                  className="focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto bg-sky-400 highlight-white/20 hover:bg-sky-400 hover:font-bold mt-6"
                >
                  Register
                </button>
              </form>
              <div className="flex py-4 gap-2">
                <p>Already have an account? </p>
                <Link to={"/login"} className="text-blue-400">
                  Login
                </Link>
              </div>
              <div className="capitalize flex items-center mt-6">
                <span className="w-[30%] h-[0.7px] bg-white md:w-full"></span>
                <p className="capitalize bg-white text-black text-sm p-1 rounded-md md:w-full text-center">
                  or continue with
                </p>
                <span className="w-[30%] h-[0.7px] bg-white md:w-full"></span>
              </div>

              <div className="md:flex justify-center gap-4">
                <button
                  onClick={loginWithGoogle}
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
              </div>
            </div>
          </div>
        ) : (
          <MessageCard
            title={"Verification email sent"}
            subtext={
              "We've sent a verification link to your email. Please check your inbox."
            }
            cta={"Login"}
            to={"/login"}
          />
        )}
      </div>
    </section>
  );
}

export default Register;
