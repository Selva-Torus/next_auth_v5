"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { logoutRealm } from "../utilsFunctions/ulits/keyCloakAuth";

const Torus = () => {
  const { status, data: session } = useSession();
  async function Logout() {
    const allDeatiles = JSON.parse(JSON.stringify(session));
    console.log(allDeatiles, "allDeatiles");

    if (allDeatiles.status == "authenticated") {
      if (allDeatiles.data.user) {
        var demo = {
          realm: allDeatiles.data.user.realm,
          client_id: allDeatiles.data.user.client_id,
          client_secret: allDeatiles.data.user.client_secret,
        };
        const res = await logoutRealm(demo, allDeatiles.data.user.token);
        signOut();
      }
    } else {
      alert("Loaing out failed");
    }

    return;

    // const res = await logoutRealm(data, token);
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
  }

  return (
    <>
      <div>page</div>
      <div>{JSON.stringify(session)}</div>
      <button onClick={Logout}>Signout</button>
    </>
  );
};

export default Torus;
