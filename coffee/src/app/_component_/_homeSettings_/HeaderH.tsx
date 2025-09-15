"use client";
import { Coffee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useGetProfileData } from "@/providers/profile-provider/getProfileDataProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const HeaderH = () => {
  const router = useRouter();
  const { getProfileData } = useGetProfileData();
  const handleClick = () => {
    router.push("/logIn");
    localStorage.removeItem("token");
  };
  return (
    <div className="w-full h-[56px] flex justify-between items-center p-8 sticky">
      <div
        className="flex justify-start gap-2 cursor-pointer"
        onClick={() => router.push("/home")}
      >
        <Coffee />
        <span className="text-base font-bold leading-tight">Buy Me Coffee</span>
      </div>
      <div className="flex justify-start items-center gap-3">
        <Avatar>
          <AvatarImage src={getProfileData?.avatarImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium leading-tight">
          {getProfileData?.name}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleClick()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
