import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Camera } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type AvatarUpdateProps = {
  avatarImage?: string;
  onChange?: (url: string) => void;
};
const NEXT_PUBLIC_CLOUDINARY_API_KEY = "449676792634373";
const CLOUDINARY_UPLOAD_PRESET = "H8ahs3";
const CLOUDINARY_CLOUD_NAME = "dwauz9le4";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
export const AvatarUpdate = ({ avatarImage, onChange }: AvatarUpdateProps) => {
  const [data, setData] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string>(avatarImage as string);
  const [loading, setLoading] = useState(false);

  const handleUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (!files) return;
    const file = files[0];
    setData(file);
  };

  const UploadCloudinary = async () => {
    setData(null);
    if (!data) {
      alert("Please insert a photo");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("api_key", NEXT_PUBLIC_CLOUDINARY_API_KEY);

      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const url = response.data.secure_url;
      setPreviewImg(url);
      if (onChange) onChange(url);
      toast.success("Succesfully added avatar img");
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("failed to upload avatar image");
      alert;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (avatarImage) {
      setPreviewImg(avatarImage);
    }
  }, [avatarImage]);
  return (
    <>
      <label
        className="h-40 w-40 flex justify-center items-center cursor-pointer "
        htmlFor="img"
      >
        <Avatar className="w-40 h-40">
          <AvatarImage src={previewImg} />
          <AvatarFallback className="bg-white border-[2px] border-dashed">
            {!loading ? (
              <div className="w-10 h-10 border-l-[2px] border-t-[2px] border-black rounded-full animate-spin z-50"></div>
            ) : (
              <>
                <Camera stroke="grey" />
              </>
            )}
          </AvatarFallback>
        </Avatar>
        <Input
          onChange={handleUploadImg}
          id="img"
          type="file"
          className="hidden"
        />
      </label>
      {data && (
        <div className="absolute z-40 inset-0 flex justify-center bg-opacity-50 bg-[#6B728030]">
          <div className="bg-white h-50 p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Change Profile
            </h3>
            <p className="text-center text-gray-600">
              Are you sure you want to update your profile?
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <Button
                onClick={() => setData(null)}
                className="bg-gray-300 text-gray-700 rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={UploadCloudinary}
                className="bg-blue-500 text-white rounded-full"
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
