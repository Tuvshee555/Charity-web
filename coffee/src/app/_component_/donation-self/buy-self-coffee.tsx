"use client";
import { useGetProfileData } from "@/providers/profile-provider/getProfileDataProvider";

export const Buy_Coffee_Self = () => {
  const { getProfileData } = useGetProfileData();
  return (
    <div>
      <span className="text-2xl font-semibold font-['Inter'] leading-loose">
        {" "}
        Buy {getProfileData?.name} a Coffee
      </span>
    </div>
  );
};
