"use client";
import React, { useEffect } from "react";
import Torus from "@/app/Torus/Torus";
import {
  checkIsActive,
  logoutRealm,
} from "@/app/utilsFunctions/ulits/keyCloakAuth";
import { signOut } from "next-auth/react";

const SessionWrapper = ({ session }: any) => {
  // const { status, data: session } = useSession();
  useEffect(() => {
    const allDeatiles = JSON.parse(session);
    console.log(allDeatiles, "allDeatiles");
    if (allDeatiles.hasOwnProperty("user")) {
      var client = {
        realm: allDeatiles.user.realm,
        client_id: allDeatiles.user.client_id,
        client_secret: allDeatiles.user.client_secret,
      };
      checkIsActive(client, allDeatiles.user.token).then((res) => {
        console.log(res.active);
        if (!res.active) {
          localStorage.setItem("isLogin", "false");
          signOut();
        }
      });
    }
  }, []);
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
    <Torus session={JSON.stringify(JSON.parse(session))} Logout={Logout} />
  );
};

export default SessionWrapper;
