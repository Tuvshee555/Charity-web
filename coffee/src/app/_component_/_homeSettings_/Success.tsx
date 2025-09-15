import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { useUpdateProfile } from "@/providers/profile-provider/UpdateProfileProvider";
import { useGetProfileData } from "@/providers/profile-provider/getProfileDataProvider";
export const Success = () => {
  const { updateProfile, setUpdateProfile, refetch, isLoading, error } =
    useUpdateProfile();
  const { getProfileData, getRefetch } = useGetProfileData();
  const [formValue, setFormValue] = useState({
    image: updateProfile.image || (getProfileData?.avatarImage as string),
    name: updateProfile.name || (getProfileData?.name as string),
    about: updateProfile.about || (getProfileData?.about as string),
    socialMediaURL:
      updateProfile.socialMediaURL ||
      (getProfileData?.socialMediaURL as string),
    userID: updateProfile.userID,
    ConfirmationMessage: ''

  });

  const onConfirmationmessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, ConfirmationMessage: e.target.value }));
  }
  return (
    <div className="w-full p-6 rounded-lg outline border-[#E4E4E7] flex-col inline-flex gap-6">
      <div className="justify-start items-start gap-6">
        <span className="text-base font-bold leading-7">Success page</span>
        <div className="mt-[24px]">
          <span className="text-sm font-medium leading-none">
            Confirmation message
          </span>
          <Input
            className="w-full h-auto"
            placeholder="*Confirmation message here*"
            onChange={onConfirmationmessageChange}
          />
        </div>
        <div className="mt-[24px]">
          <Button className="w-full bg-black text-white"onClick={refetch}>
            {isLoading ? ( <div className="w-5 h-5 border-l-[2px] border-t-[2px] border-white rounded-full animate-spin" />) : 
             ("Save changes")}
          </Button>
        </div>
      </div>
    </div>
  );
};
