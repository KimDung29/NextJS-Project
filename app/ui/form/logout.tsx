"use client";
import { useFormState } from "react-dom";
import { logout } from "../../lib/actions/login";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/store";


const Logout = () => {
  const router = useRouter();
  const email = useAppSelector((state: any) => state.auth.email);

  const handleLogout = async () => {
    if(email) {
        const result = await logout({});

        if (result?.message && result.message === "Logout successful") {
            router.push("/");
        }
    }
  };
  
  return (
    <button onClick={handleLogout} type="submit">
      Sigout
    </button>
  );
};

export default Logout;
