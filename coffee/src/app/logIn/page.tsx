"use client";

import { LeftTable } from "../_component_/LeftTable";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
type login = {
  email: string | null;
  password: string | null;
};

export default function LogIn() {
  const router = useRouter();
  const [formValue, setFormValue] = useState<login>({
    email: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const LoginUser = async () => {
    setIsLoading(true);
    setError(undefined);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formValue.email || !emailRegex.test(formValue.email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formValue.email,
          password: formValue.password,
        }),
      });

      const data = await response.json();
      setError(data.message);

      if (data.success) {
        router.push("/home");
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onEmailChange = (e: { target: { value: string } }) => {
    setFormValue((prev) => ({ ...prev, email: e.target.value }));
  };
  const onPasswordChange = (e: { target: { value: string } }) => {
    setFormValue((prev) => ({ ...prev, password: e.target.value }));
  };
  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="w-1/2 h-full">
          <LeftTable />
        </div>
        <div className="w-1/2 h-full relative flex flex-col justify-center items-center bg-white">
          <Button
            className="absolute top-8 right-8 bg-gray-100 px-4 py-1 rounded-md text-[black]"
            onClick={() => router.push("/sign_up")}
          >
            Sign up
          </Button>
          <div className="w-[320px]">
            <h2 className="text-[black] font-semibold mb-4">Welcome back</h2>
            <div className="mb-3">
              <label className="block text-[black] mb-1">Email</label>
              <Input
                type="email"
                placeholder="Enter email here"
                className="w-full px-3 py-2 border rounded"
                onChange={onEmailChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-[black] mb-1">Password</label>
              <Input
                type="password"
                placeholder="Enter password here"
                className="w-full px-3 py-2 border rounded"
                onChange={onPasswordChange}
              />
            </div>
            {error && <p className="text-red-500 mb-[10px] text-sm">{error}</p>}
            <Button
              className="w-full bg-[black] text-white py-2 rounded"
              onClick={LoginUser}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
