import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React, { FunctionComponent } from "react";
import { FaUserCircle } from "react-icons/fa";
import logo from "@/app/(nextAuth)/nextAuthLogin/favicon.ico";

interface TopNavbarProps {
  Logout: () => void;
}

const TopNavbar: FunctionComponent<TopNavbarProps> = ({ Logout }) => {
  return (
    <Navbar maxWidth="2xl">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarBrand className="font-bold text-inherit">
        <Image src={logo.src} alt="torus-logo" className="w-14 h-12" />
        <span className="">Torus</span>
      </NavbarBrand>
      <NavbarContent justify="end">
        <Dropdown className=" bg-slate-100 text-slate-600  dark:bg-slate-500 dark:text-white">
          <DropdownTrigger>
            <FaUserCircle size={20} />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={() => Logout()}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default TopNavbar;