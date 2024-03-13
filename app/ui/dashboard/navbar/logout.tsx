"use client";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
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
  );
};

export default Logout;
