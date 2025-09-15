import { Payment_V1 } from "../Payment";
export const Payment_Details = () => {
  return (
    <div className="w-full p-6 rounded-lg outline border-[#E4E4E7] flex-col inline-flex gap-6">
      <div className="justify-start items-start gap-6">
        <Payment_V1 />
      </div>
    </div>
  );
};
