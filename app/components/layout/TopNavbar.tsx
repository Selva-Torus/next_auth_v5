import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Kbd,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
  Switch,
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
import { FaFolderPlus } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { MdOutlineKeyboardCommandKey } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import logo from "@/app/(nextAuth)/nextAuthLogin/favicon.ico";
import { useTheme } from "next-themes";
import {
  setAppGroup,
  setApplicationName,
  setIsProps,
  setPropsJson,
} from "@/app/utilsFunctions/Store/Reducers/MainSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/utilsFunctions/Store/store";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

interface TopNavbarProps {
  Logout: () => void;
}

const TopNavbar: FunctionComponent<TopNavbarProps> = ({ Logout }) => {
  const [open, setopen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isClient, setIsClient] = useState(false);
  const [localAppGroup, setLocalAppGroup] = useState("");
  const [localApp, setLocalApp] = useState("");
  const { theme, setTheme } = useTheme();
  const [openAppGroupPopover, setOpenAppGroupPopover] = useState(false);
  const [openApplicationPopover, setOpenApplicationPopover] = useState(false);
  const dispatch = useDispatch();
  const appGroup = useSelector((state: RootState) => state.main.appGroup);

  const router = useRouter();
  const pathname = usePathname();

  // console.log(pathname, "gjhfbh");

  const postAllApplicationGroup = async () => {
    try {
      if (localAppGroup) {
        const newGroup = await fetch(
          `http://192.168.2.110:3002/vpt/appGroupCreate?tenant=GSS-DEV&appGroup=${localAppGroup}`,
          {
            method: "POST",
          }
        ).then((res) => {
          dispatch(setAppGroup(localAppGroup));
          res.json();
          setOpenAppGroupPopover(false);
        });
      } else {
        toast.error("Please Enter AppGroup Name");
      }
      // setApplicationGroup(newGroup);
    } catch (error) {
      throw error;
    }
  };

  const postAllApplication = async () => {
    try {
      if (appGroup && localApp) {
        const newApp = await fetch(
          `http://192.168.2.110:3002/vpt/applicationCreate?tenant=GSS-DEV&appGroup=${appGroup}&applicationName=${localApp}`,
          {
            method: "POST",
          }
        ).then((res) => {
          dispatch(setApplicationName(localApp));
          res.json();
          setOpenApplicationPopover(false);
        });
      } else {
        toast.error(
          "Please enter valid Application Name and corresponding AppGroup"
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const toggleTheme = () => {
    console.log(theme, "theme");

    setTheme(theme == "dark" ? "light" : "dark");
  };

  return (
    <Navbar maxWidth="2xl" className="border-b h-[8%]">
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
            <div onClick={() => setopen(true)}>
              <AiOutlineQuestionCircle className="w-6 h-6 text-black dark:text-white" />
            </div>
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
            <div onClick={onOpen}>
              <MdOutlineKeyboardCommandKey className="w-6 h-6  text-black dark:text-white" />
            </div>
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
            <div>
              <IoSearchSharp className="w-6 h-6  text-black dark:text-white" />
            </div>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {pathname == "/nextAuthLogin/Torus" ? (
          <>
            <NavbarItem>
              <Tooltip
                placement={"bottom"}
                content={"Create AppGroup"}
                color="secondary"
              >
                <Link
                  className="mt-2"
                  size="sm"
                  // onPress={() => setOpenAppGroupPopover(true)}
                  onPress={() => {
                    dispatch(setIsProps()),
                      dispatch(
                        setPropsJson({
                          AG: [
                            {
                              code: "",

                              name: "",

                              description: "",

                              icon: "",

                              roles: [
                                { code: "ADMIN", name: "ADMIN" },
                                { code: "MAKER", name: "MAKER" },
                              ],

                              APPS: [
                                {
                                  code: "IPP",

                                  name: "InstantPaymentPlatform",

                                  description:
                                    "Instant payment platform governed by AEP(AlEthihad Payments)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },

                                {
                                  code: "EDDA",

                                  name: "ElectronicDirectDebitAuthorization",

                                  description:
                                    "Electronic DirectDebit Authorization governed by AEP(AlEthihad Payments)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },

                                {
                                  code: "ECHEQUE",

                                  name: "ElectronicDirectDebitAuthorization",

                                  description:
                                    "Electronic DirectDebit Authorization governed by AEP(AlEthihad Payments)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },
                              ],
                            },

                            {
                              code: "FPS",

                              name: "FastPaymentSystem",

                              description:
                                "Fast Payment System by Federal Reserve(USA)",

                              icon: "",

                              roles: [
                                { code: "ADMIN", name: "ADMIN" },
                                { code: "MAKER", name: "MAKER" },
                              ],

                              APPS: [
                                {
                                  code: "FEDNOW",

                                  name: "FEDNOW Service",

                                  description:
                                    "FEDNOW Service by Federal Reserve(USA)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },

                                {
                                  code: "FEDWIRE",

                                  name: "FEDWIRE",

                                  description:
                                    "FEDWIRE Service by Federal Reserve(USA)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },

                                {
                                  code: "FEDACH",

                                  name: "FEDACH",

                                  description:
                                    "FEDACH Service by Federal Reserve(USA)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },
                              ],
                            },
                          ],
                        })
                      );
                  }}
                >
                  <FaFolderPlus size={20} />
                </Link>
              </Tooltip>
              <Modal
                className="rounded-xl border-2 border-[#323B45] text-white bg-[#20252B] bg-opacity-800/70"
                isOpen={openAppGroupPopover}
                onOpenChange={(open) => setOpenAppGroupPopover(open)}
              >
                <ModalContent>
                  <ModalHeader className="flex flex-col gap-1">
                    Create AppGroup
                  </ModalHeader>
                  <ModalBody>
                    <div className="mb-3 flex flex-col ">
                      <Input
                        type="text"
                        placeholder="Enter AppGroup Name"
                        style={{ border: "none", boxShadow: "none" }}
                        onChange={(e) => setLocalAppGroup(e.target.value)}
                        className="rounded-lg"
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={postAllApplicationGroup}>
                      Create AppGroup
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {/* <Popover
            isOpen={openAppGroupPopover}
            onOpenChange={(open) => setOpenAppGroupPopover(open)}
          >
            <Tooltip
              placement={"bottom"}
              content={"Create AppGroup"}
              color="secondary"
            >
              <PopoverTrigger>
                <Link
                  size="sm"
                  // onClick={() => dispatch(setApplicationName(""))}
                >
                  <FaFolderPlus size={20} />
                </Link>
              </PopoverTrigger>
            </Tooltip>
            <PopoverContent>
              <div className="mb-3 flex flex-col ">
                <Input
                  type="text"
                  style={{ border: "none", boxShadow: "none" }}
                  onChange={(e) => setLocalAppGroup(e.target.value)}
                  className="border-2 rounded-lg"
                />
                <Button
                  className="bg-blue-500 text-white rounded px-3 mx-7 my-3"
                  onClick={postAllApplicationGroup}
                >
                  Create AppGroup
                </Button>
              </div>
            </PopoverContent>
          </Popover> */}
            </NavbarItem>
            <NavbarItem>
              <Tooltip
                placement={"bottom"}
                content={"Create Application"}
                color="secondary"
              >
                <Link
                  className="mt-2"
                  size="sm"
                  // onPress={() => setOpenApplicationPopover(true)}
                  onPress={() => {
                    dispatch(setIsProps()),
                      dispatch(
                        setPropsJson({
                          AG: [
                            {
                              code: "NPSS",

                              name: "National Payment System Strategy",

                              description:
                                "National Payment System Strategy by CBUAE",

                              icon: "",

                              roles: [
                                { code: "ADMIN", name: "ADMIN" },
                                { code: "MAKER", name: "MAKER" },
                              ],

                              APPS: [
                                {
                                  code: "IPP",

                                  name: "InstantPaymentPlatform",

                                  description:
                                    "Instant payment platform governed by AEP(AlEthihad Payments)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },

                                {
                                  code: "EDDA",

                                  name: "ElectronicDirectDebitAuthorization",

                                  description:
                                    "Electronic DirectDebit Authorization governed by AEP(AlEthihad Payments)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },

                                {
                                  code: "ECHEQUE",

                                  name: "ElectronicDirectDebitAuthorization",

                                  description:
                                    "Electronic DirectDebit Authorization governed by AEP(AlEthihad Payments)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },
                              ],
                            },

                            {
                              code: "FPS",

                              name: "FastPaymentSystem",

                              description:
                                "Fast Payment System by Federal Reserve(USA)",

                              icon: "",

                              roles: [
                                { code: "ADMIN", name: "ADMIN" },
                                { code: "MAKER", name: "MAKER" },
                              ],

                              APPS: [
                                {
                                  code: "FEDNOW",

                                  name: "FEDNOW Service",

                                  description:
                                    "FEDNOW Service by Federal Reserve(USA)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },

                                {
                                  code: "FEDWIRE",

                                  name: "FEDWIRE",

                                  description:
                                    "FEDWIRE Service by Federal Reserve(USA)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },

                                {
                                  code: "FEDACH",

                                  name: "FEDACH",

                                  description:
                                    "FEDACH Service by Federal Reserve(USA)",

                                  icon: "",

                                  roles: [
                                    { code: "CHECKER", name: "CHECKER" },
                                    { code: "MAKER", name: "MAKER" },
                                  ],
                                },
                              ],
                            },
                          ],
                        })
                      );
                  }}
                >
                  <FaFileCirclePlus size={20} />
                </Link>
              </Tooltip>
              <Modal
                className="rounded-xl border-2 border-[#323B45] text-white bg-[#20252B] bg-opacity-800/70"
                isOpen={openApplicationPopover}
                onOpenChange={(open) => setOpenApplicationPopover(open)}
              >
                <ModalContent>
                  <ModalHeader className="flex flex-col">
                    Create Application
                  </ModalHeader>
                  <ModalBody>
                    <div className="mb-3 flex flex-col ">
                      <Input
                        type="text"
                        placeholder="Enter Application Name"
                        style={{ border: "none", boxShadow: "none" }}
                        onChange={(e) => setLocalApp(e.target.value)}
                        className="rounded-lg"
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={postAllApplication}>
                      Create Application
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {/* <Popover
            isOpen={openApplicationPopover}
            onOpenChange={(open) => setOpenApplicationPopover(open)}
          >
            <Tooltip
              placement={"bottom"}
              content={"Create Application"}
              color="secondary"
            >
              <PopoverTrigger>
                <Link
                  size="sm"
                  // onClick={() => dispatch(setApplicationName(""))}
                >
                  <FaFileCirclePlus size={20} />
                </Link>
              </PopoverTrigger>
            </Tooltip>
            <PopoverContent>
              <div className="mb-3 flex flex-col ">
                <Input
                  type="text"
                  style={{ border: "none", boxShadow: "none" }}
                  onChange={(e) => setLocalApp(e.target.value)}
                  className="border-2 rounded-lg"
                />
                <Button
                  className="bg-blue-500 text-white rounded px-3 mx-7 my-3"
                  onClick={postAllApplication}
                >
                  Create Application
                </Button>
              </div>
            </PopoverContent>
          </Popover> */}
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Tooltip content={"Go to Application page"} color="secondary">
              <Link href="/nextAuthLogin/Torus">
                <IoArrowBackCircleSharp className="w-7 h-7 mt-2 " />
              </Link>
            </Tooltip>
          </NavbarItem>
        )}
        <NavbarItem>
          <Tooltip
            placement={"bottom"}
            content={"It's been 28 days since you last saved a new version."}
            color="secondary"
          >
            <Dropdown>
              <DropdownTrigger>
                <div className="flex items-center">
                  <CgRedo className="w-7 h-7 " />
                  v1
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">App 1</DropdownItem>
                <DropdownItem key="copy">App 2</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Tooltip>
        </NavbarItem>

        {/* <div className="hover:border-1 hover:rounded-xl "> */}
        <NavbarItem>
          <Tooltip placement={"bottom"} content={"Comments"} color="secondary">
            <div className="flex items-center">
              <FcOk className="w-6 h-6 " />
              <LiaComments className="w-6 h-6 " />
            </div>
          </Tooltip>
        </NavbarItem>
        {/* </div> */}
        {/* <div className="hover:border-1 hover:rounded-xl "> */}
        <NavbarItem>
          <Tooltip
            placement={"bottom"}
            content={"Project Issues"}
            color="secondary"
          >
            <div className="flex items-center">
              <FcOk className="w-6 h-6" />
              <GrBug className="w-5 h-5 " />
            </div>
          </Tooltip>
        </NavbarItem>
        {/* </div> */}
        {/* <div className="hover:border-1 hover:rounded-md ">
          <NavbarItem>
            <Tooltip
              placement={"bottom"}
              content={"Developer Menu"}
              color="secondary"
            >
              <Link>
                <FaCode className="w-6 h-6  text-black dark:text-white" />
              </Link>
            </Tooltip>
          </NavbarItem>
        </div> */}
        {/* <div className="hover:border-1 hover:rounded-md "> */}
        <NavbarItem>
          <Tooltip
            placement={"bottom"}
            content={"Project Share"}
            color="secondary"
          >
            <div className="flex items-center">
              <RiShareBoxFill className="w-6 h-6 " />
            </div>
          </Tooltip>
        </NavbarItem>
        {/* </div> */}
        {/* <NavbarItem>
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
        )} */}
        <NavbarItem>
          <Switch
            className="mt-2"
            size="sm"
            color="primary"
            onClick={toggleTheme}
          >
            {theme == "dark" ? "" : ""}
          </Switch>
        </NavbarItem>

        <NavbarItem>
          <Dropdown className=" bg-slate-100 text-slate-600  dark:bg-slate-500 dark:text-white">
            <DropdownTrigger>
              <Button isIconOnly>
                <FaUserCircle size={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem onClick={() => Logout()}>LogOut</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TopNavbar;
