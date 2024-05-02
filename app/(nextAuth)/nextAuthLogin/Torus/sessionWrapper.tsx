"use client";
import React, { useEffect } from "react";
import {
  checkIsActive,
  checkIsActiveSocial,
  logoutRealm,
} from "@/app/utilsFunctions/ulits/keyCloakAuth";
import { signOut } from "next-auth/react";
import Torus from "@/app/components/Torus/Torus";
import TopNavbar from "@/app/components/layout/TopNavbar";
import SideNavbar from "@/app/components/layout/SideNavbar";
import Footer from "@/app/components/layout/Footer";
import ApplicationSelection from "@/app/components/application&appGroup/appSelector";

const SessionWrapper = ({ session }: any) => {
  // const { status, data: session } = useSession();
  // useEffect(() => {
  //   const allDeatiles = JSON.parse(session);
  //   console.log(allDeatiles, "allDeatiles");
  //   if (
  //     allDeatiles.hasOwnProperty("user") &&
  //     !allDeatiles.user.hasOwnProperty("image")
  //   ) {
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
  //   } else {
  //     checkIsActiveSocial(allDeatiles.user.token);
  //   }
  // }, []);
  async function Logout() {
    const allDeatiles = JSON.parse(session);
    console.log(allDeatiles, "allDeatiles");

    if (allDeatiles.user) {
      var demo = {
        realm: allDeatiles.user.realm,
        client_id: allDeatiles.user.client_id,
        client_secret: allDeatiles.user.client_secret,
      };
      const res = await logoutRealm(demo, allDeatiles.user.token);
      localStorage.setItem("isLogin", "false");
      signOut();
    } else {
      alert("pls wait to load");
    }
    return;
  }
  return (
    <div className="flex flex-col h-screen w-full">
      <TopNavbar Logout={Logout}/>
      <div className="flex h-[90%]">
        <SideNavbar />
        <ApplicationSelection />
      {/* <Torus session={JSON.stringify(JSON.parse(session))} Logout={Logout} /> */}
      </div>
      <Footer />
    </div>
  );
};

export default SessionWrapper;
