import Card from "components/card";
import InputField from "components/fields/InputField";
import Centered from "layouts/auth/types/Centered";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";

import { useState } from "react";
import { account } from "../../../appwrite/appConfig";
import { useNavigate } from "react-router-dom";

function SignInCenter() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    setLoader(true);

    console.log(user)

    try {
      await account.createEmailSession(user.email, user.password).then((res)=>{
        setLoader(false);
        navigate("/");
      })
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setLoader(false);
    }
  };

  return (
    <Centered
      bgImage="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
      maincard={
        <Card extra="max-w-[405px] md:max-w-[510px] md:w-[510px] h-max mx-2.5 md:mx-auto mt-[50px] mb-auto py-2.5 px-4 md:!p-[50px] pt-8 md:pt-[50px]">
          <h3 className="mb-[10px] text-4xl font-bold text-gray-900 dark:text-white">
            Sign In
          </h3>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Enter your email and password to sign in!
          </p>
          <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-700 dark:text-white">
            <div className="rounded-full text-xl">
              <FcGoogle />
            </div>
            <p className="text-sm font-medium text-navy-700 dark:text-white">
              Sign In with Google
            </p>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            <p className="text-base font-medium text-gray-600"> or </p>
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
          </div>
          <div className="my-5 text-red-400 font-bold text-center">
          {error && error}
        </div>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
          <div className="mt-2 flex items-center justify-between px-2">
         
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-500 dark:text-white"
              href=" "
            >
              Forgot password?
            </a>
          </div>
          <button  onClick={loginUser} className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          {loader ? "Signing in..." : "Sign In"}
          </button>
          <div className="mt-3">
            <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
              Not registered yet?
            </span>
            <a
              href=" "
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-500 dark:text-white"
            >
              Create an Account
            </a>
          </div>
        </Card>
      }
    />
  );
}

export default SignInCenter;
