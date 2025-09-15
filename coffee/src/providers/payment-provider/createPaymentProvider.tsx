"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useUserData } from "../AuthenticationProvider";
import axios from "axios";
type PaymentContextType = {
  payment: Payment;
  CreateBankCard: () => Promise<void>;
  UpdateBankCard: () => Promise<void>;
  setPayment: (payment: Payment) => void;
  isLoading: boolean;
  error: string | null;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const decodedToken = useUserData();

  const [payment, setPayment] = useState<Payment>({
    id: decodedToken?.id ?? null,
    country: null,
    firstName: null,
    lastName: null,
    cardNumber: null,
    expiryDate: null,
    year: null,
    cvc: null,
  });


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBankCardData = async (id: number | undefined) => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:4000/bankCard/${id}`);
 
      setPayment(response.data);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Error fetching card data");
    } finally {
      setIsLoading(false);
    }
  };

  const CreateBankCard = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!payment.cardNumber || !payment.expiryDate || !payment.cvc) {
        setError("Missing required fields");
        return;
      }

      const expiryMonth = new Date(payment.expiryDate).getMonth() + 1;
      const expiryYear = new Date(payment.expiryDate).getFullYear();

      const response = await fetch("http://localhost:4000/bankCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: decodedToken?.id,
          country: payment.country,
          firstName: payment.firstName,
          lastName: payment.lastName,
          cardNumber: payment.cardNumber,
          expiryMonth,
          expiryYear,
          cvc: payment.cvc,
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/home");
      } else {
        setError(data.message || "Payment failed.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      await getBankCardData(decodedToken?.id);
      setIsLoading(false);
    }
  };

  const UpdateBankCard = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/bankCard", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/logIn");
      } else {
        setError(data.message || "Payment update failed.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      await getBankCardData(decodedToken?.id);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (decodedToken?.id) {
      getBankCardData(decodedToken.id);
    }
  }, [decodedToken?.id]);

  return (
    <PaymentContext.Provider
      value={{
        payment,
        setPayment,
        CreateBankCard,
        UpdateBankCard,
        isLoading,
        error,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};