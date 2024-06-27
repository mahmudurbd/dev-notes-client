import React, { useContext } from "react";
import InputArea from "../components/InputArea";
import IconLogo from "../imgs/icon-logo-.png";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  const userAuthThroughServer = async (serverRoute, formData) => {
    await axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(sessionStorage);

        toast.success(`Successfully ${type.replace("-", " ")}!`);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "sign-in" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // form Data
    let form = new FormData(formElement);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { fullname, email, password } = formData;

    // form validation
    if (fullname) {
      if (!fullname.length) {
        return toast.error("Fullname is required!");
      }
      if (fullname.length < 3) {
        return toast.error("Full name should be atleast 3 letters");
      }
    }

    if (!email.length) {
      return toast.error("Email is required!");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is not valid!");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 character long with a numeric, 1 lowercase and 1 uppercase leter"
      );
    }

    userAuthThroughServer(serverRoute, formData);
    // return toast.success("Successfully Signup!");
  };

  // Google Handler
  const handleGoolgeAuth = (e) => {
    e.preventDefault();

    authWithGoogle()
      .then((user) => {
        let serverRoute = "/google-auth";

        let formData = {
          access_token: user.accessToken,
        };

        userAuthThroughServer(serverRoute, formData);
      })
      .catch((err) => {
        toast.error("Have a problem with google login");
        console.log(err);
      });
  };

  return access_token !== null ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <div>
        <div className="bg-white dark:bg-gray-900">
          <Toaster />
          <div className="flex justify-center h-screen">
            <div
              className="hidden bg-cover lg:block lg:w-2/3 h-screen"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
              }}
            >
              <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                <div>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Dev Notes
                  </h2>
                  <p className="max-w-xl mt-3 text-white">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                    autem ipsa, nulla laboriosam dolores, repellendus
                    perferendis libero suscipit nam temporibus molestiae
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 my-auto">
              <div className="flex-1">
                <div className="text-center">
                  <div className="flex justify-center mx-auto">
                    <img
                      className="w-auto h-7 sm:h-12"
                      src={IconLogo}
                      alt="Meraki UI Logo"
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-500 sm:text-3xl">
                    {type === "sign-in" ? "Welcome Back!" : "Join Us Today"}
                  </h2>

                  <p className="mt-3 text-gray-500 dark:text-gray-300">
                    {type === "sign-in"
                      ? "Sign in to access your account"
                      : "Create your own account"}
                  </p>
                </div>

                <div className="mt-8">
                  <form id="formElement">
                    {type === "sign-up" && (
                      <div>
                        <InputArea
                          id="fullname"
                          name="fullname"
                          inputType="text"
                          placeholder="Full Name"
                          level="Your Name"
                        />
                      </div>
                    )}

                    <div className="mt-6">
                      <div className="flex justify-between mb-2"></div>

                      <InputArea
                        id="email"
                        name="email"
                        inputType="email"
                        placeholder="example@example.com"
                        level="Email Address"
                      />
                    </div>
                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        {/* <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </a> */}
                      </div>

                      <InputArea
                        id="password"
                        name="password"
                        inputType="password"
                        placeholder="Your Password"
                        level="Password"
                      />
                    </div>
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={handleSubmit}
                        style={{ backgroundColor: "black" }}
                        type="submit"
                        className="w-1/4 align-center px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                      >
                        {type === "sign-in" ? "Sign in" : "Sign up"}
                      </button>
                    </div>
                    <div className="google-login-area">
                      <div
                        style={{ color: "#ccc" }}
                        className="flex items-center justify-between mt-8"
                      >
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <a
                          href="#"
                          className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                        >
                          or {type === "sign-in" ? "login" : "signup"} with
                          google
                        </a>

                        <span className="w-1/5 border-b dark:border-gray-400"></span>
                      </div>
                      <a
                        style={{ border: "1px solid #ccc" }}
                        href="#"
                        className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <div className="px-4 py-2">
                          <svg className="w-6 h-6" viewBox="0 0 40 40">
                            <path
                              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                              fill="#FFC107"
                            />
                            <path
                              d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                              fill="#FF3D00"
                            />
                            <path
                              d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                              fill="#4CAF50"
                            />
                            <path
                              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                              fill="#1976D2"
                            />
                          </svg>
                        </div>

                        <span
                          onClick={handleGoolgeAuth}
                          className="w-5/6 px-4 py-2 font-bold text-center"
                        >
                          Continue with Google
                        </span>
                      </a>
                    </div>
                  </form>

                  <p className="mt-6 text-sm text-center text-gray-400">
                    {type === "sign-in"
                      ? "Don't have an account yet? "
                      : "Already have an account! "}
                    <Link
                      style={{ color: "blue" }}
                      to={type === "sign-in" ? "/signup" : "/signin"}
                      className="text-blue-500 focus:outline-none focus:underline hover:underline"
                    >
                      {type === "sign-in" ? "Sign up" : "Sign in"}
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
