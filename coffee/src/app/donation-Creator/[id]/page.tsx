"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderH } from "@/app/_component_/_homeSettings_/HeaderH";
import { Recent_S_C } from "@/app/_component_/donation_C_Left/Recent_Supporters";
import { Social_URL_C } from "@/app/_component_/donation_C_Left/Social_Url";
import { Amount_C } from "@/app/_component_/donation_C_Right/Amount";
import { Buy_Coffee_C } from "@/app/_component_/donation_C_Right/Buy_Coffee";
import { Message_D } from "@/app/_component_/donation_C_Right/Message_D";
import { Social_Url_D } from "@/app/_component_/donation_C_Right/Social_Url";
import { Support_D } from "@/app/_component_/donation_C_Right/Support_Button";
import { Profile_S } from "@/app/_component_/donation_Supporter/Profile_Supporter";
import { Loading } from "@/components/loading";
import { useUserData } from "@/providers/AuthenticationProvider";
import { useDonation } from "@/providers/donationProvider";
import { useGetProfileData } from "@/providers/profile-provider/getProfileDataProvider";

type Donation = {
  amount: number | null;
  specialMessage: string | null;
  socialURLOrBuyMeACoffee: string | null;
  donorId: number | null;
  recipientId: number | null;
};

const getProfileById = async (id: string) => {
  const res = await fetch(`http://localhost:4000/profile/d/${id}`);
  if (!res.ok) throw new Error("User not found");
  return await res.json();
};

const Donation_C = () => {
  const user = useUserData();
  const { id } = useParams() as { id: string };
  const data = useGetProfileData();
  const { donation, setDonation, refetch, isLoading, error } = useDonation();

  const [profile, setProfile] = useState<any>(null);
  const [formValue, setFormValue] = useState<Donation>({
    amount: null,
    specialMessage: null,
    socialURLOrBuyMeACoffee: null,
    donorId: null,
    recipientId: null,
  });

  useEffect(() => {
    if (user?.id) {
      setFormValue((prev) => ({ ...prev, donorId: user.id }));
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getProfileById(id);
        setProfile(data.profileData);
        setFormValue((prev) => ({
          ...prev,
          recipientId: data.profileData.userId,
        }));
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      setFormValue((prev) => ({
        ...prev,
        socialURLOrBuyMeACoffee: data.getProfileData?.socialMediaURL as string,
      }));
    }
  }, [data]);

  useEffect(() => {
    setDonation(formValue);
  }, [formValue]);

  const handleAmountChange = (selectedAmount: number) => {
    setFormValue((prev) => ({ ...prev, amount: selectedAmount }));
  };

  const onMessageChange = (value: string) => {
    setFormValue((prev) => ({ ...prev, specialMessage: value }));
  };

  if (!profile) return <Loading />;
console.log(profile)
  return (
    <div className="w-full h-[1000px] relative overflow-hidden">
      <HeaderH />
      <div className="w-full h-[319px] relative bg-[#F4F4F5] overflow-hidden inline-flex justify-center items-center gap-2" />
      <div className="w-[632px] h-auto justify-start items-start gap-5 absolute top-[289px] left-[80px]">
        <Profile_S user={profile} />
        <Social_URL_C user={profile} />
        <Recent_S_C user={profile} />
      </div>
      <div className="w-[628px] h-auto justify-start items-start gap-5 absolute top-[289px] left-[732px]">
        <div className="w-full h-auto p-6 rounded-lg outline border-[#E4E4E7] bg-white inline-flex flex-col justify-start items-start gap-2">
          <Buy_Coffee_C user={profile} />
          <div className="w-full mt-[26px] inline-flex flex-col gap-2">
            <Amount_C onAmountChange={handleAmountChange} />
            <Social_Url_D user={profile} />
            <Message_D onMessageChange={onMessageChange} />
            <Support_D userId={profile.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation_C;
