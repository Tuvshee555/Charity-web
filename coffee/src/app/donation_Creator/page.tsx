"use client";
import { Button } from "@/components/ui/button";
import { HeaderH } from "../_component_/_homeSettings_/HeaderH";
import { CameraIcon } from "lucide-react";
import { Amount_C } from "../_component_/donation_C_Right/Amount";
import { Social_Url_D } from "../_component_/donation_C_Right/Social_Url";
import { Message_D } from "../_component_/donation_C_Right/Message_D";
import { Support_D } from "../_component_/donation_C_Right/Support_Button";
import { Profile_Self } from "../_component_/donation-self/profile-self";
import { Social_URL_Self } from "../_component_/donation-self/social-self";
import { Recent_Self } from "../_component_/donation-self/recent-self";
import { Buy_Coffee_Self } from "../_component_/donation-self/buy-self-coffee";
const donation_Creator = () => {
  return (
    <div className="w-full h-[1000px] relative overflow-hidden">
      <HeaderH />
      <div className="w-full h-[319px] relative bg-[#F4F4F5] overflow-hidden inline-flex justify-center items-center gap-2">
        <Button className="w-[181px] bg-black text-white">
          <CameraIcon /> Add a cover image
        </Button>
      </div>
      <div className="w-[632px] h-auto justify-start items-start gap-5 absolute top-[289px] left-[80px]">
        <Profile_Self />
        <Social_URL_Self />
        <Recent_Self />
      </div>
      <div className="w-[628px] h-auto justify-start items-start gap-5 absolute top-[289px] left-[732px]">
        <div className="w-full h-auto p-6 rounded-lg outline border-[#E4E4E7] bg-white inline-flex flex-col justify-start items-start gap-2">
          <Buy_Coffee_Self />
          <div className="w-full mt-[26px] inline-flex flex-col gap-2">
            <Amount_C />
            <Social_Url_D user={undefined} />
            <Message_D />
            <Support_D userId={0} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default donation_Creator;
