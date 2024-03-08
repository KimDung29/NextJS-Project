"use client";
import Image from "next/image";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
import { postMethod } from "../lib/fetch_api/method";
import { FormAuthErr, FormFieldType, GoToType } from "../lib/types";
import FormAuth from "../ui/form/auth";

const RegisterForm: FormFieldType[] = [
  {
    label: "Name",
    type: "text",
    name: "name",
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

  const [err, setErr] = useState({
    errors: {
      email: [],
      password: [],
      confirm_password: [],
    },
    message: "",
  } as FormAuthErr);
  
  const success = err.message === "User created successfully." ? true : false;
  const message = err.message;

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    };
    const fetchData = async () => {
      try {
        const res = await postMethod("/auth/register", user);
        if (!res.ok) {
          const getErrors = await res.json();
          setErr(getErrors);
          throw new Error("Fail to login");
        } else {
          const response = await res.json();

          setErr((pre) => ({
            ...pre,
            message: response.message,
          }));

          router.push("/login");
        }
      } catch (error) {
        console.log("err: ", error);
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
          <h1 className="text-xl font-semibold mb-8">Create an account</h1>
          <FormAuth
              data={RegisterForm}
              goTo={GoTo}
              message={message}
              success={success}
              handleSubmit={handleRegister}
              err={err}
            />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;

