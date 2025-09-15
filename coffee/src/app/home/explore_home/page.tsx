"use client";
import { HeaderH } from "@/app/_component_/_homeSettings_/HeaderH";
import { Buttons_Explore } from "@/app/_component_/_explore_/Buttons_Explore";
import { Input } from "@/components/ui/input";
import { UserList } from "@/components/users";
import { useState } from "react";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full h-[4000px] relative">
      <HeaderH />
      <div className="w-[251px] h-auto inline-flex flex-col justify-start items-start gap-1 pl-[80px]">
        <Buttons_Explore />
      </div>
      <div className="w-[909px] h-auto inline-flex flex-col justify-start items-start gap-6 absolute left-[403px] top-[100px]">
        <div className="w-full h-auto inline-flex flex-col justify-start items-start gap-6">
          <span className="text-xl font-semibold leading-7">
            Explore creators
          </span>
          <div>
            <Input
              placeholder="Search users by name..."
              onChange={onChange}
              className="w-full max-w-md"
            />
          </div>
        </div>
        {/* Pass searchTerm and setSearchTerm as props */}
        <UserList searchTerm={searchTerm} />
      </div>
    </div>
  );
};
export default Explore;
