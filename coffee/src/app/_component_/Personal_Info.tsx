"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetProfileData } from "@/providers/profile-provider/getProfileDataProvider";
import { ChangeEvent, useEffect, useState } from "react";
import { AvatarUpdate } from "./persenal_info_avatarIMG";
import { useUpdateProfile } from "@/providers/profile-provider/UpdateProfileProvider";
import { toast } from "react-toastify";
export const Personal_Info = () => {
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
  });

  const [profileData, setProfileData] = useState<UserProfile>();

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, name: e.target.value }));
  };

  const onAboutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, about: e.target.value }));
  };

  const onSocialChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, socialMediaURL: e.target.value }));
  };

  const onImageChange = (url: string) => {
    setFormValue((prev) => ({ ...prev, image: url }));
  };

  useEffect(() => {
    setProfileData(getProfileData);
    toast.success("Good Job");
  }, [getProfileData]);

  useEffect(() => {
    setUpdateProfile(formValue);
  }, [formValue, setUpdateProfile]);
  useEffect(() => {
    if (isLoading) {
      getRefetch;
    }
  }, [isLoading]);

  return (
    <div className="w-[650px] h-auto rounded-lg outline p-6 border-[#E4E4E7] flex-col inline-flex gap-6">
      <div>
        <span className="text-base font-bold leading-7">Personal Info</span>
      </div>
      <div className="inline-flex flex-col justify-start items-start gap-3">
        <span className="text-sm font-medium leading-none">Add photo</span>
        <AvatarUpdate
          avatarImage={profileData?.avatarImage}
          onChange={onImageChange}
        />
      </div>
      <div className="inline-flex flex-col justify-start items-start gap-3">
        <div className="w-full h-auto flex-col justify-start items-start gap-2">
          <div className="gap-3">
            <span className="text-sm font-medium leading-none">Name</span>
            <Input onChange={onNameChange} placeholder={profileData?.name} />
          </div>
          <div className="mt-[12px]">
            <span className="text-sm font-medium leading-none">About</span>
            <Input onChange={onAboutChange} placeholder={profileData?.about} />
          </div>
          <div className="mt-[12px]">
            <span className="text-sm font-medium leading-none">
              Social media URL
            </span>
            <Input
              onChange={onSocialChange}
              placeholder={profileData?.socialMediaURL}
            />
          </div>
          <div className="mt-[34px]">
            <Button
              className="w-full text-sm font-medium leading-tight"
              onClick={refetch}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
