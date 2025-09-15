"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

type Donation = {
  amount: number | null;
  specialMessage: string | null;
  socialURLOrBuyMeACoffee: string | null;
  donorId: number | null;
  recipientId: number | null;
};

type DonationResponse = {
  success: boolean;
  donation?: Donation;
  message?: string;
};

type DonationContextType = {
  donation: Donation;
  refetch: () => Promise<void>;
  setDonation: (donation: Donation) => void;
  isLoading: boolean;
  error: string | null;
};

const DonationContext = createContext<DonationContextType | undefined>(
  undefined
);

export const DonationProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [donation, setDonation] = useState<Donation>({
    amount: null,
    specialMessage: null,
    socialURLOrBuyMeACoffee: null,
    donorId: null,
    recipientId: null,
  });
  console.table(donation);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donation),
      });
    
      if (!response.ok) {
        throw new Error("Network error");
      }

      const data: DonationResponse = await response.json();
console.log(data)
      if (data.success && data.donation) {
        setDonation(data.donation);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch {
      setError("Failed to send donation.");
    } finally {
      setIsLoading(false);
    }
  }, [donation, router]);

  return (
    <DonationContext.Provider
      value={{
        donation,
        setDonation,
        refetch: fetchData,
        isLoading,
        error,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
};
