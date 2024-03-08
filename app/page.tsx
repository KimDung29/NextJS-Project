import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-100 bg-blue-700 pl-20 rounded-b-lg">
        <Image src={"/logo.png"} width={200} height={200} alt="Logo" />
      </div>
      <div className="flex items-center p-8 ">
        <div className="flex-1">
          <div className="mx-8 ">
            <h1 className="text-xl font-bold">Welcome to the Next.js project</h1>
            <Link
              href={"/login"}
              className="flex items-center w-32 mt-4 gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Login</span> <ArrowRightIcon className="w-5 md:w6" />
            </Link>
            <p className="text-center mt-4">or</p>
            <Link
              href={"/register"}
              className="flex items-center w-32 mt-4 gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Regisster</span> <ArrowRightIcon className="w-5 md:w6" />
            </Link>
          </div>
        </div>
        <div className="flex-2 pr-12">
          <Image
            src={"/hero-desktop.png"}
            width={1000}
            height={760}
            alt="Logo"
            className="hidden md:block"
          />
          <Image
            src={"/hero-mobile.png"}
            width={520}
            height={620}
            alt="Logo"
            className="block md:hidden"
          />
        </div>
      </div>
    </main>
  );
}
