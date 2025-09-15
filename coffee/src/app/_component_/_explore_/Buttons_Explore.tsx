import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
export const Buttons_Explore = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        className="w-[250px] bg-white text-black justify-start  hover:text-white cursor-pointer"
        onClick={() => router.push("/home")}
      >
        Home
      </Button>
      <Button className="w-[250px] bg-black text-white justify-start outline-none cursor-pointer">
        Explore
      </Button>
      <Button className="w-[250px] bg-white text-black justify-start  hover:text-white cursor-pointer" onClick={() => router.push("/donation_Creator")}>
        View page <ExternalLink />{" "}
      </Button>
      <Button
        className="w-[250px] bg-white text-black justify-start  hover:text-white cursor-pointer"
        onClick={() => router.push("/home/settings")}
      >
        Account settings
      </Button>
    </div>
  );
};
