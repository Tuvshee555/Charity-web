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

// Define the type for your profile creation state
type CreateProfile = {
  image: string | null;
  name: string | null;
  about: string | null;
  socialMediaURL: string | null;
  userID: number | null;
};

// Define the context shape
type CreateProfileContextType = {
  createProfile: CreateProfile;
  setCreateProfile: (profile: CreateProfile) => void;
  refetch: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

// Create context
const CreateProfileContext = createContext<
  CreateProfileContextType | undefined
>(undefined);

// Provider component
export const CreateProfileProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  const decodedToken = useUserData();

  const [createProfile, setCreateProfile] = useState<CreateProfile>({
    image: null,
    name: null,
    about: null,
    socialMediaURL: null,
    userID: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch logic to create profile
  const refetch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatarImage: createProfile.image,
          backgroundImage: null,
          name: createProfile.name,
          about: createProfile.about,
          socialMediaURL: createProfile.socialMediaURL,
          userId: createProfile.userID,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server responded with error: ${text}`);
      }

      const data = await response.json();

      if (data.success) {
        router.push("/payment");
      } else {
        throw new Error(data.message || "Failed to create profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CreateProfileContext.Provider
      value={{
        createProfile,
        setCreateProfile,
        refetch,
        isLoading,
        error,
      }}
    >
      {children}
    </CreateProfileContext.Provider>
  );
};

// Hook to use the context
export const useCreateProfile = () => {
  const context = useContext(CreateProfileContext);
  if (!context) {
    throw new Error(
      "useCreateProfile must be used within a CreateProfileProvider"
    );
  }
  return context;
};
