"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import React from "react";
import { Loading } from "@/components/loading";

type UserContextType = {
  email: string;
  id: number;
  username: string;
  exp: number;
  iat: number;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserContextType>();
  const [isLoading, setIsLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { decodedToken, isExpired } = useJwt(token ?? "");

  useEffect(() => {
    if (!token || isExpired) {
      router.push("/logIn");
      return;
    }

    if (decodedToken && typeof decodedToken === "object" && "id" in decodedToken) {
      setUserData(decodedToken as UserContextType);
      setIsLoading(false);
    }
  }, [decodedToken, token, isExpired, router]);

  if (isLoading || !userData) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
