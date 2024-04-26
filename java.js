// var SPre = [
//   "I eat breakfast every morning.",
//   "She walks to school with her friends.",
//   "The sun rises in the east.",
//   "They play soccer after school.",
//   "He reads a book before going to bed.",
//   "We go for a walk in the park every Sunday.",
//   "The cat sleeps on the windowsill.",
//   "My mom cooks dinner for the family.",
//   "The birds chirp in the trees.",
//   "I brush my teeth twice a day.",
// ];

// var SPast = [
//   "I ate breakfast every morning.",
//   "She walked to school with her friends.",
//   "The sun rose in the east.",
//   "They played soccer after school.",
//   "He read a book before going to bed.",
//   "We went for a walk in the park every Sunday.",
//   "The cat slept on the windowsill.",
//   "My mom cooked dinner for the family.",
//   "The birds chirped in the trees.",
//   "I brushed my teeth twice a day.",
// ];

// var SF = [
//   "I will eat breakfast every morning.",
//   "She will walk to school with her friends.",
//   "The sun will rise in the east.",
//   "They will play soccer after school.",
//   "He will read a book before going to bed.",
//   "We will go for a walk in the park every Sunday.",
//   "The cat will sleep on the windowsill.",
//   "My mom will cook dinner for the family.",
//   "The birds will chirp in the trees.",
//   "I will brush my teeth twice a day.",
// ];

// var PreP = [
//   "I have eaten breakfast every morning.",
//   "She has walked to school with her friends.",
//   "The sun has risen in the east.",
//   "They have played soccer after school.",
//   "He has read a book before going to bed.",
//   "We have gone for a walk in the park every Sunday.",
//   "The cat has slept on the windowsill.",
//   "My mom has cooked dinner for the family.",
//   "The birds have chirped in the trees.",
//   "I have brushed my teeth twice a day.",
// ];
// var PastP = [
//   "I had eaten breakfast every morning.",
//   "She had walked to school with her friends.",
//   "The sun had risen in the east.",
//   "They had played soccer after school.",
//   "He had read a book before going to bed.",
//   "We had gone for a walk in the park every Sunday.",
//   "The cat had slept on the windowsill.",
//   "My mom had cooked dinner for the family.",
//   "The birds had chirped in the trees.",
//   "I had brushed my teeth twice a day.",
// ];

// var FP = [
//   "I will have eaten breakfast every morning.",
//   "She will have walked to school with her friends.",
//   "The sun will have risen in the east.",
//   "They will have played soccer after school.",
//   "He will have read a book before going to bed.",
//   "We will have gone for a walk in the park every Sunday.",
//   "The cat will have slept on the windowsill.",
//   "My mom will have cooked dinner for the family.",
//   "The birds will have chirped in the trees.",
//   "I will have brushed my teeth twice a day.",
// ];

// // var randomNumber = Math.floor(Math.random() * 10);
// // console.log(randomNumber);

// for (let i = 0; i < 10; i++) {
//   var gram = Math.floor(Math.random() * 6);
//   console.log(gram);
//   var sen = Math.floor(Math.random() * 10);
//   console.log(sen);
//   switch (gram) {
//     case 0:
//       console.log(SPre[sen]);
//       break;
//     case 1:
//       console.log(SPast[sen]);
//       break;
//     case 2:
//       console.log(SF[sen]);
//       break;
//     case 3:
//       console.log(PreP[sen]);
//       break;
//     case 4:
//       console.log(PastP[sen]);
//       break;
//     case 5:
//       console.log(FP[sen]);
//       break;
//     default:
//       break;
//   }
// }

// Get input from the user in Node.js
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Enter something: ", (userInput) => {
//   console.log("You entered:", userInput);
//   rl.close();
// });



"use client";
import { login } from "@/action/login";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Changed from 'next/navigation' to 'next/router'
import React, { FC, useState } from "react";
import torusIcon from "../../favicon.ico"
import logo from "../../favicon.ico";
import picture from "@/app/assets/google.png";
import pictures from "@/app/assets/github.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import {  CircularProgress } from "@nextui-org/react";
//  const [loading, setLoading] = useState("");
 
 
const LoginForm: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isVisible, setIsVisible] = React.useState(false);
 
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors({
      username: "",
      password: "",
    });
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setErrors({
        username: "username required",
        password: "password required",
      });
    } else {
      const res = await login(formData);
      if (res && res?.error) {
        setErrors({
          username: "please check username",
          password: " please check password",
        });
      }
    }
  };
 
  const handleNavigateToRegister = () => {
    router.push("/nextAuthLogin/register"); // Changed to '/register'
  };
 
  const handleSocialLogin = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
 
 
  return (
<div
      style={{
        background:
          "linear-gradient(90deg, rgba(17,15,18,1) 0%, rgba(110,68,139,1) 45%, rgba(117,59,94,1) 55%, rgba(24,24,23,1) 100%)",
      }}
      className="flex flex-col w-full h-screen justify-center items-center gap-2"
    >
      <div className="flex gap-2">
        <Image className=" w-12 h-12  transition-all" src={logo} alt=""></Image>
 
        <h2 className="text-center font-bold text-4xl text-white">Torus</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 
      <div className="p-4 rounded-xl shadow-md w-[42%] flex flex-col gap-4 border-2 border-[#323B45]  text-white bg-slate-800/70">
        <div>
          <h2 className="text-2xl font-semibold ">Login</h2>
          <p className="text-slate-400 text-[14px]">
            By creating and account you agree to accept our Terms of Service and
            Privacy Policy Available in the links below.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-3 ">
          <div className="grid grid-cols-2 gap-1">
            <Button  onClick={() => handleSocialLogin("github")} className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2">
               <Image src={pictures} alt="GitHub logo" width={20} height={25} />
              <span className="ml-2 text-black text-sm">
                Sign in with GitHub
              </span>
            </Button>
            <Button  onClick={() => handleSocialLogin("google")} className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2">
               <Image src={picture} alt="Google logo" width={30} height={35} />
              <span className="ml-2 text-black text-sm">
                Sign in with Google
              </span>
            </Button>
          </div>
          <h2 className="text-slate-400 text-[14px]">Or continue with</h2>
        </div>
 
       
 
        <Input
          type="text"
          label="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
         
          classNames={{
            base: " w-full ",
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
        />
         {errors.username && (
            <span className="text-red-500">{errors.username}</span>
          )}
 
        <Input
       
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
             
            >
              {isVisible ? (
                <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          classNames={{
            base: " w-full ",
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
        />
        {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        <div className="flex justify-between">
          <Button
            variant="bordered"
            color="primary"
            className="  text-white border-2 border-[#323B45]"
          >
            Forget password
          </Button>
          <Button
type="submit"
            color="primary"
            variant="bordered"
            className="w-[10%]  text-white border-2 border-[#323B45]"
          >
             {/* {loading ? <CircularProgress size="sm" /> : "Sign in"}  */}
             Sign in
          </Button>
        </div>
        <div className="flex justify-center items-center w-full gap-3">
          <p className="text-slate-400 text-[14px]">Don't have an account? </p>
          <span
            className="cursor-pointer hover:bg-slate-400 rounded-full p-2 text-[14px] text-green-300"
            onClick={handleNavigateToRegister}
          >
            Sign up
          </span>
        </div>
      </div>
      </form>
    </div>
  );
   
   
 
};
 
export default LoginForm;
 
has context menu