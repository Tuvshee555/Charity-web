"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useUserData } from "../AuthenticationProvider";
import axios from "axios";

type UpdateProfile = {
  image: string | null;
  name: string | null;
  about: string | null;
  socialMediaURL: string | null;
  userID: string | null;
  ConfirmationMessage? : string | null
};

type UpdateProfileContextType = {
  updateProfile: UpdateProfile;
  refetch: () => Promise<void>;
  setUpdateProfile: (account: UpdateProfile) => void;
  isLoading: boolean;
  error: string | null;
};

const UpdateProfileContext = createContext<
  UpdateProfileContextType | undefined
>(undefined);

export const UpdateProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const decodedToken = useUserData();
  const [updateProfile, setUpdateProfile] = useState<UpdateProfile>({
    image: null,
    name: null,
    about: null,
    socialMediaURL: null,
    userID: null,
    ConfirmationMessage:null
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:4000/profile/${decodedToken?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatarImage: updateProfile.image,
            backgroundImage: null,
            name: updateProfile.name,
            about: updateProfile.about,
            socialMediaURL: updateProfile.socialMediaURL,
            ConfirmationMessage:updateProfile.ConfirmationMessage
          }),
        }
      );

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UpdateProfileContext.Provider
      value={{
        updateProfile,
        setUpdateProfile,
        refetch: fetchData,
        isLoading,
        error,
      }}
    >
      {children}
    </UpdateProfileContext.Provider>
  );
};

export const useUpdateProfile = () => {
  const context = useContext(UpdateProfileContext);
  if (!context) {
    throw new Error(
      "useUpdateProfile must be used within an UpdateProfileProvider"
    );
  }
  return context;
};
