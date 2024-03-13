"use client";
import {
  postMethod,
  putMethod,
  uploadMethod,
} from "@/app/lib/fetch_api/method";
import { RootState } from "@/app/lib/store";
import FormProfile from "@/app/ui/form/profile";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export interface UserInfoType {
  name: string | null;
  avatar: string | null;
  email: string | null;
}
const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user);

  const [value, setValue] = useState({
    name: "",
    avatar: "",
  } as UserInfoType);

  useEffect(() => {
    user && setValue(user);
  }, [user.email]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    try {
      if (files?.length === 1) {
        const data = new FormData();
        data.set("file", files[0]);
        await uploadMethod("/upload", data);
        const response = await uploadMethod("/upload", data);
        if (!response.ok) {
          throw new Error("Failed to upload image.");
        }

        const result = await response.json();
        setValue((prevValue) => ({
          ...prevValue,
          avatar: result.msg,
        }));
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Failed to upload image.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prevValue: UserInfoType) => ({
      ...prevValue,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const savingPromise = new Promise<void>(async (resolve, reject) => {
      const res = await putMethod("/user", value);
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
    window.location.reload();
  };
  return (
    <div>
      <FormProfile  
      handleSubmit={handleSubmit}
      value={value}
      handleFileChange={handleFileChange}
      handleChange={handleChange}
      />
    </div>
  );
};
export default ProfilePage;
