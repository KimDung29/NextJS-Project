import React from "react";
import NavBar from "../ui/dashboard/navbar";
import { ReduxProvider } from "../ui/ReduxContext";
import Header from "../ui/dashboard/header";

const DasboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen ">
      <ReduxProvider>
        <NavBar />
        <div className="w-full">
          <Header />
          <div className="p-4">{children}</div>
        </div>
      </ReduxProvider>
    </div>
  );
};

export default DasboardLayout;
