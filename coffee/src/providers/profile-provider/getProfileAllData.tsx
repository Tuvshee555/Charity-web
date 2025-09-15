"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useUserData } from "../AuthenticationProvider";
import axios from "axios";


 type UserProfile = {
  id: number | null;
  name: string | null;
  about: string | null;
  avatarImage: string | null;
  socialMediaURL: string | null;
  backgroundImage: string | null;
  successMessage: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  userId: number | null;
};

type GetProfileAllDataContextType = {
  getProfileData: UserProfile[];
  getRefetch: () => Promise<void>;
  setGetProfileData: (accounts: UserProfile[]) => void;
  isLoading: boolean;
  error: string | null;
};

const GetProfileDataContext = createContext<GetProfileAllDataContextType | undefined>(undefined); 

export const GetProfileAllDataProvider = ({ children }: { children: React.ReactNode }) => {
  const decodedToken = useUserData(); 
  const [getProfileData, setGetProfileData] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:4000/profile");
      const data: UserProfile[] = response.data;
      if (data) {
        setGetProfileData(data);
      } else {
        setError("Expected an array of profile data.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (decodedToken) {
      fetchData();
    }
  }, [decodedToken, fetchData]);

  return (
    <GetProfileDataContext.Provider
      value={{
        getProfileData,
        setGetProfileData,
        getRefetch: fetchData,
        isLoading,
        error,
      }}
    >
      {children}
    </GetProfileDataContext.Provider>
  );
};

export const useGetProfilAlleData = () => {
  const context = useContext(GetProfileDataContext);
  if (!context) {
    throw new Error("useGetProfileData must be used within a GetProfileAllDataProvider");
  }
  return context;
};
