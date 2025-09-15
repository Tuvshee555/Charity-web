"use client";
import { Input } from "@/components/ui/input";
import { useGetProfileData } from "@/providers/profile-provider/getProfileDataProvider";
import { profile } from "console";

export const Social_Url_D = ({ user }: { user: any }) => {
  const getProfileAllData = useGetProfileData()
  return (
    <div className="mt-[32px] flex-col">
      <span className="text-sm font-medium leading-none mb-[8px]">
        Enter BuyMeCoffee or social account URL:
      </span>
      <div>
        <Input className="w-full" placeholder={` ${ getProfileAllData.getProfileData?.socialMediaURL ||"buymeacoffee.com/"}`} />
      </div>
    </div>
  );
};
