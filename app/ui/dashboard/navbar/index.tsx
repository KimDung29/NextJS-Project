"use client";
import store from "@/app/lib/store";
import { Provider } from "react-redux";
import Logout from "../logout";
import {
  ClipboardDocumentIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { NavBarListRouteType } from "@/app/lib/type-definitions";

export interface NavBarType {
  cookie: string,
}

const List: NavBarListRouteType[] = [
  {
    icon: (className: string) => <HomeIcon className={`${className}`} />,
    href: "/dashboard",
    label: "Home",
  },
  {
    icon: (className: string) => (
      <ClipboardDocumentIcon className={`${className}`} />
    ),
    href: "/dashboard/invoices",
    label: "Invoices",
  },
  {
    icon: (className: string) => <UserGroupIcon className={`${className}`} />,
    href: "/dashboard/customers",
    label: "Customers",
  },
];

const NavBar = ({ cookie }: NavBarType) => {
  return (
    <div className="w-40 bg-gray-50  min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="bg-blue-700 rounded-md">
          <Image src={'/logo.png'} alt="logo" width={90} height={40} className="ml-8"/>
        </div>
        <div className="flex flex-col mt-10">
          {List.map((item, i) => (
            <div key={"list route" + i} className="flex  hover:text-blue-700 hover:bg-blue-100 pl-4 py-4">
              {typeof item?.icon === "function" && item?.icon("w-6 h-6")}
              <Link href={`${item.href}`} className="ml-3">
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Provider store={store}>
        <div className="h-16">
          <Logout cookie={cookie} />
        </div>
      </Provider>
    </div>
  );
};

export default NavBar;
