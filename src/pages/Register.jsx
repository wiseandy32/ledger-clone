import { Link } from "react-router-dom";
import { registrationFormField } from "../data";
import { useState } from "react";

function Register() {
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    console.log(data.get("email"));
    for (const p of data) {
      if (p) {
        console.log(p);
      }
    }
    console.log(Object.fromEntries(data));
  };

  return (
    <section className="h-[120vh] mb-[10vh] bg-bottom bg-no-repeat bg-[#0B1120] bottom-10 inset-0  sm:h-[100dvh] md:h-[125dvh] relative">
      <div className="mt-[12vh] md:pt-[6vh] px-5 absolute inset-0 h-[135vh] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] md:h-full">
        <div
          className="p-2 md:flex md:justify-between md:items-center max-w-[1200px] md:m-auto md:p-5"
          style={{ backgroundColor: "#0B1120" }}
        >
          <div className="hidden md:block w-[45%]">
            <img
              className="w-full h-full"
              src="registration-image.webp"
              alt=""
            />
          </div>

          <div className="md:w-[45%]">
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => onSubmit(e)}
              id="registrationForm"
            >
              <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-5xl tracking-tight text-center text-white py-10 md:py-5 md:pt-10 md:w-full md:text-left">
                Create an account
              </h1>
              {!error ? null : (
                <p className="text-white bg-red-500 w-full p-2 rounded-md font-semibold">
                  Passwords do not match. Please ensure both fields are
                  identical
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
                                e.target.parentElement.previousSibling.lastChild
                                  .value;
                              if (password !== e.target.value) {
                                setError("error");
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
              <button className="mt-6 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto border-solid border-2 highlight-white/20  border-sky-500 hover:bg-sky-400 gap-4 md:w-full">
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
              <button
                // removed hover:bg-[#a9d203] and border-[#a9d203]
                className="gap-4 mt-6 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto border-solid border-2 highlight-white/20 border-sky-500 hover:bg-sky-400 md:w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 507.83 470.86"
                  width="24"
                  height="24"
                  // viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  aria-hidden="true"
                  className="crayons-icon crayons-icon--default"
                >
                  <polygon
                    className="a"
                    points="482.09 0.5 284.32 147.38 320.9 60.72 482.09 0.5"
                  />
                  <polygon
                    className="b"
                    points="25.54 0.5 221.72 148.77 186.93 60.72 25.54 0.5"
                  />
                  <polygon
                    className="b"
                    points="410.93 340.97 358.26 421.67 470.96 452.67 503.36 342.76 410.93 340.97"
                  />
                  <polygon
                    className="b"
                    points="4.67 342.76 36.87 452.67 149.57 421.67 96.9 340.97 4.67 342.76"
                  />
                  <polygon
                    className="b"
                    points="143.21 204.62 111.8 252.13 223.7 257.1 219.73 136.85 143.21 204.62"
                  />
                  <polygon
                    className="b"
                    points="364.42 204.62 286.91 135.46 284.32 257.1 396.03 252.13 364.42 204.62"
                  />
                  <polygon
                    className="b"
                    points="149.57 421.67 216.75 388.87 158.71 343.55 149.57 421.67"
                  />
                  <polygon
                    className="b"
                    points="290.88 388.87 358.26 421.67 348.92 343.55 290.88 388.87"
                  />
                  <polygon
                    className="c"
                    points="358.26 421.67 290.88 388.87 296.25 432.8 295.65 451.28 358.26 421.67"
                  />
                  <polygon
                    className="c"
                    points="149.57 421.67 212.18 451.28 211.78 432.8 216.75 388.87 149.57 421.67"
                  />
                  <polygon
                    className="d"
                    points="213.17 314.54 157.12 298.04 196.67 279.95 213.17 314.54"
                  />
                  <polygon
                    className="d"
                    points="294.46 314.54 310.96 279.95 350.71 298.04 294.46 314.54"
                  />
                  <polygon
                    className="e"
                    points="149.57 421.67 159.11 340.97 96.9 342.76 149.57 421.67"
                  />
                  <polygon
                    className="e"
                    points="348.72 340.97 358.26 421.67 410.93 342.76 348.72 340.97"
                  />
                  <polygon
                    className="e"
                    points="396.03 252.13 284.32 257.1 294.66 314.54 311.16 279.95 350.91 298.04 396.03 252.13"
                  />
                  <polygon
                    className="e"
                    points="157.12 298.04 196.87 279.95 213.17 314.54 223.7 257.1 111.8 252.13 157.12 298.04"
                  />
                  <polygon
                    className="f"
                    points="111.8 252.13 158.71 343.55 157.12 298.04 111.8 252.13"
                  />
                  <polygon
                    className="f"
                    points="350.91 298.04 348.92 343.55 396.03 252.13 350.91 298.04"
                  />
                  <polygon
                    className="f"
                    points="223.7 257.1 213.17 314.54 226.29 382.31 229.27 293.07 223.7 257.1"
                  />
                  <polygon
                    className="f"
                    points="284.32 257.1 278.96 292.87 281.34 382.31 294.66 314.54 284.32 257.1"
                  />
                  <polygon
                    className="g"
                    points="294.66 314.54 281.34 382.31 290.88 388.87 348.92 343.55 350.91 298.04 294.66 314.54"
                  />
                  <polygon
                    className="g"
                    points="157.12 298.04 158.71 343.55 216.75 388.87 226.29 382.31 213.17 314.54 157.12 298.04"
                  />
                  <polygon
                    className="h"
                    points="295.65 451.28 296.25 432.8 291.28 428.42 216.35 428.42 211.78 432.8 212.18 451.28 149.57 421.67 171.43 439.55 215.75 470.36 291.88 470.36 336.4 439.55 358.26 421.67 295.65 451.28"
                  />
                  <polygon
                    className="i"
                    points="290.88 388.87 281.34 382.31 226.29 382.31 216.75 388.87 211.78 432.8 216.35 428.42 291.28 428.42 296.25 432.8 290.88 388.87"
                  />
                  <polygon
                    className="j"
                    points="490.44 156.92 507.33 75.83 482.09 0.5 290.88 142.41 364.42 204.62 468.37 235.03 491.43 208.2 481.49 201.05 497.39 186.54 485.07 177 500.97 164.87 490.44 156.92"
                  />
                  <polygon
                    className="j"
                    points="0.5 75.83 17.39 156.92 6.66 164.87 22.56 177 10.44 186.54 26.34 201.05 16.4 208.2 39.26 235.03 143.21 204.62 216.75 142.41 25.54 0.5 0.5 75.83"
                  />
                  <polygon
                    className="g"
                    points="468.37 235.03 364.42 204.62 396.03 252.13 348.92 343.55 410.93 342.76 503.36 342.76 468.37 235.03"
                  />
                  <polygon
                    className="g"
                    points="143.21 204.62 39.26 235.03 4.67 342.76 96.9 342.76 158.71 343.55 111.8 252.13 143.21 204.62"
                  />
                  <polygon
                    className="g"
                    points="284.32 257.1 290.88 142.41 321.1 60.72 186.93 60.72 216.75 142.41 223.7 257.1 226.09 293.27 226.29 382.31 281.34 382.31 281.74 293.27 284.32 257.1"
                  />
                </svg>
                MetaMask
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
