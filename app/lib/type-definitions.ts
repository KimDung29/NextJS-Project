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
    username?: string;
    email: string;
    password: string;
};

export interface State{
    errors?: {
      email?: string[] | null;
      password?: string[] | null;
      confirm_password?: string[] | null;
    };
    message?: string | null;
    success?: boolean | null;
    token?: string | null
  };
