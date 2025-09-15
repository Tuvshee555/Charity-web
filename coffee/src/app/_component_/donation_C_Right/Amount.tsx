import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

const amounts = [1, 2, 5, 10];

type Props = {
  onAmountChange?: (amount: number) => void;
};

export const Amount_C = ({ onAmountChange }: Props) => {
  const [selectedAmount, setSelectedAmount] = useState<number >(1);

  useEffect(() => {
    if (onAmountChange && selectedAmount !== null) {
      onAmountChange(selectedAmount);
    }
  }, [selectedAmount]);

  return (
    <div className="flex-col inline-flex">
      <span className="text-sm font-medium leading-none">Select amount:</span>
      <div className="inline-flex gap-3 mt-[8px]">
        {amounts.map((amount) => (
          <Button
            key={amount}
            className={`w-auto hover:text-white ${
              selectedAmount === amount
                ? "bg-black text-white"
                : "bg-[#F4F4F5] text-black"
            }`}
            onClick={() => setSelectedAmount(amount)}
          >
            <Coffee /> ${amount}
          </Button>
        ))}
      </div>
    </div>
  );
};
