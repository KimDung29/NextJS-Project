"use client";
import { useRouter } from "next/navigation";
import { logout } from "@/app/lib/actions/auth";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/app/lib/store";
import { setAuth } from "@/app/lib/redux/auth/authSlice";
export interface LogoutType {
  cookie: string
}

const Logout = ({cookie}: LogoutType) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    if(cookie) {
        const result = await logout({});

        if (result?.message && result.message === "Logout successful") {
          dispatch(setAuth({ userName: '', email: '', accessToken: '' }));
          router.push("/");
        }
    }
  };
  
  return (
    <div className="flex  hover:text-blue-700 hover:bg-blue-100 pl-4 py-4">
      <button onClick={handleLogout} type="submit" className="flex items-center justify-center">
        <p>Sigout</p> 
        <ArrowUpRightIcon className="w-4 h-4 ml-2"/>
      </button>
    </div>
  );
};

export default Logout;
