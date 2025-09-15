"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/providers/sign-up-login-provider/changePassowordProvider";
import { useState } from "react";
import { toast } from "react-toastify";

export const Set_New_Pass = () => {
  const { changePassword, setPasswordData, isLoading, error } =
    useChangePassword();
  const [formValue, setFormValue] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [localError, setLocalError] = useState("");

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, newPassword: e.target.value }));
  };

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, confirmNewPassword: e.target.value }));
  };

  const onSubmit = async () => {
    if (formValue.newPassword !== formValue.confirmNewPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    setLocalError("");
    setPasswordData(formValue);
    await changePassword();
    toast.success("Succesfully updated new password good job !");
  };

  return (
    <div className="w-full p-6 rounded-lg outline border-[#E4E4E7] flex-col inline-flex gap-6">
      <div className="justify-start items-start gap-6">
        <div>
          <span className="text-base font-bold leading-7">
            Set new password
          </span>
        </div>
        <div className="gap-3 mt-[24px]">
          <span className="text-sm font-medium leading-none">New password</span>
          <Input
            onChange={onPasswordChange}
            value={formValue.newPassword}
            placeholder="Enter new password"
            type="password"
          />
        </div>
        <div className="mt-[12px]">
          <span className="text-sm font-medium leading-none">
            Confirm password
          </span>
          <Input
            onChange={onConfirmPasswordChange}
            value={formValue.confirmNewPassword}
            placeholder="Confirm password"
            type="password"
          />
        </div>
        {localError && (
          <div className="text-red-500 text-sm mt-2">{localError}</div>
        )}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="mt-[24px]">
          <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};
