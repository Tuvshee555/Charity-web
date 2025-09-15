"use client";
import { Header_V1 } from "./Header_V1";
import { Input } from "@/components/ui/input";
import { SelectMonth } from "@/components/selecetMonth";
import { Button } from "@/components/ui/button";
import { CountrySelector } from "@/components/selectCountery";
import { useState } from "react";
import { CardInput } from "@/components/ui/bankcard";
import { usePayment } from "@/providers/payment-provider/createPaymentProvider";
import { toast } from "react-toastify";
export const Payment_V1 = () => {
  const { setPayment, UpdateBankCard, isLoading } = usePayment();

  const [formValue, setFormValue] = useState<Payment>({
    id: null,
    country: null,
    firstName: null,
    lastName: null,
    cardNumber: null,
    expiryDate: null,
    year: null,
    cvc: null,
  });

  const onCountryChange = (value: string) => {
    setFormValue((prev) => ({ ...prev, country: value }));
  };

  const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, firstName: e.target.value }));
  };

  const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, lastName: e.target.value }));
  };

  const onCardNumberChange = (value: string) => {
    setFormValue((prev) => ({ ...prev, cardNumber: value }));
  };

  const onExpiryChange = (value: string) => {
    setFormValue((prev) => ({ ...prev, expiryDate: value }));
  };

  const onYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setFormValue((prev) => ({ ...prev, year: value }));
  };

  const onCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setFormValue((prev) => ({ ...prev, cvc: value }));
  };

  const handleClick = async () => {
    setPayment(formValue);
    await UpdateBankCard();
    toast.success("Successfully added Payment data good job!!!");
  };
  return (
    <div>
      <Header_V1 />
      <div className="w-full inline-flex flex-col gap-6 mt-[24px] justify-start items-start">
        <div className="w-[510px]">
          <p>Select country</p>
          <CountrySelector onChange={onCountryChange} />
        </div>

        <div className="w-[510px] flex gap-4">
          <div className="w-full">
            <p>First Name</p>
            <Input
              className="w-full mt-2"
              placeholder="Enter your name here"
              onChange={onFirstNameChange}
            />
          </div>
          <div className="w-full">
            <p>Last Name</p>
            <Input
              className="w-full mt-2"
              placeholder="Enter your name here"
              onChange={onLastNameChange}
            />
          </div>
        </div>

        <div className="w-[510px]">
          <p>Enter card number</p>
          <CardInput onChange={onCardNumberChange} />
        </div>

        <div className="w-full">
          <div className="w-full flex gap-4">
            <div className="w-full">
              <p>Express</p>
              <SelectMonth onChange={onExpiryChange} />
            </div>

            <div className="w-full">
              <p>Year</p>
              <Input
                type="text"
                maxLength={4}
                placeholder="YYYY"
                onChange={onYearChange}
                value={formValue.year || ""}
              />
            </div>
            <div className="w-full">
              <p>CVC</p>
              <Input
                type="text"
                maxLength={3}
                placeholder="Enter CVC"
                onChange={onCVCChange}
                value={formValue.cvc || ""}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start">
          <Button
            className="bg-black w-full flex justify-center items-center text-white cursor-pointer"
            onClick={handleClick}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-l-[2px] border-t-[2px] border-white rounded-full animate-spin" />
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
