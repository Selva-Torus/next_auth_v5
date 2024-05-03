"use client";
import Footer from "@/app/components/layout/Footer";
import TopNavbar from "@/app/components/layout/TopNavbar";
import { getSession } from "@/app/utilsFunctions/ulits/getSession";
import { logoutRealm } from "@/app/utilsFunctions/ulits/keyCloakAuth";
import SideNavbar from "@/app/components/layout/SideNavbar";
import axios from "axios";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utilsFunctions/Store/store";
import Assembler from "./Assembler";
import Wrapper from "@/app/components/layout/wrapper";
import AllProcessLog from "@/app/components/AllProcessLog";

const Home = () => {
  const fabric = useSelector((state: RootState) => state.main.fabric);
  async function Logout() {
    const allDeatiles = await getSession().then((res) => JSON.parse(res));
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
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get("http://192.168.2.110:3002/pe/processLog")
          .then((res) => res.data);
        console.log(res);

        setData(res);
      } catch (err) {
        console.log("error");
      }
    })();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      <TopNavbar Logout={Logout} />
      <div className="flex h-[90%]">
        <SideNavbar />
        {fabric === "ProcessLog" ? (
          data.length && <AllProcessLog data={data} />
        ) : (
          <Assembler />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
{
  /* <div className="flex flex-col h-screen w-full">
        <TopNavbar Logout={Logout} />
        <div className="flex h-[90%]">
          <SideNavbar />
          <Assembler />
          {/* {
              (() => {
                switch (fabric) {
                  case "UF":
                    return (
                     
                    );
                  case "DF":
                    return (
                      
                    );
                  case "PF":
                    return (
                     
                    );
                 
                  default:
                    return (
                      <div className="flex justify-center items-center h-full w-full">
                        ...on Process {fabric}
                      </div>
                    );
                }
              })()
        } 
        </div>
        <Footer />
      </div> */
}
