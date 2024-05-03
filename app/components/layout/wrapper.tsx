import React from "react";
import TopNavbar from "./TopNavbar";
import SideNav from "./SideNavbar";
import Footer from "./Footer";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <TopNavbar Logout={() => {}} />
      <div className="flex h-[90%]">
        <SideNav />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Wrapper;
