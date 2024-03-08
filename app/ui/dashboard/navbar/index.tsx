"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { NavBarListRouteType } from "@/app/lib/types";
import {
  ClipboardDocumentIcon,
  HomeIcon,
  UserGroupIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const NavBarListRoute: NavBarListRouteType[] = [
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
const NavBar = () => {
  return (
    <div className="w-40 bg-gray-50  min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="bg-blue-700 rounded-md">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={90}
            height={40}
            className="ml-8"
          />
        </div>
        <div className="pl-4 mt-2"></div>
        <div className="flex flex-col mt-10">
          {NavBarListRoute.map((item, i) => (
            <Link
              href={`${item.href}`}
              key={"list route" + i}
              className="flex items-center py-4 px-2 hover:text-blue-700  hover:bg-blue-100 hover:cursor-pointer"
            >
              {typeof item?.icon === "function" &&
                item?.icon("w-8 h-8  ml-2 ")}
              <p className="ml-3 ">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="h-16">
        <div
          onClick={() => signOut()}
          className="flex  hover:text-blue-700 hover:bg-blue-100 hover:cursor-pointer pl-4 py-4"
        >
          <div className="flex items-center justify-center">
            <p>Sigout</p>
            <ArrowUpRightIcon className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
