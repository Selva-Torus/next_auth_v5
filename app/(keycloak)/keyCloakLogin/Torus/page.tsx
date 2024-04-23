// "use client";
// import Torus from "@/app/Torus/Torus";
// import { logoutRealm } from "@/app/utilsFunctions/ulits/keyCloakAuth";
// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [token, setToken] = useState<any>();
//   useEffect(() => {
//     var tokens = localStorage.getItem("token");
//     if (tokens) setToken(tokens);
//   }, []);

//   async function Logout() {

//     const allDeatiles = JSON.parse(JSON.stringify(session));
//     console.log(allDeatiles, "allDeatiles");

//     if (allDeatiles.status == "authenticated") {
//       if (allDeatiles.data.user) {
//         var demo = {
//           realm: allDeatiles.data.user.realm,
//           client_id: allDeatiles.data.user.client_id,
//           client_secret: allDeatiles.data.user.client_secret,
//         };
//         const res = await logoutRealm(demo, allDeatiles.data.user.token);

//       }
//     } else {
//       alert("Loaing out failed");

//     }

//     return;

//     const res = await logoutRealm(data, token);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   }

//   return <div>{token}</div>;
// };

// export default Home;

"use client";

import React, { useEffect, useState } from "react";

const Home = () => {
  const [token, setToken] = useState<any>();
  useEffect(() => {
    var tokens = localStorage.getItem("token");
    if (tokens) setToken(tokens);
  }, []);

  return <div>{token}</div>;
};

export default Home;
