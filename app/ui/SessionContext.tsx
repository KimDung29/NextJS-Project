'use client'
import { SessionProvider } from "next-auth/react";

export function SessionContext( {children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}