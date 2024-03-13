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
  const [user, setUsers] = useState({
    id: '',
    name: '', 
    email: '',
    avatar: ''
  })

  const userEmail =
    session.status === "authenticated" && session.data.user?.email;
  useEffect(() => {
    const fetchData = async () => {
      const res = await postMethod("/user", userEmail);
      if (!res.ok) {
        throw new Error("Fail to fetch user!");
      }

      const data = await res.json();
      
      setUsers(data);
      dispatch(setUser(data));
    };
    fetchData();
  }, [session?.data?.user?.email]);

  const userName = user.name && user.name.includes(" ") ? user.name.split(" ")[0] : user.name;
  const pathname =
    path && path.includes("/") ? path.split("/").slice(-1) : path;

    return (
    <div className="bg-gray-50 ">
      <div className="flex justify-between items-center px-4 py-2">
        <p className="capitalize">{pathname}</p>
        <Link href={"/dashboard/profile"} className="flex items-center">
          <p className="mr-2 font-bold capitalize text-gray-700">Hi, {userName}</p>
          {user.avatar && (
            <div className="w-14 h-14 rounded-full bg-blue-400 overflow-hidden">
              <Image
                src={user?.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt="avatar"
                width={60}
                height={40}
                objectFit="cover"
                className=""
              />

            </div>
          ) }
        </Link>
      </div>
    </div>
  );
};

export default Header;
