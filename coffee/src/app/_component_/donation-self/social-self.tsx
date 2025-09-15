"use client";
 
 import { useGetProfileData } from "@/providers/profile-provider/getProfileDataProvider";
 export const Social_URL_Self = () => {
   const { getProfileData } = useGetProfileData();
   return (
     <div className="w-full h-auto p-6 rounded-lg outline border-[#E4E4E7] bg-white inline-flex flex-col justify-start items-start gap-2 mt-[20px]">
       <div className="flex-col">
         <span className="text-base font-semibold font-['Inter'] leading-normal">
           Social media URL
         </span>
         <div className="mt-[18px]">
           <span className="text-sm font-normal font-['Inter'] leading-tight">
             {getProfileData?.socialMediaURL}
           </span>
         </div>
       </div>
     </div>
   );
 };