"use client";

import { createContext, useContext, useState } from "react";
import { useUserData } from "../AuthenticationProvider";

type ChangePasswordInput = {

    newPassword: string;
    confirmNewPassword:string
};

type ChangePasswordContextType = {
  passwordData: ChangePasswordInput;
  setPasswordData: (data: ChangePasswordInput) => void;
  changePassword: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const ChangePasswordContext = createContext<ChangePasswordContextType | undefined>(undefined);

export const ChangePasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const decodedToken = useUserData();
  const [passwordData, setPasswordData] = useState<ChangePasswordInput>({

    newPassword: "",
    confirmNewPassword:""
  
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async () => {
    setIsLoading(true);
    setError(null);

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/auth/change-password/${decodedToken?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }

   
    } catch (err: any) {
      setError(err.message);
      console.error("Error changing password:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChangePasswordContext.Provider
      value={{ passwordData, setPasswordData, changePassword, isLoading, error }}
    >
      {children}
    </ChangePasswordContext.Provider>
  );
};

export const useChangePassword = () => {
  const context = useContext(ChangePasswordContext);
  if (!context) {
    throw new Error("useChangePassword must be used within a ChangePasswordProvider");
  }
  return context;
};
