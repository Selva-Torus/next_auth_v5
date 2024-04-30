"use client";

import { verify } from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import AllProcessLog from "../AllProcessLog";
import axios from "axios";

const Torus = ({ session, Logout = () => {} }: any) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios
          .get("http://192.168.2.110:3002/pe/processLog")
          .then((res) => res.data);
        setData(res);
      } catch (err) {
        console.log("error");
      }
    })();
  }, []);
  return (
    <div className="flex flex-col h-full w-full">
      {data.length && <AllProcessLog data={data} />}
    </div>
  );
};

export default Torus;
