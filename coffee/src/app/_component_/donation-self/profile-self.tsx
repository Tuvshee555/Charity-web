"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Line_C } from "../donation-C/Line";
import { useGetProfileData } from "@/providers/profile-provider/getProfileDataProvider";
export const Profile_Self = () => {
  const { getProfileData } = useGetProfileData();
  return (
    <div className="w-full h-auto p-6 rounded-lg outline border-[#E4E4E7] bg-white inline-flex flex-col justify-start items-start gap-2">
      <div className="w-full flex justify-between items-between">
        <div className="flex">
          <Avatar>
            <AvatarImage src={getProfileData?.avatarImage} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <span className="text-xl font-bold leading-normal ml-[12px]">
            {getProfileData?.name}
          </span>
        </div>
        <div className="flex justify-between items-between">
          <Button className="justify-end bg-[#F4F4F5] text-black">
            Edit page
          </Button>
        </div>
      </div>
      <div>
        <Line_C />
      </div>
      <div className="flex-col">
        <span className="text-base font-semibold leading-normal">
          About {getProfileData?.name}
        </span>
        <div>
          <span className="text-sm font-normal leading-tight">
            {getProfileData?.about || "No bio provided"}
          </span>
        </div>
      </div>
    </div>
  );
};
