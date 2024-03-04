import React from "react";
import { cookies } from "next/headers";
import { parseJwt } from "../lib/util/util";
import NavBar from "../ui/dashboard/navbar";

const DasboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");
  const cookie: string =
    typeof refreshToken?.value === "string" && parseJwt(refreshToken.value);

  return (
    <div className="flex min-h-screen ">
      <NavBar cookie={cookie} />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default DasboardLayout;
