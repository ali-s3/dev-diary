"use client";
import { UserContext } from "../utils/authentication/UserContext";
import Account from "./page";
import { ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const {user} = useContext(UserContext);
    const isAuthenticated = user !== null;
    
    if (!isAuthenticated) {
        console.log("User is not authenticated. Redirecting to account page.");
        // useRouter().push("/account");
    }
    console.log("User is authenticated. Displaying children.", user);

    return (
        <>
            {!isAuthenticated && (
                <UserContext.Provider value={{user}}>
                    {children}
                </UserContext.Provider>
            )}
        </>
    );
} 