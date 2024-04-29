"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Remove unused import: boolean
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../favicon.ico";
import picture from "@/app/assets/google.png";
import pictures from "@/app/assets/github.png";
import { toast } from "react-toastify";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import {
  getAllRealm,
  getClientcredentials,
  getVerifyOtp,
  validateOtp,
} from "@/app/utilsFunctions/ulits/keyCloakAuth";

type Realm = {
  id: string;
  name: string;
};
const RegisterForm = () => {
  const [checkDetails, setCheckDetails] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [realmData, setRealmData] = useState<any>({
    realm: "",
    client_id: "",
    client_secret: "",
  });
  const [steps, setSteps] = useState("0");
  const [token, setToken] = useState<any>();
  const [realmList, setRealmList] = useState<Realm[] | any[]>([]);
  const [realmId, setRealmId] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllRealm();

        res.status == 200
          ? setRealmList(res.data)
          : // setData({ ...data, realm: res.data[0].name })

            setRealmList([]);
      } catch (err) {
        console.log("Error occured");
      }
    })();
  }, []);

  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisibility, setIsVisibility] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisible = () => setIsVisibility(!isVisibility);

  const schema = z
    .object({
      username: z
        .string()
        .min(2, { message: "username should be at least 2 characters" })
        .max(20, { message: "max limit" }),
      firstName: z
        .string()
        .min(3, { message: "firstName should be at least 3 characters" })
        .max(30),
      lastName: z.string().min(1, { message: "Please provide lastName" }),
      email: z.string().email(),
      password: z.string().min(4, { message: "Please provide valid password" }),
      confirmPassword: z
        .string()
        .min(4, { message: "Please provide valid password" }),
    })
    .refine((data: any) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const getRealmRegisToken = async (userEmail: any) => {
    // Define the URL
    const url = `https://keycloak9x.gsstvl.com:18443/realms/${realmData.realm}/protocol/openid-connect/token`;

    // if(userData )
    // Define the request body as a URL-encoded string
    const requestBody = {
      grant_type: "client_credentials",
      client_id: realmData.client_id,
      client_secret: realmData.client_secret,
    };

    // Define the headers
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const encodeFormData = (data: any) => {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    };

    // Make the POST request with request body and headers
    const res = await axios.post(url, encodeFormData(requestBody), {
      headers: headers,
    });
    console.log(res);
    if (res.data) {
      setToken(res.data.access_token);
      console.log("register token", res.data.access_token);

      console.log(userEmail);

      getVerifyOtp({ email: userEmail }).then((res) => {
        console.log(res);

        if (res.data == "Email sent") {
          console.log("email sent");
          toast.success("Otp sent to the provided email")

          setSteps("1");
        } else toast.error("unable to send otp");
      });
    } else {
      toast.error("error occured");
    }
  };
  const submitData = async (data: any) => {
    const requestBody = {
      attributes: {
        attribute_key: "test_value",
      },
      credentials: [
        {
          temporary: false,
          type: "password",
          value: data.password,
        },
      ],
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      emailVerified: true,
      enabled: true,
    };
    // console.log({ ...requestBody, ...userData });
    console.log("requestBody", requestBody);

    setUserData(requestBody);
    getRealmRegisToken(data.email);
  };

  const [otp, setOtp] = useState<any>({ otp: "" });

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOtp({ [name]: value });
  };
  const verifyOtpandPostUser = async () => {
    console.log("otp", otp);

    // console.log("userData", userData);
    const res = await validateOtp({
      otp: otp.otp,
      email: userData.email,
    });
    console.log(res);
    if (res.error == "Invalid Otp or OTP expired") {
      toast.error("Invalid Otp or OTP expired");
    } else {
      if (res.data == "Email verified successfully") {
        try {
          const headers = {
            Authorization: `Bearer ${token}`, // Include bearer token in headers
          };

          console.log("userData", userData);
          console.log("token", token);
          console.log("realmData", realmData);

          axios
            .post(
              `https://keycloak9x.gsstvl.com:18443/admin/realms/${realmData.realm}/users`,
              userData,
              {
                headers: headers,
              }
            )
            .then((res) => {
              console.log(res);
              if (res.status == 201) {
                router.push("/nextAuthLogin");
                toast.success("Registered successfully");
              } else {
                toast.error("failed to create");
              }
            });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  const handleSelectRealm = async (datas: any) => {
    setRealmId(datas.id);
    setRealmData({ ...realmData, realm: datas.name });
    // handleClientCredentials();
  };
  const handleClientCredentials = async () => {
    const res = await getClientcredentials(realmId);
    if (res.data.length) {
      setRealmData({
        ...realmData,
        client_id: res.data[0].client_id,
        client_secret: res.data[0].secret,
      });
    }
  };

  useEffect(() => {
    handleClientCredentials();
  }, [realmId]);

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full md:max-w-screen   items-center  ">
      <div
        className="flex flex-col gap-2 w-full   items-center justify-center min-h-screen  bg-slate-400"
        style={{
          background:
            "radial-gradient(circle, rgba(67,57,208,1) 0%, rgba(9,9,121,1) 19%, rgba(18,18,19,1) 100%)",
        }}
      >
        <div className="flex gap-2 ">
          <Image
            className=" w-12 h-12   transition-all"
            src={logo}
            alt=""
          ></Image>

          <h2 className="text-center font-bold text-4xl text-white">Torus</h2>
        </div>

        {(() => {
          switch (steps) {
            case "0":
              return (
                <div className="p-4 rounded-xl shadow-md w-[42%] flex flex-col gap-4 border-2 border-[#323B45] text-white bg-slate-800/70">
                  <div>
                    <h2 className="text-2xl text-bold font-semibold ">
                      Create Account
                    </h2>
                    <p className="text-slate-400 text-[14px]">
                      Sign into your account by entering your information below
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center w-full gap-3 ">
                    <div className="grid grid-cols-2 gap-1">
                      <Button className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2">
                        <Image
                          src={pictures}
                          alt="GitHub logo"
                          width={20}
                          height={25}
                        />
                        <span className="ml-2 text-black text-sm font-semibold">
                          Sign in with GitHub
                        </span>
                      </Button>
                      <Button className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2">
                        <Image
                          src={picture}
                          alt="Google logo"
                          width={30}
                          height={35}
                        />
                        <span className="ml-2 text-black text-sm font-semibold">
                          Sign in with Google
                        </span>
                      </Button>
                    </div>
                    <h2 className="text-slate-400 text-[14px]">
                      Or continue with
                    </h2>
                  </div>
                  
                  <Dropdown className="w-[400px] border border-[#20252B]  p-0 ">
                    <DropdownTrigger>
                      <Button
                        size="lg"
                        variant="bordered"
                        className={`border-2 border-[#323B45] ${
                          checkDetails && !realmData.realm
                            ? "text-red-400"
                            : "text-white"
                        }`}
                      >
                        {realmData.realm ? realmData.realm : "Select Tenant"}
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
                          className=" text-white hover:bg-slate-200"
                          key={id}
                          onClick={() => handleSelectRealm(realm)}
                        >
                          {realm.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>

                  <form
                    onSubmit={handleSubmit(submitData)}
                    className="flex flex-col gap-1"
                  >
                    <Input
                      label=" Enter your username"
                      labelPlacement="outside"
                      variant="bordered"
                      color={`${errors.username ? "danger" : "primary"}`}
                      classNames={{
                        base: " w-full h-7 my-2 -mt-3 ",
                        label: ["text-xs  text-white focus-within:text-white"],

                        inputWrapper: [
                          "border border-slate-500/50",
                          "text-white",
                          "bg-transparent",
                          "data-[hover=true]:bg-[#282551]",
                          "data-[hover=true]:border-[#4435CF]",
                          "focus-within:!bg-[#282551]",
                          "focus-within:border-[#4435CF] border-2",
                        ],
                        innerWrapper: [
                          "bg-transparent",
                          "boder-2 border-blue-100",
                        ],
                      }}
                      type="text"
                      {...register("username")}
                    />
                    {errors.username && (
                      <p
                        className="text-red-500 text-xs"
                        style={{ color: "red" }}
                      >
                        {errors?.username?.message as string}
                      </p>
                    )}
                    <div className="flex justify-between text-xs gap-2">
                      <div className="flex flex-col gap-2 w-full">
                        <Input
                          label="firstname"
                          labelPlacement="outside"
                          variant="bordered"
                          color={`${errors.firstName ? "danger" : "primary"}`}
                          classNames={{
                            base: " w-full h-7 my-2 ",
                            label: [
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
                            innerWrapper: [
                              "bg-transparent",
                              "boder-2 border-blue-100",
                            ],
                          }}
                          type="text"
                          {...register("firstName")}
                        />
                        {errors.firstName && (
                          <p
                            className="text-red-500 flex flex-col"
                            style={{ color: "red" }}
                          >
                            {errors.firstName.message as string}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <Input
                          label="Lastname"
                          labelPlacement="outside"
                          variant="bordered"
                          color={`${errors.lastName ? "danger" : "primary"}`}
                          classNames={{
                            base: " w-full h-7 my-2 ",
                            label: [
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
                            innerWrapper: [
                              "bg-transparent",
                              "boder-2 border-blue-100",
                            ],
                          }}
                          type="text"
                          {...register("lastName")}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 flex flex-col">
                            {errors.lastName.message as string}
                          </p>
                        )}
                      </div>
                    </div>
                    <Input
                      label="Email"
                      labelPlacement="outside"
                      variant="bordered"
                      color={`${errors.email ? "danger" : "primary"}`}
                      classNames={{
                        base: " w-full h-7 my-2 ",
                        label: ["text-xs  text-white focus-within:text-white"],

                        inputWrapper: [
                          "border border-slate-500/50",
                          "text-white",
                          "bg-transparent",
                          "data-[hover=true]:bg-[#282551]",
                          "data-[hover=true]:border-[#4435CF]",
                          "focus-within:!bg-[#282551]",
                          "focus-within:border-[#4435CF] border-2",
                        ],
                        innerWrapper: [
                          "bg-transparent",
                          "boder-2 border-blue-100",
                        ],
                      }}
                      type="email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message as string}
                      </p>
                    )}
                    <div className="flex justify-between text-xs gap-2">
                      <div className="flex flex-col gap-2 w-full">
                        <Input
                          type={isVisible ? "text" : "password"}
                          label="Password"
                          labelPlacement="outside"
                          variant="bordered"
                          color={`${errors.password ? "danger" : "primary"}`}
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
                            base: " w-full h-7 my-2 ",
                            label: [
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
                            innerWrapper: [
                              "bg-transparent",
                              "boder-2 border-blue-100",
                            ],
                          }}
                          {...register("password")}
                        />
                        {errors.password && (
                          <p className="text-red-500">
                            {errors.password.message as string}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <Input
                          type={isVisibility ? "text" : "password"}
                          label="confirmPassword"
                          labelPlacement="outside"
                          variant="bordered"
                          color={`${
                            errors.confirmPassword ? "danger" : "primary"
                          }`}
                          endContent={
                            <button
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleVisible}
                            >
                              {isVisibility ? (
                                <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                          classNames={{
                            base: " w-full h-7 my-2 ",
                            label: [
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
                            innerWrapper: [
                              "bg-transparent",
                              "boder-2 border-blue-100",
                            ],
                          }}
                          {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500">
                            {errors.confirmPassword.message as string}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center w-full gap-3">
                        <p className="text-slate-400 text-[14px]">
                          Already have an account?{" "}
                        </p>
                        <span
                          className="cursor-pointer hover:bg-slate-400 rounded-full p-2 text-[14px] text-green-300"
                          onClick={() => router.push("/nextAuthLogin")}
                        >
                          login
                        </span>
                      </div>
                      <Button
                        color="primary"
                        className="mt-2 text-end"
                        type="submit"
                        onClick={()=>setCheckDetails(true)}
                      >
                        submit
                      </Button>
                    </div>
                  </form>
                </div>
              );
            case "1":
              return (
                <div className="p-4 rounded-xl shadow-md w-[42%] flex flex-col gap-4 border-2 border-[#323B45]  text-white bg-slate-800/70">
                  <p className="text-center text-[16px]">Enter OTP</p>
                  <Input
                    name="otp"
                    label="OTP"
                    labelPlacement="outside"
                    type="text"
                    onChange={handleOtpChange}
                    color={`${errors.password ? "danger" : "primary"}`}
                    classNames={{
                      base: " w-full h-7 my-2 ",
                      label: ["text-xs  text-white focus-within:text-white"],

                      inputWrapper: [
                        "border border-slate-500/50",
                        "text-white",
                        "bg-transparent",
                        "data-[hover=true]:bg-[#282551]",
                        "data-[hover=true]:border-[#4435CF]",
                        "focus-within:!bg-[#282551]",
                        "focus-within:border-[#4435CF] border-2",
                      ],
                      innerWrapper: [
                        "bg-transparent",
                        "boder-2 border-blue-100",
                      ],
                    }}
                  />
                  <Button
                    color="primary"
                    className="mt-2 text-end"
                    onClick={verifyOtpandPostUser}
                  >
                    Submit
                  </Button>
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
};

export default RegisterForm;
