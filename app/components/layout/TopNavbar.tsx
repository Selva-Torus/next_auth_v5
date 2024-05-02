import {
  Button,
  CircularProgress,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Kbd,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import React, { FunctionComponent, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FcOk } from "react-icons/fc";
import { LiaComments } from "react-icons/lia";
import { GrBug } from "react-icons/gr";
import { FaCode } from "react-icons/fa6";
import { RiShareBoxFill } from "react-icons/ri";
import { MdPreview } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";
import { LiaYoutubeSquare } from "react-icons/lia";
import { CgRedo } from "react-icons/cg";
import { MdOutlineNightsStay } from "react-icons/md";
import { CiBrightnessUp } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import {
  MdOutlineAppSettingsAlt,
  MdOutlineKeyboardCommandKey,
} from "react-icons/md";

import logo from "@/app/(nextAuth)/nextAuthLogin/favicon.ico";
import { useTheme } from "next-themes";

interface TopNavbarProps {
  Logout: () => void;
}

const TopNavbar: FunctionComponent<TopNavbarProps> = ({ Logout }) => {
  const [open, setopen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    console.log(theme, "theme");

    setTheme(theme == "dark" ? "light" : "dark");
  };

  return (
    <Navbar maxWidth="2xl" className="border h-[8%]">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarBrand className="font-bold text-inherit">
        <Image src={logo.src} alt="torus-logo" className="w-12 h-10" />
        <span className="text-2xl">Torus</span>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Tooltip placement={"bottom"} content={"Help Menu"} color="secondary">
            <Link onPress={() => setopen(true)}>
              <AiOutlineQuestionCircle className="w-6 h-6 text-black dark:text-white" />
            </Link>
          </Tooltip>
          <Modal size={"sm"} isOpen={open} onOpenChange={setopen}>
            <ModalContent>
              <div className="p-3">
                <h1 className="font-bold ">Need Help?</h1>
                <h1 className="text-sm">
                  We value user feedback and want to help.
                </h1>
                <Divider className="my-2" />
                <h1>Torus Community</h1>
                <div className="flex justify-start gap-7">
                  <RiFeedbackLine className="w-6 h-6" />
                  <h1>Feedback</h1>
                </div>
                <div className="flex justify-start gap-7 my-4">
                  <GrBug className="w-6 h-6" />
                  <h1>Bug Report</h1>
                </div>
                <div className="flex justify-start gap-7 my-4">
                  <LiaYoutubeSquare className="w-6 h-6" />
                  <h1>Tutorials</h1>
                </div>
                <div className="flex justify-start gap-7 my-4">
                  <AiOutlineQuestionCircle className="w-6 h-6" />
                  <h1>FAQs & Docs</h1>
                </div>
                <div className="flex justify-start gap-7 my-4">
                  <AiOutlineQuestionCircle className="w-6 h-6" />
                  <h1>Current status/ Known issues</h1>
                </div>
              </div>
            </ModalContent>
          </Modal>
        </NavbarItem>
        <NavbarItem isActive>
          <Tooltip
            placement={"bottom"}
            content={"Keyboard Shortcuts"}
            color="secondary"
          >
            <Link onPress={onOpen}>
              <MdOutlineKeyboardCommandKey className="w-6 h-6  text-black dark:text-white" />
            </Link>
          </Tooltip>
          <Modal size={"xs"} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              <ModalHeader>Icon Keyboard palette</ModalHeader>
              <ModalBody>
                <h1>General</h1>
                <div>
                  <h1 className="flex justify-between">
                    Command Palette
                    <Kbd>ctrl + K</Kbd>
                  </h1>
                  <h1 className="flex justify-between my-3">
                    Cut Widget
                    <Kbd>ctrl + X</Kbd>
                  </h1>
                  <h1 className="flex justify-between my-3">
                    Copy Widget
                    <Kbd>ctrl + C</Kbd>
                  </h1>
                  <h1 className="flex justify-between my-3">
                    Duplicate Widget
                    <Kbd>ctrl + D</Kbd>
                  </h1>
                  <h1 className="flex justify-between my-3">
                    Paste Widget
                    <Kbd>ctrl + V</Kbd>
                  </h1>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </NavbarItem>
        <NavbarItem>
          <Tooltip
            placement={"bottom"}
            content={"Command Palette"}
            color="secondary"
          >
            <Link>
              <IoSearchSharp className="w-6 h-6  text-black dark:text-white" />
            </Link>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="">
        <NavbarItem>
          <Tooltip
            placement={"bottom"}
            content={"select another app"}
            color="secondary"
          >
            <Button
              size="sm"
              // onClick={() => dispatch(setApplicationName(""))}
            >
              <MdOutlineAppSettingsAlt size={20} />
            </Button>
          </Tooltip>
        </NavbarItem>
        <NavbarItem>
          <Tooltip
            placement={"bottom"}
            content={"It's been 28 days since you last saved a new version."}
            color="secondary"
          >
            <Dropdown>
              <DropdownTrigger>
                <Link className=" text-black dark:text-white">
                  <CgRedo className="w-7 h-7 " />
                  v1
                </Link>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">App 1</DropdownItem>
                <DropdownItem key="copy">App 2</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Tooltip>
        </NavbarItem>

        <div className="hover:border-1 hover:rounded-xl ">
          <NavbarItem>
            <Tooltip
              placement={"bottom"}
              content={"Comments"}
              color="secondary"
            >
              <Link>
                <FcOk className="w-6 h-6 " />
                <LiaComments className="w-6 h-6  text-black dark:text-white" />
              </Link>
            </Tooltip>
          </NavbarItem>
        </div>
        <div className="hover:border-1 hover:rounded-xl ">
          <NavbarItem>
            <Tooltip
              placement={"bottom"}
              content={"Project Issues"}
              color="secondary"
            >
              <Link>
                <FcOk className="w-6 h-6" />
                <GrBug className="w-5 h-5  text-black dark:text-white" />
              </Link>
            </Tooltip>
          </NavbarItem>
        </div>
        <div className="hover:border-1 hover:rounded-md ">
          <NavbarItem>
            <Tooltip
              placement={"bottom"}
              content={"Dveloper Menu"}
              color="secondary"
            >
              <Link>
                <FaCode className="w-6 h-6  text-black dark:text-white" />
              </Link>
            </Tooltip>
          </NavbarItem>
        </div>
        <div className="hover:border-1 hover:rounded-md ">
          <NavbarItem>
            <Tooltip
              placement={"bottom"}
              content={"Project Share"}
              color="secondary"
            >
              <Link>
                <RiShareBoxFill className="w-6 h-6  text-black dark:text-white" />
              </Link>
            </Tooltip>
          </NavbarItem>
        </div>
        <NavbarItem>
          <Tooltip placement="bottom" content="Preview App" color="secondary">
            <Button className=" " size={"sm"}>
              <MdPreview className="w-8 h-8 text-orange-600 dark:text-white" />
            </Button>
          </Tooltip>
        </NavbarItem>
        {isClient && (
          <NavbarItem>
            <Button size="sm" isIconOnly onClick={toggleTheme}>
              {theme == "light" ? (
                <CiBrightnessUp size={20} />
              ) : (
                <MdOutlineNightsStay size={20} />
              )}
            </Button>
          </NavbarItem>
        )}
        <NavbarItem>
          <Dropdown className=" bg-slate-100 text-slate-600  dark:bg-slate-500 dark:text-white">
            <DropdownTrigger>
              <Button isIconOnly>
                <FaUserCircle size={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem onClick={() => Logout()}>
                {loading ? <CircularProgress size="sm" /> : "LogOut"}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TopNavbar;
