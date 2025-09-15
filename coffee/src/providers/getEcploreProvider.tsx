"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
type User = {
  bankCardId?: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  email: string | null;
  id: string | null;
  username:string | null
profile:UserProfile
};


type Users = User[];

type GetExploreContextType = {
  getExploreData: Users;
  getGetExploreDataRefetch: () => Promise<void>;
  setGetExploreData: (accounts: Users) => void;
  isLoading: boolean;
  error: string | null;
};

const GetExploreContext = createContext<GetExploreContextType | undefined>(
  undefined
);

export const GetExploreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [getExploreData, setGetExploreData] = useState<Users>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:4000/users");
      const data: Users = response.data;

      setGetExploreData(data);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GetExploreContext.Provider
      value={{
        getExploreData,
        setGetExploreData,
        getGetExploreDataRefetch: fetchData,
        isLoading,
        error,
      }}
    >
      {children}
    </GetExploreContext.Provider>
  );
};

export const useGetExplore = () => {
  const context = useContext(GetExploreContext);
  if (!context) {
    throw new Error("useGetExplore must be used within a GetExploreProvider");
  }
  return context;
};
