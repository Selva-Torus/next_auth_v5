import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col space-y-4">
        <div>
          <Link
            href="./nextAuthLogin"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            nextAuthLogin
          </Link>
        </div>
        <div>
          <Link
            href="./keyCloakLogin"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            keyCloakLogin
          </Link>
        </div>
      </div>
    </div>
  );
}
