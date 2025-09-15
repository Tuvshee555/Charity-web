"use client";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export const Header = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-[56px] flex justify-between items-center p-8 sticky">
        <div className="flex justify-start gap-2">
          <Coffee />
          <span className="text-base font-bold leading-tight">
            Buy Me Coffee
          </span>
        </div>
        <div className="flex justify-start items-center gap-3">
          <Button
            className="bg-[#F4F4F5] text-black"
            onClick={() => router.push("/logIn")}
          >
            Log out
          </Button>
        </div>
      </div>
    </>
  );
};
