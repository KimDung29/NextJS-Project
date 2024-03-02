'use client'

import { useAppDispatch, useAppSelector } from "@/app/lib/store";
import Logout from "../../form/logout";
import { useEffect } from "react";
import { setAuth } from "@/app/lib/features/auth/authSlice";


export interface NavBarType {
    auth: {
        userId: string | null,
        userName: string | null,
        userEmail: string | null,
        iat: number | null,
        exp: number | null
    }
}

const NavBar = ({auth}: NavBarType) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        auth && dispatch(setAuth(auth))
    }, [])
      
    return (
        <div>
            <div>
                <div>Dashboard</div>
                <Logout  />
            </div>
        </div>
    )
}

export default NavBar;