"use client";
import {
  forgetPass,
  getAllRealm,
  getAllRealmOnDatabase,
  getClientcredentials,
  otpCheck,
  resetPasswordOnDatabase,
} from "@/app/utilsFunctions/ulits/keyCloakAuth";
import { Button, Input } from "@nextui-org/react";
import email from "next-auth/providers/email";
import Image from "next/image";
import logo from "../favicon.ico";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
type Realm = {
  id: string;
  name: string;
};
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";

const page = () => {
  const [checkDetails, setCheckDetails] = useState(false);
  const [realmList, setRealmList] = useState<Realm[] | any[]>([]);
  const [steps, setSteps] = useState<string>("0");

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [data, setData] = useState({
    realm: "",
    realmId: "",
    email: "",
    otp: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllRealmOnDatabase();
        setRealmList(res);
        console.log(res);
      } catch (error) {
        console.log("error");
        setRealmList([]);
      }
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPassword({ ...resetPassword, [name]: value });
    if (name == "confirmPassword") {
      setResetPasswordData({ ...resetPasswordData, password: value });
    }
  };

  const handleSelectRealm = async (datas: any) => {
    // setRealmId(datas.id);
    setData({ ...data, realmId: datas.id, realm: datas.name });
    // setData({ ...data, realm: datas.name });
    // handleClientCredentials();
  };

  const handleForgetPass = async () => {
    await forgetPass(data).then((res) => {
      if (res.data == "Email sent") {
        setSteps("1");
      } else {
        alert(res.error);
      }
    });
  };

  const [resetPasswordData, setResetPasswordData] = useState({
    userId: "",
    password: "",
  });

  const isOtpValid = async () => {
    await otpCheck(data).then((res) => {
      if (res.userId) {
        setResetPasswordData({ ...resetPasswordData, userId: res.userId });
        setSteps("2");
      } else alert(res.error);
    });
  };

  const routes = useRouter();
  const handleChangePassword = async () => {
    if (
      resetPassword.password == resetPassword.confirmPassword &&
      resetPassword.password
    ) {
      resetPasswordOnDatabase(resetPasswordData).then((res) => {
        if (res.data == "password updated") {
          alert("password changed successfully");
          routes.push("/nextAuthLogin");
        } else alert("something went wrong");
      });
    }
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(17,15,18,1) 0%, rgba(110,68,139,1) 45%, rgba(117,59,94,1) 55%, rgba(24,24,23,1) 100%)",
      }}
      className="flex flex-col  w-full h-screen justify-center items-center gap-2 overflow-y-auto"
    >
      <div className="flex gap-2">
        <Image
          className=" w-12 h-12 my-3 transition-all"
          src={logo}
          alt=""
        ></Image>

        <h2 className="text-center my-3 font-bold text-4xl text-white">
          Torus
        </h2>
      </div>

      {/* <div className="flex w-full h-screen bg-black justify-center items-center"> */}
      {(() => {
        switch (steps) {
          case "0":
            return (
              <div className="w-[40%] h-[40%] bg-slate-800/70 text-center text-white ">
                <Dropdown className="w-[400px] border border-[#20252B]  p-0 ">
                  <DropdownTrigger>
                    <Button
                      size="lg"
                      variant="bordered"
                      className={`border-2 border-[#323B45] mx-44 my-3 ${
                        checkDetails && !data.realm
                          ? "text-red-400"
                          : "text-white"
                      }`}
                    >
                      {data.realm ? data.realm : "Select Tenant"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Link Actions"
                    className=" text-white rounded-sm"
                    variant="light"
                    classNames={{
                      base: "bg-[#20252B] border-1 border-black",
                    }}
                  >
                    {realmList.map((realm, id) => (
                      <DropdownItem
                        className=" text-white hover:bg-slate-500"
                        key={id}
                        onClick={() => handleSelectRealm(realm)}
                      >
                        {realm.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Input
                  className="w-[90%] my-8 mx-7 bg-transparent text-white"
                  name="email"
                  label="Email"
                  labelPlacement="outside"
                  color={`${
                    checkDetails ? "danger" : "primary"
                  }`}
                  onChange={handleChange}
                  classNames={{
                    base: " w-full h-6 my-2",
                    label: [
                      // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                      "text-xs text-white focus-within:text-white",
                    ],

                    inputWrapper: [
                      "border border-slate-500/50",
                      "text-white",
                      "bg-transparent",
                      "data-[hover=true]:bg-[#282551]",
                      "data-[hover=true]:border-[#4435CF]",
                      "focus-within:!bg-[#282551]",
                      "focus-within:border-[#4435CF] border-2",
                    ],
                    innerWrapper: ["bg-transparent", "boder-2 border-blue-100"],
                  }}
                ></Input>
                <Button
                  onClick={() => {
                    handleForgetPass();
                  }}
                  color="primary"
                  className=" my-5 w-[90%] text-end"
                  type="submit"
                >
                  submit
                </Button>
              </div>
            );
          case "1":
            return (
              <div className="w-[40%] h-[35%] bg-slate-800/70 text-center text-white">
                <div className="my-10">
                <Input
                  className="w-[90%] mx-7  bg-transparent text-white"
                  name="otp"
                  label="Enter Otp"
                  labelPlacement="outside"
                  color={`${
                    checkDetails ? "danger" : "primary"
                  }`}
                  onChange={handleChange}
                  classNames={{
                    base: " w-full",
                    label: [
                      // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                      "text-xs text-white focus-within:text-white",
                    ],

                    inputWrapper: [
                      "border border-slate-500/50",
                      "text-white",
                      "bg-transparent",
                      "data-[hover=true]:bg-[#282551]",
                      "data-[hover=true]:border-[#4435CF]",
                      "focus-within:!bg-[#282551]",
                      "focus-within:border-[#4435CF] border-2",
                    ],
                    innerWrapper: ["bg-transparent", "boder-2 border-blue-100"],
                  }}
                ></Input>
                </div>
                <Button
                  onClick={() => isOtpValid()}
                  color="primary"
                  className=" my-5 w-[90%] text-end"
                  type="submit"
                >
                  submit
                </Button>
              </div>
            );
          case "2":
            return (
              <div className="p-4 my-4 rounded-xl shadow-md w-[42%] flex flex-col gap-4 border-2 border-[#323B45]  text-white bg-slate-800/70">
                <h2 className="text-center text-red-300">reset password</h2>
                <Input
                  type={isVisible ? "text" : "password"}
                  label="password"
                  labelPlacement="outside"
                  color={`${
                    checkDetails ? "danger" : "primary"
                  }`}
                  name="password"
                  value={resetPassword.password}
                  onChange={handlePassChange}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  classNames={{
                    base: " w-full h-6 my-2 ",
                    label: [
                      // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                      "text-xs  text-white focus-within:text-white",
                    ],

                    inputWrapper: [
                      "border border-slate-500/50",
                      "text-white",
                      "bg-transparent",
                      "data-[hover=true]:bg-[#282551]",
                      "data-[hover=true]:border-[#4435CF]",
                      "focus-within:!bg-[#282551]",
                      "focus-within:border-[#4435CF] border-2",
                    ],
                    innerWrapper: ["bg-transparent", "boder-2 border-blue-100"],
                  }}
                ></Input>
                <Input
                  label="ConfirmPassword"
                  name="confirmPassword"
                  labelPlacement="outside"
                  color={`${
                    checkDetails ? "danger" : "primary"
                  }`}
                  value={resetPassword.confirmPassword}
                  onChange={handlePassChange}
                  classNames={{
                    base: " w-full h-6 my-2 ",
                    label: [
                      // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                      "text-xs  text-white focus-within:text-white",
                    ],

                    inputWrapper: [
                      "border border-slate-500/50",
                      "text-white",
                      "bg-transparent",
                      "data-[hover=true]:bg-[#282551]",
                      "data-[hover=true]:border-[#4435CF]",
                      "focus-within:!bg-[#282551]",
                      "focus-within:border-[#4435CF] border-2",
                    ],
                    innerWrapper: ["bg-transparent", "boder-2 border-blue-100"],
                  }}
                ></Input>
                <Button
                  onClick={() => handleChangePassword()}
                  color="primary"
                  variant="bordered"
                  className="w-full my-5 text-white border-2 border-[#323B45] bg-blue-500"
                >
                  {" "}
                  submit
                </Button>
              </div>
            );
          default:
            break;
        }
      })()}
    </div>
  );
};

export default page;
