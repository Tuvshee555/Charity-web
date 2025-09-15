import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
export const Buttons_Settings = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        className="w-[250px] bg-white text-black justify-start hover:text-white cursor-pointer"
        onClick={() => router.push("/home")}
      >
        Home
      </Button>
      <Button
        className="w-[250px] bg-white text-black justify-start hover:text-white cursor-pointer"
        onClick={() => router.push("/home/explore_home")}
      >
        Explore
      </Button>
      <Button className="w-[250px] bg-white text-black justify-start  hover:text-white cursor-pointer" onClick={() => router.push("/donation_Creator")}>
        View page <ExternalLink />{" "}
      </Button>
      <Button className="w-[250px] bg-black text-white justify-start cursor-pointer">
        Account settings
      </Button>
    </div>
  );
};
