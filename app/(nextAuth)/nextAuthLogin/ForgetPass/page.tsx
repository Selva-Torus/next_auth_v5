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
const page = () => {
  const [checkDetails, setCheckDetails] = useState(false);
  const [realmList, setRealmList] = useState<Realm[] | any[]>([]);
  const [steps, setSteps] = useState<string>("0");

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
    <div className="flex w-full h-screen bg-black justify-center items-center">
      {(() => {
        switch (steps) {
          case "0":
            return (
              <div className="w-[40%] h-[40%] bg-slate-400">
                <Dropdown className="w-[400px] border border-[#20252B]  p-0 ">
                  <DropdownTrigger>
                    <Button
                      size="lg"
                      variant="bordered"
                      className={`border-2 border-[#323B45] ${
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
                <h2>email</h2>
                <Input name="email" onChange={handleChange}></Input>
                <Button
                  onClick={() => {
                    handleForgetPass();
                  }}
                >
                  Submit
                </Button>
              </div>
            );
          case "1":
            return (
              <div className="w-[40%] h-[40%] bg-slate-400">
                <h2>enter Otp</h2>
                <Input name="otp" onChange={handleChange}></Input>
                <Button onClick={() => isOtpValid()}>Submit</Button>
              </div>
            );
          case "2":
            return (
              <div className="w-[40%] h-[40%] bg-slate-400">
                <h2>reset password</h2>
                <Input
                  name="password"
                  value={resetPassword.password}
                  onChange={handlePassChange}
                ></Input>
                <Input
                  name="confirmPassword"
                  value={resetPassword.confirmPassword}
                  onChange={handlePassChange}
                ></Input>
                <Button onClick={() => handleChangePassword()}> submit</Button>
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
