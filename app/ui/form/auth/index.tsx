"use client";
import Link from "next/link";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import Image from "next/image.js";
import { FormAuthType } from "@/app/lib/types";


const FormAuth = ({ data, goTo, message, handleSubmit, err, success }: FormAuthType) => {

  return (
    <div>
      {
        <p
          className={clsx(
            "mb-4 text-lg",
            { "text-blue-700": message === "Login successful" },
            { "text-red-500": message !== "Login successful" }
          )}
        >
          {message || ""} 
        </p>
      }
      <form onSubmit={handleSubmit}>
        {data.map((item, index) => (
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
                  {item?.name === "email" && displayErr(err?.errors?.email)}
                  {item?.name === "password" &&
                    displayErr(err?.errors?.password)}
                  {item?.name === "confirm_password" &&
                    displayErr(err?.errors?.confirm_password)}
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={success ? true : false}
                className={clsx(
                  " text-white flex justify-between items-center py-3 px-4 w-full ",
                  { "bg-blue-700": !success },
                  { "bg-blue-400": success}
                )}
              >
                <p className="">{item?.label}</p>
                {typeof item?.icon === "function" &&
                  item?.icon("w-[20px] h-[20px]")}
              </button>
            )}
          </div>
        ))}
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          onClick={() => signIn('google', {callbackUrl:'/'})}
          className="flex justify-center gap-4 items-center py-3 px-4 w-full rounded-xl font-normal border">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>
      </form>
      <div className="mt-4 text-lg text-center">
        <span>{goTo.des}</span>
        <Link href={goTo.href} className="text-blue-700 underline">
          {" "}
          {goTo.label}
        </Link>
      </div>
    </div>
  );
};

export default FormAuth;
const displayErr = (err: string[]) => {
  return (
    <>
      {err
        ? err.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))
        : null}
    </>
  );
};
