import React from "react";
import NavBar from "../ui/dashboard/navbar";
import { ReduxProvider } from "../ui/ReduxContext";
import Header from "../ui/dashboard/header";
import { SessionContext } from "../ui/SessionContext";
import toast, { Toaster } from 'react-hot-toast';

const DasboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen ">
      <ReduxProvider>
        <SessionContext>
        <NavBar />
        <div className="w-full">
          <Header />
          <Toaster />
          <div className="p-4">{children}</div>
        </div>
        </SessionContext>
      </ReduxProvider>
    </div>
  );
};

export default DasboardLayout;
