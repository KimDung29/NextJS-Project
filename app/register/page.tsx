"use client";
import Image from "next/image";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FormFieldType, GoToType, State } from "../lib/type-definitions";
import { useFormState } from "react-dom";
import { createUser } from "../lib/actions/auth";
import Link from "next/link";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const RegisterForm: FormFieldType[] = [
  {
    label: "Name",
    type: "text",
    name: "username",
    placeholder: "Enter your name",
    required: false,
    icon: (className: string) => <UserIcon className={`${className}`} />,
  },
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
    label: "Confirm Password",
    type: "password",
    name: "confirm_password",
    placeholder: "Enter password",
    required: true,
    icon: (className: string) => <KeyIcon className={`${className}`} />,
  },
  {
    label: "Register",
    type: "submit",
    icon: (className: string) => <ArrowRightIcon className={`${className}`} />,
  },
];
const GoTo: GoToType = {
  label: "Login",
  des: "Already have account?",
  href: "/login",
};

const RegisterPage = () => {
  const router = useRouter();
  const initialState:State = { message: null, errors: {}, success: null };
  const [state, dispatch] = useFormState(createUser, initialState);


  useEffect(() => {
      if (state?.message === "User created successfully." && state?.success) {
        router.push("/login");
      }
  }, [state.message, state.success]);

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
          <h1 className="text-xl font-semibold mb-8">Create an account</h1>
          <div>
      {
        <p
          className={clsx(
            "mb-4 text-lg",
            { "text-blue-700": state?.success },
            { "text-red-500": !state?.success }
          )}
        >
          {state?.message || ""}
        </p>
      }
      <form action={dispatch}>
        {RegisterForm.map((item, index) => (
          <div key={index} className="flex flex-col">
            {item?.type !== "submit" ? (
              <div>
                <label className="mb-4 " htmlFor={item?.name}>
                  {item?.label}
                </label>
                <div className="relative">
                  <input
                    type={item?.type}
                    name={item?.name}
                    id={item?.name}
                    placeholder={item?.placeholder}
                    required={item?.required}
                    aria-describedby={`${item?.name}-error`}
                    className="py-3 text-lg border-gray-200 w-full pl-10 rounded-xl focus:outline-none focus:border-none"
                  />
                  {typeof item?.icon === "function" &&
                    item?.icon(
                      "peer w-[18px] h-[18px] absolute top-1/2 left-3 -translate-y-1/2  text-gray-500 peer-focus:text-gray-900"
                    )}
                </div>
                <div
                  className="mb-4"
                  id={`${item?.name}-error`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {item?.name === "email" && state?.errors?.email
                    ? state?.errors?.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))
                    : null}
                  {item?.name === "password" && state?.errors?.password
                    ? state?.errors?.password.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))
                    : null}
                  {item?.name === "confirm_password" &&
                  state?.errors?.confirm_password
                    ? state?.errors?.confirm_password.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))
                    : null}
                </div>
              </div>
            ) : (
              <button
                type="submit"
                // disabled={state?.message && state?.success !== null ? true: false}
                className={clsx(
                  "flex justify-between items-center py-3 px-4 w-full rounded-xl text-white font-normal",
                  { "bg-blue-700": state?.success === null },
                  { "bg-blue-400": state?.success !== null }
                )}
              >
                <p className="">{item?.label}</p>
                {typeof item?.icon === "function" &&
                  item?.icon("w-[20px] h-[20px]")}
              </button>
            )}
          </div>
        ))}
      </form>
      <div className="mt-4 text-lg text-center">
        <span>{GoTo.des}</span>
        <Link href={GoTo.href} className="text-blue-700 underline">
          {" "}
          {GoTo.label}
        </Link>
      </div>
    </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
