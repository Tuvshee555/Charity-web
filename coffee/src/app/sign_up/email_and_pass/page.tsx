"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useCreateAccount } from "@/providers/sign-up-login-provider/CreateAccountProvider";
import { toast } from "react-toastify";
import { LeftSide } from "@/app/_component_/LeftSide";
export default function Email_And_Pass() {
  const { createAccount, setCreateAccount, refetch, isLoading, error } =
    useCreateAccount();
  console.log(error);

  const [formValue, setFormValue] = useState<CreateAccount>({
    username: createAccount.username,
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  useEffect(() => {
    setCreateAccount(formValue);
  }, [formValue]);

  useEffect(() => {
    if (formValue.username === null) {
      router.push("/sign_up");
    }
  });

  const onEmailChange = (e: { target: { value: string } }) => {
    setFormValue((prev) => ({ ...prev, email: e.target.value }));
  };

  const onPasswordChange = (e: { target: { value: string } }) => {
    setFormValue((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleSubmit = async () => {
    let isValid = true;
    setFormErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Validation checks
    if (!formValue?.email?.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Please enter your email.",
      }));
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValue.email.trim())) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
    }

    if (!formValue?.password?.trim()) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Please create a password.",
      }));
      isValid = false;
    }

    if (isValid) {
      refetch();
      console.log("Form submitted successfully");
      toast.success("Successfulyy loged in");
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="w-1/2 h-full">
          <LeftSide />
        </div>
        <div className="w-1/2 h-full relative flex flex-col justify-center items-center bg-white">
          <Button
            className="absolute top-8 right-8 bg-gray-100 px-4 py-1 rounded-md text-[black]"
            onClick={() => router.push("/logIn")}
          >
            Log in
          </Button>
          <div className="w-[320px]">
            <h2 className="text-[black] font-semibold mb-4">
              Welcome, {formValue.username}
            </h2>
            <div className="mb-3">
              <label className="block text-[black] mb-1">Email</label>
              <Input
                type="email"
                placeholder="Enter email here"
                className="w-full px-3 py-2 border rounded"
                onChange={onEmailChange}
              />
              {formErrors.email && (
                <p className="text-red-500">{formErrors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-[black] mb-1">Password</label>
              <Input
                type="password"
                placeholder="Enter password here"
                className="w-full px-3 py-2 border rounded"
                onChange={onPasswordChange}
              />
              {formErrors.password && (
                <p className="text-red-500">{formErrors.password}</p>
              )}
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <Button
              className="w-full bg-[black] text-white py-2 rounded"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-l-[2px] border-t-[2px] border-white rounded-full animate-spin"></div>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
