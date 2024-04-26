"use client";
import React, { useState } from "react";
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

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import {
  getVerifyOtp,
  validateOtp,
} from "@/app/utilsFunctions/ulits/keyCloakAuth";

const RegisterForm = () => {
  const [userData, setUserData] = useState<any>({});
  const [steps, setSteps] = useState("0");
  const router = useRouter();
  const schema = z.object({
    username: z
      .string()
      .min(2, { message: "username should be at least 2 characters" })
      .max(20, { message: "max limit" }),
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(4),
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
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

    setUserData(requestBody);
    getVerifyOtp({ email: data.email }).then((res) => {
      if (res.data == "Email sent") setSteps("1");
      else alert("unable to send otp");
    });
  };
  const [otp, setOtp] = useState<any>({ otp: "" });

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOtp({ [name]: value });
  };
  const verifyOtpandPostUser = async () => {
    // console.log(userData);
    const res = await validateOtp({ otp: otp.otp, email: userData.email });
    console.log(res);
    if (res.error == "Invalid Otp or OTP expired") {
      alert("Invalid Otp or OTP expired");
    } else {
      if (res.data == "Email verified successfully") {
        try {
          const token = localStorage.getItem("registertoken");

          const headers = {
            Authorization: `Bearer ${token}`, // Include bearer token in headers
          };

          axios
            .post(
              "https://keycloak9x.gsstvl.com:18443/admin/realms/testRealm/users",
              userData,
              {
                headers: headers,
              }
            )
            .then((res) => {
              console.log(res);
              if (res.status == 201) {
                router.push("/nextAuthLogin");
                alert("new user created");
              } else {
                alert("failed to create");
              }
            });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full md:max-w-screen   items-center  "> 

    <div className="flex flex-col gap-2 w-full   items-center justify-center min-h-screen  bg-slate-400"

      style={{
        background:
          "radial-gradient(circle, rgba(67,57,208,1) 0%, rgba(9,9,121,1) 19%, rgba(18,18,19,1) 100%)",
      }}
    >
      
      <div className="flex gap-2 ">
        <Image className=" w-12 h-12   transition-all" src={logo} alt=""></Image>

        <h2 className="text-center font-bold text-4xl text-white">Torus</h2>
      </div>

      {(() => {
        switch (steps) {
          case "0":
            return (
              <div className="p-4 rounded-xl shadow-md w-[42%] flex flex-col gap-4 border-2 border-[#323B45]  text-white bg-slate-800/70">
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
                      <span className="ml-2 text-black text-sm">
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
                      <span className="ml-2 text-black text-sm">
                        Sign in with Google
                      </span>
                    </Button>
                  </div>
                  <h2 className="text-slate-400 text-[14px]">
                    Or continue with
                  </h2>
                </div>
                <form
                  onSubmit={handleSubmit(submitData)}
                  className="flex flex-col gap-2"
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
                    <p className="text-red-500" style={{ color: "red" }}>
                      {errors?.username?.message as string}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Input
                      label="firstname"
                      labelPlacement="outside"
                      variant="bordered"
                      color={`${errors.firstName ? "danger" : "primary"}`}
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
                      type="text"
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-red-500" style={{ color: "red" }}>
                        {errors.firstName.message as string}
                      </p>
                    )}

                    <Input
                      label="Lastname"
                      labelPlacement="outside"
                      variant="bordered"
                      color={`${errors.lastName ? "danger" : "primary"}`}
                      classNames={{
                        base: " w-full h-7 my-2",
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
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-red-500">
                        {errors.lastName.message as string}
                      </p>
                    )}
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
                    <p className="text-red-500">
                      {errors.email.message as string}
                    </p>
                  )}
                  <div className="flex gap-2">
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
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red-500">
                        {errors.password.message as string}
                      </p>
                    )}
                    <Input
                      type={isVisible ? "text" : "Confirm Password"}
                      label="Confirm Password"
                      labelPlacement="outside"
                      variant="bordered"
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
                      {...register("confirm password")}
                    />
                    {errors.password && (
                      <p className="text-red-500">
                        {errors.password.message as string}
                      </p>
                    )}
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
                  type="number"
                  onChange={handleOtpChange}
                />
                <Button onClick={verifyOtpandPostUser}>Submit</Button>
              </div>
            );
        }
      })()}

    </div>
     </div>
  );
};

export default RegisterForm;
