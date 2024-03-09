"use client";
import { putMethod, uploadMethod } from "@/app/lib/fetch_api/method";
import { RootState } from "@/app/lib/store";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export interface UserInfoType {
  name: string |null,
  avatar: string | null,
  email: string | null,
}
const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user);

  const [value, setValue] = useState({
    name: '',
    avatar: '',
  } as UserInfoType);

  useEffect(() => {
    setValue(pre => ({
      ...pre,
      name: user.name,
      email: user.email,
    }))
  }, [user.email])

  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      await uploadMethod("/upload", data);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
   
    setValue((prevValue: UserInfoType) => ({
      ...prevValue,
      [e.target.name]: (e.target.value).trim(),
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
    window.location.reload()
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 flex-col justify-center items-center m-auto"
      >
        <div className="mb-4">
          <label htmlFor={"avatar"}>Avatar</label>
          <div className="flex items-center">
            {value.avatar ? (
              <Image
                src={value.avatar}
                alt="avatar"
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <UserCircleIcon
                width={80}
                height={80}
                className="text-gray-600"
              />
            )}
            <label className="w-20 hover:cursor-pointer bg-blue-700 py-2 ml-10 rounded-xl font-normal text-white text-center">
              <span>Edit</span>
              <input
                type="file"
                name="avatar"
                value={value.avatar || ""}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor={"name"}>Name</label>
          <input
            type="text"
            name="name"
            value={value.name || ""}
            onChange={handleChange}
            className=""
          />
        </div>
        <div className="mb-4 ">
          <label htmlFor={"email"}>Email</label>
          <input
            type="email"
            name="email"
            disabled={value.email ? true : false}
            value={value.email || ""}
            onChange={handleChange}
            className="cursor-not-allowed bg-gray-100 text-gray-500"
          />
        </div>
        <button type="submit" className="py-3 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};
export default ProfilePage;
