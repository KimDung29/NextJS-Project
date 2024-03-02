'use client';
import Image from "next/image";
import { Form } from "../ui/form/form";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FormFieldType, GoToType } from "../lib/type-definitions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createUser } from "../lib/actions/create-user";

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
const GoTo:GoToType = {
  label: 'Login',
  des: 'Already have account?',
  href:"/login",
}

const RegisterPage = () => {
  const initialState = {message: null, errors: {} , success: null};
  const [state, dispatch] = useFormState(createUser, initialState);

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
            Create an account
          </h1>
          <Form data={RegisterForm} dispatch={dispatch} state={state} goTo={GoTo}/>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;