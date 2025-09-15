export const Social_URL_C = ({ user }: { user: any }) => {
  return (
    <div className="w-full h-auto p-6 rounded-lg outline border-[#E4E4E7] bg-white inline-flex flex-col justify-start items-start gap-2 mt-[20px]">
      <div className="flex-col">
        <span className="text-base font-semibold leading-normal">
          Social media URL
        </span>
        <div className="mt-[18px]">
          <span className="text-sm font-normal leading-tight">
            {user?.socialMediaURL || "No social link provided"}
          </span>
        </div>
      </div>
    </div>
  );
};
