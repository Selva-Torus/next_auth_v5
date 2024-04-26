"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const routes = useRouter();

  useEffect(() => {
    var isLogin = localStorage.getItem("isLogin");

    if (isLogin == "nextAuthTrue") {
      routes.push("/nextAuthLogin");
    }
    if (isLogin == "keyCloakTrue") {
      routes.push("/keyCloakLogin");
    }
  }, []);
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
