"use client";
import { postMethod } from "@/app/lib/fetch_api/method";
import { setUser } from "@/app/lib/redux/userSlice";
import store, { RootState } from "@/app/lib/store";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Header = () => {
  const path = usePathname();
  const session = useSession();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const userEmail =
    session.status === "authenticated" && session.data.user?.email;
    
  useEffect(() => {
    const fetchData = async () => {
      const res = await postMethod("/user", userEmail);
      if (!res.ok) {
        throw new Error("Fail to fetch user!");
      }

      const data = await res.json();
      setName(data.name);
      dispatch(setUser(data));
    };
    fetchData();
  }, [session?.data?.user?.email]);

  const userName = name && name.includes(" ") ? name.split(" ")[0] : name;
  const pathname =
    path && path.includes("/") ? path.split("/").slice(-1) : path;
  const userAvatar = "";

  return (
    <div className="bg-gray-50 ">
      <div className="flex justify-between items-center px-4 py-2">
        <p className="capitalize">{pathname}</p>
        <Link href={"/dashboard/profile"} className="flex items-center">
          <p className="mr-2 font-bold capitalize text-gray-700">Hi, {userName}</p>
          {userAvatar ? (
            <Image
              src={userAvatar}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <UserCircleIcon width={40} height={40} className="text-gray-600" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
