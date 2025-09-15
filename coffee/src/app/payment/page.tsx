"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "../_component_/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CardInput } from "@/components/ui/bankcard";

import { CountrySelector } from "@/components/selectCountery";
import { SelectMonth } from "@/components/selecetMonth";
import { usePayment } from "@/providers/payment-provider/createPaymentProvider";

const Payment = () => {
  const router = useRouter();

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

  const { setPayment, CreateBankCard, isLoading } = usePayment();

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
    await CreateBankCard();
  };

  return (
    <>
      <Header />

      <div className="w-full inline-flex flex-col justify-start items-center gap-6 mt-30">
        <div className="w-[510px] max-w-[672px] inline-flex flex-col justify-start items-start gap-12">
          <div>
            <h3>How would you like to be paid?</h3>
            <p className="text-[#71717A] text-sm font-normal">
              Enter location and payment details
            </p>
          </div>

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
                <p>Expiry Month</p>
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

          <div className="w-full flex justify-end">
            <Button
              className="bg-[#D1D1D1] w-[246px] flex justify-center items-center text-black hover:bg-black hover:text-white cursor-pointer"
              onClick={handleClick}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-l-[2px] border-t-[2px] border-white rounded-full animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
