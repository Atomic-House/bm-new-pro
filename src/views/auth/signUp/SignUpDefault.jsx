import InputField from "components/fields/InputField";
import Default from "layouts/auth/types/Default";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { useNavigate } from "react-router-dom";
import { account } from "../../../appwrite/appConfig";
import { ID } from "appwrite";

function SignUpDefault() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Signup User
  const signup = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log(user)

    try {
      await account.create(ID.unique(),user.email, user.password);
      setLoader(false);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error)
      setLoader(false);
    }
  };

  return (
    <Default
      maincard={
        <div className="mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-start lg:justify-start">
          {/* Sign up section */}
          <div className="mt-[10vh] w-full max-w-full flex-col md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="text-4xl font-bold text-navy-700 dark:text-white">
              Sign Up
            </h3>
            <p className="mt-[10px] ml-1 text-base text-gray-600">
              Enter your email and password to sign up!
            </p>
            <div className="mt-9 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:!bg-navy-800">
              <div className="rounded-full text-xl">
                <FcGoogle />
              </div>
              <p className="text-sm font-medium text-navy-700 dark:text-white">
                Sign Up with Google
              </p>
            </div>
            <div className="mt-6 mb-4 flex items-center gap-3">
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
              <p className="text-base font-medium text-gray-600"> or </p>
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            </div>
            {error && error}
            {/* user info */}
            <div className="mb-3 flex w-full items-center justify-center gap-4">
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="First Name*"
                  placeholder="John"
                  id="firstname"
                  type="text"
                />
              </div>

              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Last Name*"
                  placeholder="Doe"
                  id="lastname"
                  type="text"
                />
              </div>
            </div>
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min 8 characters"
              id="password"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {/* Checkbox */}
            <div className="mt-4 flex items-center justify-between px-2">
              <div className="flex">
                <Checkbox id="checkbox" />
                <label
                  htmlFor="checkbox"
                  className="ml-2 text-sm text-navy-700 hover:cursor-pointer dark:text-white"
                >
                  By creating an account means you agree to the Terms and
                  Conditions, and our Privacy Policy
                </label>
              </div>
            </div>

            {/* button */}

            <button onClick={signup}  className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              {loader ? "Creating..." : "Create my account"}
            </button>

            <div className="mt-3">
              <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
                Already a member?
              </span>
              <a
                href="/auth/sign-in/default"
                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default SignUpDefault;
