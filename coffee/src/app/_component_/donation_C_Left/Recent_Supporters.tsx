"use client";
import { HeartIcon } from "lucide-react";

export const Recent_S_C = ({ user }: { user: any }) => {
  // You can also fetch this user's donations if needed using user.id

  return (
    <div className="w-full h-auto p-6 rounded-lg outline border-[#E4E4E7] bg-white inline-flex flex-col justify-start items-start gap-2 mt-[20px]">
      <div className="w-[584px] justify-start items-start flex-col">
        <span className="text-base font-semibold leading-normal">
          Recent Supporters
        </span>
        {/* If user has no donations, show empty state */}
        <div className="w-full h-auto p-6 rounded-lg outline border-[#E4E4E7] bg-white inline-flex flex-col justify-center items-center gap-2 mt-[20px]">
          <div>
            <HeartIcon />
          </div>
          <div>
            <span className="text-base font-semibold leading-normal">
              Be the first one to support {user?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
