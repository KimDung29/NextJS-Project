import { UserInfoType } from "@/app/dashboard/profile/page";
import Image from "next/image";
import { ChangeEvent } from "react";

export interface FormProfileType {
    handleSubmit: (e: ChangeEvent<HTMLFormElement>) => void,
    value: UserInfoType,
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleChange:(e: ChangeEvent<HTMLInputElement>) => void
}

const FormProfile = ({ 
    handleSubmit, 
    value,
    handleFileChange,
    handleChange,

}: FormProfileType) => {
    return (
        <form
        onSubmit={handleSubmit}
        className="w-1/2 flex-col justify-center items-center m-auto"
      >
        <div className="mb-4">
          <label htmlFor={"avatar"}>Avatar</label>
          <div className="flex items-center">
            <div className="w-100 h-100">
              {value.avatar && (
                 <div className="w-28 h-28 rounded-full bg-blue-400 overflow-hidden">
                 <Image
                   src={value?.avatar || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                   alt="avatar"
                   width={115}
                   height={40}
                   objectFit="cover"
                   className=""
                 />
   
               </div>
              )}

            </div>

            <label className="w-20 hover:cursor-pointer bg-blue-700 py-2 ml-10 rounded-xl font-normal text-white text-center">
              <span>Edit</span>
              <input
                type="file"
                name="avatar"
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
    )
}

export default FormProfile;