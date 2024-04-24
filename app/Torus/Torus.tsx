"use client";

import React from "react";

const Torus = ({ session, Logout = () => {} }: any) => {
  return (
    <>
      <div>page success</div>
      <div>{session}</div>
      <button onClick={Logout}>Signout</button>
    </>
  );
};

export default Torus;
