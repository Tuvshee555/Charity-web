"use client";

import { LeftTable } from "../_component_/LeftTable";
import { useRouter } from "next/navigation";

export default function UserName() {
  console.log("USERNAME");

  const router = useRouter();

  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="w-1/2 h-full">
          <LeftTable />
        </div>
        <div className="w-1/2 h-full relative flex flex-col justify-center items-center bg-white">
          <button
            className="absolute top-8 right-8 bg-gray-100 px-4 py-1 rounded-md text-[black]"
            onClick={() => router.push("/logIn")}
          >
            Log in
          </button>
          <div className="w-[320px]">
            <h2 className="text-[black] font-semibold mb-4">
              Create your account
            </h2>
            <p className="text-[#94949b]">choose a username for your page</p>
            <div className="mb-3">
              <label className="block text-[black] mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email here"
                className="w-full px-3 py-2 border rounded text-gray-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[black] mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password here"
                className="w-full px-3 py-2 border rounded text-gray-400"
              />
            </div>
            <button
              className="w-full bg-[black] text-white py-2 rounded"
              disabled
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
