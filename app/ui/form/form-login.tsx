"use client";
import { useRouter } from "next/navigation";
import { FormFieldType, GoToType, State } from "../../lib/type-definitions";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { parseJwt } from "@/app/lib/util/util";
import { AuthState, setAuth } from '@/app/lib/redux/auth/authSlice';
import { useAppDispatch } from '@/app/lib/store';

export interface FormType {
  data: FormFieldType[];
  dispatch: (payload: FormData) => void;
  state: State;
  goTo: GoToType;
}

export const FormLogin = ({ data, dispatch, state, goTo }: FormType) => {
  const router = useRouter();
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
      const auth: AuthState = state.accessToken && parseJwt(state.accessToken);

      if (state.message === "Login successful" && state?.success) {
          reduxDispatch(setAuth(auth));
          router.push("/dashboard");
      }
  }, [state.message, state.success]);

  return (
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
        <span>{goTo.des}</span>
        <Link href={goTo.href} className="text-blue-700 underline">
          {" "}
          {goTo.label}
        </Link>
      </div>
    </div>
  );
};
