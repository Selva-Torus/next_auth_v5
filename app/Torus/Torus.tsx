"use client";

import { verify } from "jsonwebtoken";
import React, { useEffect } from "react";
import startServer from "./KKK";

const Torus = ({ session, Logout = () => {} }: any) => {
  useEffect(() => {
    console.log(JSON.parse(session).user.token.access_token);
  }, []);

  const hh = () => {
    var token = {
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFyaTY1NjUiLCJlbWFpbCI6ImhhcmluQHRvcnVzLnRlY2giLCJwaWN0dXJlIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE1NzQ1MzM1Mj92PTQiLCJzdWIiOiJjbHZjZmg4eXkwMDAwMnJ6aTRuMXd2NWJkIiwidXNlciI6eyJpZCI6ImNsdmNmaDh5eTAwMDAycnppNG4xd3Y1YmQiLCJuYW1lIjoiaGFyaTY1NjUiLCJlbWFpbCI6ImhhcmluQHRvcnVzLnRlY2giLCJlbWFpbFZlcmlmaWVkIjpudWxsLCJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNTc0NTMzNTI_dj00IiwicGFzc3dvcmQiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDQtMjNUMTM6MzQ6NTEuNTYyWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDQtMjNUMTM6MzQ6NTEuNTYyWiJ9LCJpYXQiOjE3MTQyMTE0NTEsImV4cCI6MTcxNDIxMTYzMX0.ZeM1szQilyEnrl9fPV_XZfj06umZHsUE4ubTNHh079c",
      expires_in: 300,
      refresh_expires_in: 3600,
      refresh_token: "",
      token_type: "bearer",
      session_state: "",
      scope: "social profile",
    };

    const PUBLICK_KEY =
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4nxzwnTeXFaMypqO8dU7F9FlDLyXMzQka+u5X6WBIhnDD5pGm6pt2okZ1wxHva2Qh6cXmpSL+dQ45+slIQ97MO28lmNqGtwA95DwxBL/glixaheBHpebTYfUQYE3bfu7bztnzSdkI1sAFRzKB1690VQK5t4To3sonYWMG+WcfimL6IMLd1BIUbamn15D1t2PQ1rcD+oOPbW29e1Or15u3NhAlEqGRvvVNoIhNleNz6IQoZtbwE3zfkFytHIFKlTeaLswdnss5i0DZR0saymiag08guIcJzSjhNe0F0/XUh4m9kvrsHLVOi1t/NbxRSQRWuXYJR5obC6MpM4oz97k4QIDAQAB";
    const KEY = `-----BEGIN PUBLIC KEY-----\n${PUBLICK_KEY}\n-----END PUBLIC KEY-----`;

    var decoded;
    try {
      decoded = verify(token.access_token, PUBLICK_KEY);
      console.log("+++++");
      console.log(decoded);
    } catch (err) {
      decoded = "unable to decode";
    }
  };

  const test = () => {
    startServer();
  };
  return (
    <>
      <div>page success</div>
      <div>{session}</div>
      <button onClick={Logout}>Signout</button>
      {/* <button onClick={() => test()}>hh</button> */}
    </>
  );
};

export default Torus;
