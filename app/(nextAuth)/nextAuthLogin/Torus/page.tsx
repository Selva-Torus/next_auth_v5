// "use client";
"use server";
import SessionWrapper from "./sessionWrapper";
import {
  checkIsActive,
  logoutRealm,
} from "@/app/utilsFunctions/ulits/keyCloakAuth";
import { signOut, useSession } from "next-auth/react";
import { auth } from "@/auth";
// import React, { useEffect } from "react";

const Home = async () => {
  const session = await auth();
  // const { status, data: session } = useSession();
  // useEffect(() => {
  //   const allDeatiles = JSON.parse(JSON.stringify(session));
  //   console.log(allDeatiles, "allDeatiles");
  //   if (allDeatiles.hasOwnProperty("user")) {
  //     var client = {
  //       realm: allDeatiles.user.realm,
  //       client_id: allDeatiles.user.client_id,
  //       client_secret: allDeatiles.user.client_secret,
  //     };
  //     checkIsActive(client, allDeatiles.user.token).then((res) => {
  //       console.log(res.active);
  //       if (!res.active) {
  //         localStorage.setItem("isLogin", "false");
  //         signOut();
  //       }
  //     });
  //   }
  // }, []);
  // async function Logout() {
  //   const allDeatiles = JSON.parse(JSON.stringify(session));
  //   console.log(allDeatiles, "allDeatiles");

  //   if (allDeatiles.user) {
  //     var demo = {
  //       realm: allDeatiles.user.realm,
  //       client_id: allDeatiles.user.client_id,
  //       client_secret: allDeatiles.user.client_secret,
  //     };
  //     const res = await logoutRealm(demo, allDeatiles.user.token);
  //     localStorage.setItem("isLogin", "false");
  //     signOut();
  //   } else {
  //     alert("pls wait to load");
  //   }
  //   return;
  // }

  return (
    <div>
      <SessionWrapper session={JSON.stringify(session)} />
    </div>
  );
};

export default Home;
