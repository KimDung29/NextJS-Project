import { FormEvent } from "react";

export interface FormFieldType {
  label?: string,
  type?: string,
  name?: string,
  placeholder?: string,
  icon?: (cls: string) => JSX.Element,
  required?: boolean,
}
export type GoToType = {
  label: string,
  des: string,
  href: string,
}

export type User = {
  id?: string;
  name?: string;
  email: string;
  password: string;
};

export interface State {
  errors?: {
    email?: string[] | null;
    password?: string[] | null;
    confirm_password?: string[] | null;
  };
  message?: string | null;
  success?: boolean | null;
  accessToken?: string | null
};
export interface NavBarListRouteType {
  icon: (i: string) => JSX.Element;
  href: string;
  label: string;
}

export interface FormAuthType {
  data: FormFieldType[];
  goTo: GoToType;
  message: string,
  handleSubmit: (e: FormEvent<HTMLFormElement> ) => void,
  err: FormAuthErr,
  success: boolean
}

export interface FormAuthErr {
  errors: {
    email: string[],
    password: string[],
    confirm_password: string[],
  },
  message: string
}
