"use client";
import { HeaderH } from "@/app/_component_/_homeSettings_/HeaderH";
import { Buttons_Settings } from "@/app/_component_/_homeSettings_/Buttons_Settings";
import { Personal_Info } from "@/app/_component_/Personal_Info";
import { Set_New_Pass } from "@/app/_component_/_homeSettings_/Set_New_Pass";
import { Payment_Details } from "@/app/_component_/_homeSettings_/Payment_Details";
import { Success } from "@/app/_component_/_homeSettings_/Success";
import { App } from "@/components/qr-code";
const Settings = () => {
  return (
    <div className="w-full h-[4000pxx] relative">
      <HeaderH />
      <div className="w-[251px] h-auto inline-flex flex-col justify-start items-start gap-1 pl-[80px]">
        <Buttons_Settings />
      </div>
      <div className="w-[650px] h-auto inline-flex flex-col justify-start items-start gap-8 absolute left-[405px] top-[100px]">
        <div className="flex flex-col justify-start items-start gap-8">
          <span className="text-2xl font-semibold leading-loose">
            My account
          </span>
        </div>
        <Personal_Info />
        <Set_New_Pass />
        <Payment_Details />
        <Success />
        <App/>
    
      </div>
    </div>
  );
};
export default Settings;
