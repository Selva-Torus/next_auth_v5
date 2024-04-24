"use client";
import Torus from "@/app/Torus/Torus";
import { logoutRealm } from "@/app/utilsFunctions/ulits/keyCloakAuth";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
  const routes = useRouter();
  const [token, setToken] = useState<any>();

  useEffect(() => {
    var tokens = localStorage.getItem("token");
    if (tokens) setToken(tokens);
  }, []);

  async function Logout() {
    const allDeatiles = {
      ...JSON.parse(localStorage.getItem("user") || "{}"),
      token: JSON.parse(localStorage.getItem("token") || "{}"),
    };
    console.log(allDeatiles);

    // return;

    if (allDeatiles) {
      var demo = {
        realm: allDeatiles.realm,
        client_id: allDeatiles.client_id,
        client_secret: allDeatiles.client_secret,
      };
      const res = await logoutRealm(demo, allDeatiles.token);
    } else {
      alert("Logging out failed");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    routes.push("/");
  }

  return (
    <div>
      <Torus session={token} Logout={Logout} />
    </div>
  );
};

export default Home;

// "use client";

// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [token, setToken] = useState<any>();
//   useEffect(() => {
//     var tokens = localStorage.getItem("token");
//     if (tokens) setToken(tokens);
//   }, []);

//   return <div>{token}</div>;
// };

// export default Home;
