"use client";
import Image from "next/image";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { postMethod } from "../lib/fetch_api/method";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FormAuthErr, FormFieldType, GoToType } from "../lib/types";
import FormAuth from "../ui/form/auth";
import { setUser } from "../lib/redux/userSlice";
import store from "../lib/store";

const LoginForm: FormFieldType[] = [
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter your email address",
    required: true,
    icon: (className: string) => <AtSymbolIcon className={`${className}`} />,
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter password",
    required: true,
    icon: (className: string) => <KeyIcon className={`${className}`} />,
  },
  {
    label: "Login",
    type: "submit",
    icon: (className: string) => <ArrowRightIcon className={`${className}`} />,
  },
];

const GoTo: GoToType = {
  label: "Register",
  des: "Not have account yet?",
  href: "/register",
};

const LoginPage = () => {
  const router = useRouter();

  const [err, setErr] = useState({
    errors: {
      email: [],
      password: [],
      confirm_password: [],
    },
    message: "",
  } as FormAuthErr);

  const success = err.message === 'Login successful' ? true : false;
  const message = err.message;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formValue = new FormData(form);
    const email = formValue.get("email");
    const password = formValue.get("password");

    const fetchData = async () => {
      try {
        const res = await postMethod('/auth/login', {email, password});
        if (!res.ok) {
          const getErrors = await res.json();
          setErr(getErrors);
          throw new Error("Fail to login");
        }

        const response = await res.json();

        setErr(pre => ({
          ...pre,
          message: response.message,
        }));

        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/',
        });
        if (!result?.ok) {
          throw new Error(result?.error || 'Login failed');
        }
  
        if (result?.url) {
          router.push(result.url);
        }

      } catch (error) {
        console.log("There is an error: ", error);
      }
    };
    fetchData();
  };

  return (
    <main className="flex justify-center items-center p-8 ">
      <div className="w-3/4 md:w-2/5">
        <div className=" bg-blue-700 rounded-xl">
          <Image
            className="m-auto"
            src={"/logo.png"}
            width={100}
            height={100}
            alt="logo"
          />
        </div>
        <div className="bg-gray-50  rounded-xl mt-4 py-8 px-4 gap-4">
          <h1 className="text-xl font-semibold mb-8">
            Please log in to continue
          </h1>
            <FormAuth
              data={LoginForm}
              goTo={GoTo}
              message={message}
              success={success}
              handleSubmit={handleLogin}
              err={err}
            />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
