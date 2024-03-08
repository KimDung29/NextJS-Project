'use client'
import { postMethod } from "@/app/lib/fetch_api/method";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Header = () => {

    const session = useSession();
    const userEmail =
      session.status === "authenticated" ? session.data.user?.email : "";
      console.log('sess: ', session)
    
    useEffect(() => {
        const fetchData = async() => {
            const res = await postMethod('/user', {userEmail});
            const data = await res.json();
            console.log('user: ', data)
        }
        fetchData();
    }, [])
  
    return (
        <div className="bg-gray-50 h-16">
            <p>Header</p>
            <p>{userEmail}</p>
        </div>
    )
}

export default Header;