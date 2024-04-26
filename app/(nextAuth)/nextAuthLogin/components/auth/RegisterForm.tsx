// "use client";
// import { register } from "@/app/(main)/action/register";
// import { Button, Input } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
// import React, { FC, useState } from "react";

// const RegisterForm: FC = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: "",
//     username: "",
//     password: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     register(formData)
//       .then((response) => {
//         // Handle successful registration, such as redirecting to another page
//         // router.push('/success');
//       })
//       .catch((error) => {
//         // Handle registration error, such as displaying an error message
//         console.error("Registration failed:", error);
//       });
//   };

//   const handleNavigateToLogin = () => {
//     router.push("/");
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col justify-center items-center gap-2"
//       >
//         <Input
//           label="email"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//         <Input
//           label="username"
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleInputChange}
//         />
//         <Input
//           label="password"
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleInputChange}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//       <div>
//         Already have an account{" "}
//         <span className="cursor-pointer" onClick={handleNavigateToLogin}>
//           Login here
//         </span>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

"use client";
import React from "react";
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

const RegisterForm = () => {
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
    try {
      console.log("It Worked", data);
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
        emailVerified: false,
        enabled: true,
      };

      const token = localStorage.getItem("registertoken");

      const headers = {
        Authorization: `Bearer ${token}`, // Include bearer token in headers
      };

      axios
        .post(
          "https://keycloak9x.gsstvl.com:18443/admin/realms/testRealm/users",
          requestBody,
          {
            headers: headers,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            router.push("/keyCloakLogin");
            alert("new user created");
          } else {
            alert("failed to create");
          }
        });
    } catch (error) {
      console.error("Error:", error);
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

      <div className="p-1 md:p-4 -mt-4 rounded-xl shadow-md w-full md:w-[40%] h-[50%] flex flex-col gap-2 md:gap-4 border-2 border-[#323B45] text-white bg-slate-800/70">


        <div>
          <h2 className="text-2xl text-bold font-semibold ">Create Account</h2>
          <p className="text-slate-400 text-[14px]">
            Sign into your account by entering your information below
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-3 ">
          <div className="grid grid-cols-2 gap-1">
            <Button className="google-signin-button flex items-center h-8 bg-white border border-black rounded-md px-4 py-2">
              <Image src={pictures} alt="GitHub logo" width={20} height={25} />
              <span className="ml-2 text-black text-sm">
                Sign in with GitHub
              </span>
            </Button>
            <Button className="google-signin-button flex items-center bg-white border border-black rounded-md h-8 px-4 py-2">
              <Image src={picture} alt="Google logo" width={30} height={35} />
              <span className="ml-2 text-black text-sm">
                Sign in with Google
              </span>
            </Button>
          </div>
          <h2 className="text-slate-400  text-[14px]">Or continue with</h2>
        </div>
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex flex-col gap-2"
        >
          <Input
            label=" Enter your username"
            variant="bordered"
            color={`${errors.username ? "danger" : "primary"}`}
            classNames={{
              base: " w-full h-7 my-2 -mt-3 ",
              label: [
                // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                "text-xs  text-white focus-within:text-white",
              ],

              // mainWrapper: ["h-full text-white rounded-xl bg-transparent"],

              // input: [
              //   "bg-transparent",
              //   "text-black",
              //   "placeholder:text-white",
              //   "text-sm",
              //   "font-bold",
              // ],

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
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500" style={{ color: "red" }}>
              {errors?.username?.message as string}
            </p>
          )}
          <Input
            label="firstname"
            variant="bordered"
            color={`${errors.firstName ? "danger" : "primary"}`}
            classNames={{
              base: " w-full h-7 my-2 ",
              label: [
                // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                "text-xs  text-white focus-within:text-white",
              ],

              // mainWrapper: ["h-full text-white rounded-xl bg-transparent"],

              // input: [
              //   "bg-transparent",
              //   "text-black",
              //   "placeholder:text-white",
              //   "text-sm",
              //   "font-bold",
              // ],

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
            variant="bordered"
            color={`${errors.lastName ? "danger" : "primary"}`}
            classNames={{
              base: " w-full h-7 my-2",
              label: [
                // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                "text-xs  text-white focus-within:text-white",
              ],

              // mainWrapper: ["h-full text-white rounded-xl bg-transparent"],

              // input: [
              //   "bg-transparent",
              //   "text-black",
              //   "placeholder:text-white",
              //   "text-sm",
              //   "font-bold",
              // ],

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
            type="text"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message as string}</p>
          )}
          <Input
            label="Email"
            variant="bordered"
            color={`${errors.email ? "danger" : "primary"}`}
            classNames={{
              base: " w-full h-7 my-2 ",
              label: [
                // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                "text-xs  text-white focus-within:text-white",
              ],

              // mainWrapper: ["h-full text-white rounded-xl bg-transparent"],

              // input: [
              //   "bg-transparent",
              //   "text-black",
              //   "placeholder:text-white",
              //   "text-sm",
              //   "font-bold",
              // ],

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
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message as string}</p>
          )}
          <Input
            type={isVisible ? "text" : "password"}
            label="Password"
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
                // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                "text-xs  text-white focus-within:text-white",
              ],

              // mainWrapper: ["h-full text-white rounded-xl bg-transparent"],

              // input: [
              //   "bg-transparent",
              //   "text-black",
              //   "placeholder:text-white",
              //   "text-sm",
              //   "font-bold",
              // ],

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
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message as string}</p>
          )}
          <Input
            type={isVisible ? "text" : "Confirm Password"}
            label="Confirm Password"
            variant="bordered"
            // color={`${errors.password ? "danger" : "primary"}`}
            // endContent={
            //   <button
            //     className="focus:outline-none"
            //     type="button"
            //     onClick={toggleVisibility}
            //   >
            //     {isVisible ? (
            //       <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
            //     ) : (
            //       <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
            //     )}
            //   </button>
            // }
            classNames={{
              base: " w-full h-7 my-2 ",
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
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message as string}</p>
          )}
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
            <Button color="primary" className="mt-2 text-end" type="submit">
              submit
            </Button>
          </div>
        </form>
      </div>
    </div>
     </div>
  );
};

export default RegisterForm;
