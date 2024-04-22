"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const session = useSession();

  return (
    <>
      <div>page</div>
      <div>{JSON.stringify(session)}</div>
      <button onClick={() => signOut()}>Signout</button>
    </>
  );
};

export default Page;
