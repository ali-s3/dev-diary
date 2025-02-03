"use client";
import { createContext } from "react";
import { User } from "@/types/globals";

interface UserContextType {
    user: User | null;
}
export const UserContext = createContext<UserContextType>({ user: null });
