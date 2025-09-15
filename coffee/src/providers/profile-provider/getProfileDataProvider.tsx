"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUserData } from "../AuthenticationProvider";
import axios from "axios";

type GetProfileDataContextType = {
  getProfileData: UserProfile | undefined;
  getRefetch: () => Promise<void>;
  setGetProfileData: (account: UserProfile) => void;
  isLoading: boolean;
  error: string | null;
};

const GetProfileDataContext = createContext<
  GetProfileDataContextType | undefined
>(undefined);

export const GetProfileDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const decodedToken = useUserData();
  const [getProfileData, setGetProfileData] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!decodedToken?.id) return;


    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:4000/profile/${decodedToken.id}`
      );

      setGetProfileData(response.data.profileData);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (decodedToken?.id) {
      fetchData();
    }
  }, [decodedToken?.id]);

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

export const useGetProfileData = () => {
  const context = useContext(GetProfileDataContext);
  if (!context) {
    throw new Error(
      "useGetProfileData must be used within a GetProfileDataProvider"
    );
  }
  return context;
};
