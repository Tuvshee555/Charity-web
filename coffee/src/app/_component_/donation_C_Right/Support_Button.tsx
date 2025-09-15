"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { useRouter } from "next/navigation";
import { useDonation } from "@/providers/donationProvider";

export const Support_D = ({ userId }: { userId: number }) => {
  const {refetch , isLoading} =  useDonation()
  const router = useRouter();
  const handleSupportClick = () => {
   
    refetch
  };
  const value = "iasuhdaisld";

  return (
    <div className="w-full mt-[32px]">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-[#D1D1D1] hover:bg-black cursor-pointer"
            onClick={handleSupportClick}
          >
            Support
          </Button>
        </DialogTrigger>
        <DialogContent className="flex-col flex justify-center items-center text-sm-center">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
            <DialogDescription
              className="cursor-pointer"
              onClick={() => router.push(`/donation_Creator/donation-finished/${userId}`)}
            >
              Scan the QR code to complete your donation
            </DialogDescription>
          </DialogHeader>
          <QRCode
            size={10}
            style={{ height: "245px", maxWidth: "100%", width: "245px" }}
            value={value}
            viewBox={`0 0 200 200`}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
