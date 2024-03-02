'use client'
import Image from "next/image";
import { Form } from "../ui/form/form";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FormFieldType, GoToType } from "../lib/type-definitions";
import { useFormState } from "react-dom";
import { login } from "../lib/actions/login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


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

const GoTo:GoToType = {
  label: 'Register',
  des: 'Not have account yet?',
  href:"/register",
}

const LoginPage = () => {

  const router = useRouter();
  const initialState = {message: null, errors: {} , success: null};
  const [state, dispatch] = useFormState(login, initialState);

    useEffect(() => {
    if (state.message === 'Login successful') {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [state.message]);

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
          <Form data={LoginForm} dispatch={dispatch} state={state} goTo={GoTo}/>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
