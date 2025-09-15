"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HeaderH } from "../_component_/_homeSettings_/HeaderH";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy } from "lucide-react";
import { Line } from "../_component_/_home_/Line";
import { Date as DateFilter } from "../_component_/_home_/Date";
import { AmountBox } from "../_component_/_home_/AmountBox";
import { Buttons } from "../_component_/_home_/Buttons";
import { useGetProfileData } from "@/providers/profile-provider/getProfileDataProvider";
import { useUserData } from "@/providers/AuthenticationProvider";
import { useDonation } from "@/providers/donationProvider";
import { toast } from "react-toastify";

const Home = () => {
  const router = useRouter();
  const { getProfileData } = useGetProfileData();
  const user = useUserData();
  const { setDonation, refetch } = useDonation();
  const [totalEarned, setTotalEarned] = useState<number>(0);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonations = async (id: string) => {
      if (!getProfileData?.id) return;

      try {
        const res = await fetch(`http://localhost:4000/profile/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        const data = json.donations || [];

        if (Array.isArray(data)) {
          const total = data.reduce(
            (acc: number, d: any) => acc + (d.amount || 0),
            0
          );
          setTotalEarned(total);
          setRecentTransactions(data);
        } else {
          console.error("Expected donations array, got:", data);
        }
      } catch (err) {
        console.error("Failed to fetch donations", err);
      }
    };

    fetchDonations("");
  }, [getProfileData]);

  const handleSendDonation = async () => {
    if (!user?.id || !getProfileData?.id) {
      console.error("Missing donor or recipient ID");
      return;
    }

    setDonation({
      amount: 10,
      specialMessage: "You're amazing! 🙌",
      socialURLOrBuyMeACoffee: `https://buymeacoffee.com/${user.username}`,
      donorId: user.id,
      recipientId: Number(getProfileData.id),
    });

    await refetch();
  };

  const handleCopyLink = () => {
    const url = `http://localhost:3000/donation_C/${getProfileData?.id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="w-full h-auto relative">
      <HeaderH />
      <div className="w-[251px] h-auto inline-flex flex-col justify-start items-start gap-1 pl-[80px]">
        <Buttons />
      </div>

      <div className="w-[955px] h-auto pl-[24px] pr-[24px] inline-flex flex-col justify-start items-start gap-6 absolute left-[429px]">
        {/* TOP SECTION */}
        <div className="w-[907px] h-auto p-6 rounded-lg outline border-[#E4E4E7] inline-flex flex-col justify-start items-start gap-3">
          <div className="inline-flex justify-between w-full">
            <div className="flex justify-start items-center gap-3">
              <Avatar onClick={() => router.push("/donation_Creator")}>
                <AvatarImage
                  src={getProfileData?.avatarImage}
                  className="cursor-pointer"
                  onClick={() => router.push("/donation_Creator")}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="inline-flex flex-col justify-center items-start gap-1">
                <span className="text-black text-base font-bold">
                  {getProfileData?.name}
                </span>
                <span className="text-black text-base font-normal">
                  buymeacoffee.com/{user?.username}
                </span>
              </div>
            </div>
            <div
              className="flex justify-center items-center ml-[397px] gap-2"
              onClick={() => toast.success("successfully copied link!")}
            >
              <Button className="text-white cursor-pointer">
                <Copy /> Share page link
              </Button>
            </div>
          </div>

          <div className="pt-3 pb-3 w-full">
            <Line />
          </div>

          <div className="inline-flex flex-col justify-start items-start gap-6">
            <div className="inline-flex justify-start items-center gap-4">
              <span className="text-xl font-semibold leading-7">Earning</span>
              <DateFilter />
            </div>
            <div>
              <span className="text-4xl font-bold">${totalEarned}</span>
            </div>
          </div>
        </div>

        <div className="w-[907px] h-auto inline-flex flex-col justify-start items-start gap-3 mt-[20px]">
          <div className="inline-flex justify-between w-full">
            <span className="text-base font-semibold">Recent transactions</span>
            <div>
              <AmountBox />
            </div>
          </div>

          <div className="w-full rounded-lg outline outline-[#E4E4E7] flex flex-col justify-start items-start gap-4 pt-[12px]">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((d, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center gap-3 p-6 w-full"
                >
                  <div className="flex gap-[12px] w-full">
                    <Avatar>
                      <AvatarImage src={d?.donor?.avatarImage || ""} />
                      <AvatarFallback>
                        {d?.donor?.name?.slice(0, 2).toUpperCase() || "CN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="w-full flex justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-tight">
                          {d?.donor?.name || "Anonymous"}
                        </span>
                        <span className="text-xs font-normal leading-none text-blue-500 underline">
                          {d?.socialURLOrBuyMeACoffee || "N/A"}
                        </span>
                      </div>
                      <div className="flex-col flex items-end">
                        <span className="text-base font-bold leading-tight">
                          + ${d.amount}
                        </span>
                        <span className="text-[#71717A] text-xs font-normal leading-none">
                          {new Date(d.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-sm text-gray-500">
                No transactions yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
