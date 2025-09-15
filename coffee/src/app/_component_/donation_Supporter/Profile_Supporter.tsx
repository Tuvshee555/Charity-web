import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Line_C } from "../donation-C/Line";
export const Profile_S = ({ user }: { user: any }) => {
  return (
    <div className="w-full h-auto p-6 rounded-lg outline border-[#E4E4E7] bg-white inline-flex flex-col justify-start items-start gap-2">
      <div className="w-full flex justify-between items-between">
        <div className="flex">
          <Avatar>
            <AvatarImage src={user?.avatarImage} />
            <AvatarFallback>
              {user?.name?.slice(0, 2).toUpperCase() || "CN"}
            </AvatarFallback>
          </Avatar>
          <span className="text-xl font-bold leading-normal ml-[12px]">
            {user?.name}
          </span>
        </div>
      </div>
      <div>
        <Line_C />
      </div>
      <div className="flex-col">
        <span className="text-base font-semibold leading-normal">
          About {user?.name}
        </span>
        <div>
          <span className="text-sm font-normal leading-tight">
            {user?.about || "No bio provided"}
          </span>
        </div>
      </div>
    </div>
  );
};
