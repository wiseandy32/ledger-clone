import { Link } from "react-router-dom";
import { registrationFormField } from "../data";
import { useState } from "react";
import registrationImage from "../assets/registration-image.webp";
import { addDataToDb, createUser, updateUserProfile } from "../utils/auth";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import MessageCard from "./components/MessageCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

function Register() {
  const [error, setError] = useState("");
  const [isVerificationLinkSent, setIsVerificationLinkSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      setIsSubmitting(true);
      // create a new user
      await createUser(
        formData.get("email"),
        formData.get("password"),
        setError
      );
      // update user displayName
      await updateUserProfile({
        displayName: `${formData.get("firstName")} ${formData.get("lastName")}`,
      });

      const uid = auth.currentUser.uid;
      const user = {
        name: auth.currentUser.displayName,
        username: formData.get("username"),
        email: auth.currentUser.email,
        uid,
        isDeleted: false,
        isAdmin: false,
      };
      // save user details to db
      await addDataToDb("users", user);
      await sendEmailVerification(auth.currentUser);
      // sign the user out
      await signOut(auth);
      setIsVerificationLinkSent(true);
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className=" px-3 mt-[14vh] mb-[10vh] bg-bottom bg-no-repeat bottom-10">
      {!isVerificationLinkSent ? (
        <div className="md:flex md:justify-between md:items-center max-w-[1200px] md:m-auto md:p-5">
          <div className="hidden md:block w-[45%]">
            <img className="w-full h-full" src={registrationImage} alt="" />
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
                    <Input
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
                                e.target.parentElement.previousSibling.lastChild
                                  .value;
                              if (password !== e.target.value) {
                                setError(
                                  "Passwords do not match. Please ensure both fields are identical"
                                );
                              } else {
                                setError("");
                              }
                            }
                      }
                      className="py-5"
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
                  I accept the <span className="text-blue-400">terms</span> and{" "}
                  <span className="text-blue-400">privacy policy</span>
                </label>
              </div>
              <Button variant="gooeyLeft" type="submit" disabled={isSubmitting}>
                {!isSubmitting ? null : (
                  <Loader2 className="animate-spin mr-2" />
                )}
                {!isSubmitting ? "Register" : "Creating your account"}
              </Button>
            </form>
            <div className="flex py-4 gap-2">
              <p>Already have an account? </p>
              <Link to={"/login"} className="text-blue-400">
                Login
              </Link>
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
    </section>
  );
}

export default Register;
