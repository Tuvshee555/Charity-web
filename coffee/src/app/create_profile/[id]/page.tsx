"use client";
import { AvatarImg } from "@/components/AvatarImg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useCreateProfile } from "@/providers/profile-provider/CreateProfileProvider";
import { Header } from "@/app/_component_/Header";
import { toast } from "react-toastify";

const CreateProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  const userID = Number(id); // safely convert to number

  const { createProfile, setCreateProfile, refetch, isLoading, error } =
    useCreateProfile();

  const [formValue, setFormValue] = useState({
    image: createProfile.image,
    name: createProfile.name,
    about: createProfile.about,
    socialMediaURL: createProfile.socialMediaURL,
    userID: userID,
  });

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, name: e.target.value }));
  };

  const onAboutChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue((prev) => ({ ...prev, about: e.target.value }));
  };

  const onSocialChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, socialMediaURL: e.target.value }));
  };

  const onImageChange = (url: string) => {
    setFormValue((prev) => ({ ...prev, image: url }));
  };

  useEffect(() => {
    setCreateProfile(formValue);
    toast.success("GOOD JOB");
  }, [formValue, setCreateProfile]);

  return (
    <>
      <Header />
      <div className="w-full inline-flex flex-col justify-start items-center gap-6 mt-30">
        <div className="w-[510px] max-w-[672px] inline-flex flex-col justify-start items-start gap-6">
          <h3 className="text-12">Complete your profile page</h3>

          <div className="inline-flex flex-col justify-start items-start gap-3">
            <p>Add photo</p>
            <AvatarImg
              className="w-40 h-40"
              image={formValue.image || undefined}
              onChange={onImageChange}
            />
          </div>

          <div className="w-full">
            <p>Name</p>
            <Input
              type="text"
              placeholder="Enter your name here"
              value={formValue.name || ""}
              onChange={onNameChange}
            />

            <p>About</p>
            <Textarea
              placeholder="Write about yourself here"
              className="max-h-[131px]"
              value={formValue.about || ""}
              onChange={onAboutChange}
            />

            <p>Social media URL</p>
            <Input
              type="URL"
              placeholder="https://"
              value={formValue.socialMediaURL || ""}
              onChange={onSocialChange}
            />
          </div>

          <div className="w-full flex justify-end">
            <Button
              className="bg-[#D1D1D1] w-[246px] flex justify-center items-center text-black hover:bg-black hover:text-white cursor-pointer"
              onClick={async () => {
                await refetch();
              }}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Continue"}
            </Button>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default CreateProfilePage;
