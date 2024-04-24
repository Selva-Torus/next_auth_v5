// // "use client";
// // import { login } from "@/action/login";
// // import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// // import { Button, Input } from "@nextui-org/react";
// // import { signIn } from "next-auth/react";
// // import Image from "next/image";
// // import { useRouter } from "next/navigation"; // Changed from 'next/navigation' to 'next/router'
// // import React, { FC, useState } from "react";
// // // import torusIcon from "@/app/favicon.ico"

// // const LoginForm: FC = () => {
// //   const router = useRouter();
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     password: "",
// //   });

// //   const [errors, setErrors] = useState({
// //     username: "",
// //     password: "",
// //   });

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     setErrors({
// //       username: "",
// //       password: "",
// //     });
// //     e.preventDefault();
// //     if (!formData.username || !formData.password) {
// //       setErrors({
// //         username: "username required",
// //         password: "password required",
// //       });
// //     } else {
// //       const res = await login(formData);
// //       if (res && res?.error) {
// //         setErrors({
// //           username: "please check username",
// //           password: " please check password",
// //         });
// //       }
// //     }
// //   };

// //   const handleNavigateToRegister = () => {
// //     router.push("/nextAuthLogin/register"); // Changed to '/register'
// //   };

// //   const handleSocialLogin = (provider: "github" | "google") => {
// //     signIn(provider, {
// //       callbackUrl: DEFAULT_LOGIN_REDIRECT,
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
// //       <div className="bg-white p-8 rounded-lg shadow-md w-96">
// //         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
// //           <h2
// //             className={
// //               "font-bold text-4xl text-blue-700 flex items-center justify-center gap-2"
// //             }
// //           >
// //             {/* <Image className="h-8 w-8" src={torusIcon} alt="torus" /> */}
// //             Torus
// //           </h2>

// //           <Input
// //             label="Username"
// //             type="text"
// //             name="username"
// //             value={formData.username}
// //             onChange={handleInputChange}
// //             className="rounded-lg"
// //           />
// //           {errors.username && (
// //             <span className="text-red-500">{errors.username}</span>
// //           )}
// //           <Input
// //             label="Password"
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleInputChange}
// //             className="rounded-lg"
// //           />
// //           {errors.password && (
// //             <span className="text-red-500">{errors.password}</span>
// //           )}
// //           <Button
// //             type="submit"
// //             className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
// //           >
// //             Submit
// //           </Button>
// //         </form>
// //         <div className="mt-4 flex justify-between">
// //           <Button
// //             onClick={() => handleSocialLogin("google")}
// //             className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
// //           >
// //             Google
// //           </Button>
// //           <Button
// //             onClick={() => handleSocialLogin("github")}
// //             className="bg-black hover:bg-gray-800 text-white rounded-lg"
// //           >
// //             GitHub
// //           </Button>
// //         </div>
// //         <div className="mt-4 text-center">
// //           Not a registered user?{" "}
// //           <span
// //             className="text-blue-500 cursor-pointer"
// //             onClick={handleNavigateToRegister}
// //           >
// //             Signup here
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;

// // var SPre = [
// //   "I eat breakfast every morning.",
// //   "She walks to school with her friends.",
// //   "The sun rises in the east.",
// //   "They play soccer after school.",
// //   "He reads a book before going to bed.",
// //   "We go for a walk in the park every Sunday.",
// //   "The cat sleeps on the windowsill.",
// //   "My mom cooks dinner for the family.",
// //   "The birds chirp in the trees.",
// //   "I brush my teeth twice a day.",
// // ];

// // var SPast = [
// //   "I ate breakfast every morning.",
// //   "She walked to school with her friends.",
// //   "The sun rose in the east.",
// //   "They played soccer after school.",
// //   "He read a book before going to bed.",
// //   "We went for a walk in the park every Sunday.",
// //   "The cat slept on the windowsill.",
// //   "My mom cooked dinner for the family.",
// //   "The birds chirped in the trees.",
// //   "I brushed my teeth twice a day.",
// // ];

// // var SF = [
// //   "I will eat breakfast every morning.",
// //   "She will walk to school with her friends.",
// //   "The sun will rise in the east.",
// //   "They will play soccer after school.",
// //   "He will read a book before going to bed.",
// //   "We will go for a walk in the park every Sunday.",
// //   "The cat will sleep on the windowsill.",
// //   "My mom will cook dinner for the family.",
// //   "The birds will chirp in the trees.",
// //   "I will brush my teeth twice a day.",
// // ];

// // var PreP = [
// //   "I have eaten breakfast every morning.",
// //   "She has walked to school with her friends.",
// //   "The sun has risen in the east.",
// //   "They have played soccer after school.",
// //   "He has read a book before going to bed.",
// //   "We have gone for a walk in the park every Sunday.",
// //   "The cat has slept on the windowsill.",
// //   "My mom has cooked dinner for the family.",
// //   "The birds have chirped in the trees.",
// //   "I have brushed my teeth twice a day.",
// // ];
// // var PastP = [
// //   "I had eaten breakfast every morning.",
// //   "She had walked to school with her friends.",
// //   "The sun had risen in the east.",
// //   "They had played soccer after school.",
// //   "He had read a book before going to bed.",
// //   "We had gone for a walk in the park every Sunday.",
// //   "The cat had slept on the windowsill.",
// //   "My mom had cooked dinner for the family.",
// //   "The birds had chirped in the trees.",
// //   "I had brushed my teeth twice a day.",
// // ];

// // var FP = [
// //   "I will have eaten breakfast every morning.",
// //   "She will have walked to school with her friends.",
// //   "The sun will have risen in the east.",
// //   "They will have played soccer after school.",
// //   "He will have read a book before going to bed.",
// //   "We will have gone for a walk in the park every Sunday.",
// //   "The cat will have slept on the windowsill.",
// //   "My mom will have cooked dinner for the family.",
// //   "The birds will have chirped in the trees.",
// //   "I will have brushed my teeth twice a day.",
// // ];

// // // var randomNumber = Math.floor(Math.random() * 10);
// // // console.log(randomNumber);

// // for (let i = 0; i < 10; i++) {
// //   var gram = Math.floor(Math.random() * 6);
// //   console.log(gram);
// //   var sen = Math.floor(Math.random() * 10);
// //   console.log(sen);
// //   switch (gram) {
// //     case 0:
// //       console.log(SPre[sen]);
// //       break;
// //     case 1:
// //       console.log(SPast[sen]);
// //       break;
// //     case 2:
// //       console.log(SF[sen]);
// //       break;
// //     case 3:
// //       console.log(PreP[sen]);
// //       break;
// //     case 4:
// //       console.log(PastP[sen]);
// //       break;
// //     case 5:
// //       console.log(FP[sen]);
// //       break;
// //     default:
// //       break;
// //   }
// // }

// // Get input from the user in Node.js
// // const readline = require("readline");

// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout,
// // });

// // rl.question("Enter something: ", (userInput) => {
// //   console.log("You entered:", userInput);
// //   rl.close();
// // });

// "use client";
// import { login } from "@/action/login";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { Button, Input } from "@nextui-org/react";
// import { signIn } from "next-auth/react";
// import Image from "next/image";
// import { useRouter } from "next/navigation"; // Changed from 'next/navigation' to 'next/router'
// import React, { FC, useEffect, useState } from "react";
// import torusIcon from "../../favicon.ico";
// import logo from "../../favicon.ico";
// import picture from "@/app/assets/google.png";
// import pictures from "@/app/assets/github.png";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import {
//   Dropdown,
//   DropdownMenu,
//   DropdownTrigger,
//   DropdownItem,
// } from "@nextui-org/react";
// import { IoEyeOffOutline } from "react-icons/io5";
// import { CircularProgress } from "@nextui-org/react";
// import {
//   getAllRealm,
//   getClientcredentials,
// } from "@/app/utilsFunctions/ulits/keyCloakAuth";
// //  const [loading, setLoading] = useState("");
// type Realm = {
//   id: string;
//   name: string;
// };
// const LoginForm: FC = () => {
//   const [realmList, setRealmList] = useState<Realm[] | any[]>([]);
//   const [realmId, setRealmId] = useState<string>("");
//   const router = useRouter();
//   const [checkDetails, setCheckDetails] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getAllRealm();

//         res.status == 200
//           ? setRealmList(res.data)
//           : // setData({ ...data, realm: res.data[0].name })

//             setRealmList([]);
//       } catch (err) {
//         console.log("Error occured");
//       }
//     })();
//   }, []);

//   const [data, setData] = useState<any>({
//     realm: "",
//     username: "",
//     password: "",
//     client_id: "",
//     client_secret: "",
//   });
//   const [isVisible, setIsVisible] = React.useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };
//   const handleSelectRealm = async (datas: any) => {
//     setRealmId(datas.id);
//     setData({ ...data, realm: datas.name });
//     // handleClientCredentials();
//   };

//   const handleClientCredentials = async () => {
//     const res = await getClientcredentials(realmId);
//     if (res.data.length)
//       setData({
//         ...data,
//         client_id: res.data[0].client_id,
//         client_secret: res.data[0].secret,
//       });
//   };

//   useEffect(() => {
//     handleClientCredentials();
//   }, [realmId]);
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (
//       data.realm &&
//       data.username &&
//       data.password &&
//       data.client_id &&
//       data.client_secret
//     ) {
//       console.log(data);

//       const res = await login(data);

//       if (res && res?.error) {
//         alert({
//           username: "please check username",
//           password: " please check password",
//         });
//       } else {
//         console.log(res);
//       }
//       // else{
//       //   router.push("/nextAuthLogin/Torus");
//       // }
//     } else {
//       alert("fill all details");
//     }
//   };

//   const handleNavigateToRegister = () => {
//     router.push("/nextAuthLogin/register"); // Changed to '/register'
//   };

//   const handleSocialLogin = (provider: "github" | "google") => {
//     signIn(provider, {
//       callbackUrl: DEFAULT_LOGIN_REDIRECT,
//     });
//   };

//   return (
//     <div
//       style={{
//         background:
//           "linear-gradient(90deg, rgba(17,15,18,1) 0%, rgba(110,68,139,1) 45%, rgba(117,59,94,1) 55%, rgba(24,24,23,1) 100%)",
//       }}
//       className="flex flex-col w-full h-screen justify-center items-center gap-2"
//     >
//       <div className="flex gap-2">
//         <Image className=" w-12 h-12  transition-all" src={logo} alt=""></Image>

//         <h2 className="text-center font-bold text-4xl text-white">Torus</h2>
//       </div>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-4 p-4 rounded-xl shadow-md w-[42%] border-2 border-[#323B45]  text-white bg-slate-800/70"
//       >
//         {/* <div className="p-4 rounded-xl shadow-md w-[42%] flex flex-col gap-4 border-2 border-[#323B45]  text-white bg-slate-800/70"> */}
//         <div>
//           <h2 className="text-2xl font-semibold ">Login</h2>
//           <p className="text-slate-400 text-[14px]">
//             By creating and account you agree to accept our Terms of Service and
//             Privacy Policy Available in the links below.
//           </p>
//         </div>
//         <div className="flex flex-col justify-center items-center w-full gap-3 ">
//           <div className="grid grid-cols-2 gap-1">
//             <Button
//               onClick={() => handleSocialLogin("github")}
//               className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2"
//             >
//               <Image src={pictures} alt="GitHub logo" width={20} height={25} />
//               <span className="ml-2 text-black text-sm">
//                 Sign in with GitHub
//               </span>
//             </Button>
//             <Button
//               onClick={() => handleSocialLogin("google")}
//               className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2"
//             >
//               <Image src={picture} alt="Google logo" width={30} height={35} />
//               <span className="ml-2 text-black text-sm">
//                 Sign in with Google
//               </span>
//             </Button>
//           </div>
//           <h2 className="text-slate-400 text-[14px]">Or continue with</h2>
//         </div>
//         <Dropdown className="w-[300px] border border-[#121a24] p-0 shadow-lg text-shadow">
//           <DropdownTrigger>
//             <Button
//               size="lg"
//               variant="bordered"
//               className={`border border-[#1a1735] ${
//                 checkDetails && !data.realm ? "text-red-400" : "text-white"
//               }`}
//             >
//               {data.realm ? data.realm : "Select Tenant"}
//             </Button>
//           </DropdownTrigger>
//           <DropdownMenu
//             onSelectionChange={(e) => handleSelectRealm(e)}
//             aria-label="Link Actions"
//             className=" text-white rounded-sm"
//             variant="light"
//             classNames={{
//               base: "bg-[#20252B] border-1 border-black",
//             }}
//           >
//             {realmList.map((realm, id) => (
//               <DropdownItem
//                 className="bg-[#39316e] text-white hover:bg-slate-900 py-2"
//                 key={id}
//                 // onChange={() => handleSelectRealm(realm)}

//                 // onClick={() => handleSelectRealm(realm)}
//               >
//                 <button
//                   onClick={() => handleSelectRealm(realm)}
//                   className="p-0 m-0 w-full bg-transparent"
//                   // size="sm"
//                 >
//                   {realm.name}
//                 </button>
//               </DropdownItem>
//             ))}
//           </DropdownMenu>
//         </Dropdown>

//         <Input
//           type="text"
//           label="username"
//           name="username"
//           value={data.username}
//           onChange={handleInputChange}
//           classNames={{
//             base: " w-full ",
//             label: [
//               // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
//               "text-xs  text-white focus-within:text-white",
//             ],

//             // mainWrapper: ["h-full text-white rounded-xl bg-transparent"],

//             // input: [
//             //   "bg-transparent",
//             //   "text-black",
//             //   "placeholder:text-white",
//             //   "text-sm",
//             //   "font-bold",
//             // ],

//             inputWrapper: [
//               "border border-slate-500/50",
//               "text-white",
//               "bg-transparent",
//               "data-[hover=true]:bg-[#282551]",
//               "data-[hover=true]:border-[#4435CF]",
//               "focus-within:!bg-[#282551]",
//               "focus-within:border-[#4435CF] border-2",
//             ],
//             innerWrapper: ["bg-transparent", "boder-2 border-blue-100"],
//           }}
//         />

//         <Input
//           label="Password"
//           name="password"
//           value={data.password}
//           onChange={handleInputChange}
//           endContent={
//             <button className="focus:outline-none" type="button">
//               {isVisible ? (
//                 <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
//               ) : (
//                 <MdOutlineRemoveRedEye className="text-2xl text-default-400 pointer-events-none" />
//               )}
//             </button>
//           }
//           classNames={{
//             base: " w-full ",
//             label: [
//               // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
//               "text-xs  text-white focus-within:text-white",
//             ],

//             inputWrapper: [
//               "border border-slate-500/50",
//               "text-white",
//               "bg-transparent",
//               "data-[hover=true]:bg-[#282551]",
//               "data-[hover=true]:border-[#4435CF]",
//               "focus-within:!bg-[#282551]",
//               "focus-within:border-[#4435CF] border-2",
//             ],
//             innerWrapper: ["bg-transparent", "boder-2 border-blue-100"],
//           }}
//         />
//         <div className="flex justify-between">
//           <Button
//             variant="bordered"
//             color="primary"
//             className="  text-white border-2 border-[#323B45]"
//           >
//             Forget password
//           </Button>
//           <Button
//             type="submit"
//             color="primary"
//             variant="bordered"
//             className="w-[10%]  text-white border-2 border-[#323B45]"
//           >
//             {/* {loading ? <CircularProgress size="sm" /> : "Sign in"}  */}
//             Sign in
//           </Button>
//         </div>
//         <div className="flex justify-center items-center w-full gap-3">
//           <p className="text-slate-400 text-[14px]">Don't have an account? </p>
//           <span
//             className="cursor-pointer hover:bg-slate-400 rounded-full p-2 text-[14px] text-green-300"
//             onClick={handleNavigateToRegister}
//           >
//             Sign up
//           </span>
//         </div>
//         {/* </div> */}
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

"use client";
import {
  getAllRealm,
  getClientcredentials,
  loginWithRealm,
} from "@/app/utilsFunctions/ulits/keyCloakAuth";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useRouter } from "next/navigation"; // Changed from 'next/navigation' to 'next/router'
import React, { FC, useEffect, useState } from "react";
import logo from "../../favicon.ico";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import axios from "axios";
import picture from "@/app/assets/google.png";
import pictures from "@/app/assets/github.png";
import Image from "next/image";
type Realm = {
  id: string;
  name: string;
};
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { login } from "@/action/login";
import { signIn } from "next-auth/react";

const LoginForm: FC = () => {
  const [checkDetails, setCheckDetails] = useState(false);
  const [token, setToken] = useState<any>();
  const [realmList, setRealmList] = useState<Realm[] | any[]>([]);
  const [realmId, setRealmId] = useState<string>("");
  const [data, setData] = useState<any>({
    realm: "",
    username: "",
    password: "",
    client_id: "",
    client_secret: "",
  });
  const [loading, setLoading] = useState(false);
  const routes = useRouter();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // useEffect(() => {
  //   var token = localStorage.getItem("token");
  //   if (token) setToken(JSON.parse(token));
  //   var user: any = localStorage.getItem("user");
  //   if (user) setData(JSON.parse(user));

  //   if (token && user) {
  //     (async () => {
  //       const res = await checkIsActive(JSON.parse(user), JSON.parse(token));
  //       if (res.active == false) {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("user");
  //         setData({
  //           realm: "",
  //           username: "",
  //           password: "",
  //           client_id: "",
  //           client_secret: "",
  //         });
  //         setToken(null);
  //       }
  //       if (res.active == true) {
  //         routes.push("./torus");
  //       }
  //     })();
  //   }
  // }, []);

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

  async function Login() {
    if (
      !data.realm ||
      !data.username ||
      !data.password ||
      !data.client_id ||
      !data.client_secret
    ) {
      alert("fill all details");
      setCheckDetails(true);
      return;
    }

    // console.log(data);
    setCheckDetails(true);
    setLoading(true);
    localStorage.setItem("user", JSON.stringify(data));
    const res = await login(data);
    console.log(res);
    if (res?.error) {
      setLoading(false);
      alert("failed to login , check credentials");
    }
    return;
  }

  const handleSelectRealm = async (datas: any) => {
    setRealmId(datas.id);
    setData({ ...data, realm: datas.name });
    // handleClientCredentials();
  };
  const handleClientCredentials = async () => {
    const res = await getClientcredentials(realmId);
    if (res.data.length)
      setData({
        ...data,
        client_id: res.data[0].client_id,
        client_secret: res.data[0].secret,
      });
  };

  useEffect(() => {
    handleClientCredentials();
  }, [realmId]);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleNavigateToRegister = async () => {
    // Define the URL
    const url =
      "https://keycloak9x.gsstvl.com:18443/realms/testRealm/protocol/openid-connect/token";

    // Define the request body as a URL-encoded string
    const requestBody = {
      grant_type: "client_credentials",
      client_id: "demoClient",
      client_secret: "oTtfWsw8SKukpKTiaNr4bGIg5Dlkp4sW",
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
    axios
      .post(url, encodeFormData(requestBody), {
        headers: headers,
      })
      .then((response) => {
        console.log("Response:", response.data);
        localStorage.setItem("registertoken", response.data.access_token);
        router.push("./register");
      })
      .catch((error) => {
        alert("error occured");
        console.error("Error:", error);
      });
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
            <Button
              onClick={() => handleSocialLogin("github")}
              className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2"
            >
              <Image src={pictures} alt="GitHub logo" width={20} height={25} />
              <span className="ml-2 text-black text-sm">
                Sign in with GitHub
              </span>
            </Button>
            <Button
              onClick={() => handleSocialLogin("google")}
              className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2"
            >
              <Image src={picture} alt="Google logo" width={30} height={35} />
              <span className="ml-2 text-black text-sm">
                Sign in with Google
              </span>
            </Button>
          </div>
          <h2 className="text-slate-400 text-[14px]">Or continue with</h2>
        </div>

        <Dropdown className="w-[400px] border border-[#20252B]  p-0 ">
          <DropdownTrigger>
            <Button
              size="lg"
              variant="bordered"
              className={`border-2 border-[#323B45] ${
                checkDetails && !data.realm ? "text-red-400" : "text-white"
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
          type="text"
          label="Email or phone"
          name="username"
          // labelPlacement="outside"
          color={`${checkDetails && !data.username ? "danger" : "primary"}`}
          onChange={handleChange}
          value={data.username}
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

        <Input
          type={isVisible ? "text" : "password"}
          label="Password"
          name="password"
          color={`${checkDetails && !data.password ? "danger" : "primary"}`}
          onChange={handleChange}
          value={data.password}
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
        <div className="flex justify-between">
          <Button
            variant="bordered"
            color="primary"
            className="  text-white border-2 border-[#323B45]"
          >
            Forget password
          </Button>
          <Button
            onClick={Login}
            color="primary"
            variant="bordered"
            className="w-[10%]  text-white border-2 border-[#323B45]"
          >
            {loading ? <CircularProgress size="sm" /> : "Sign in"}
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
    </div>
  );
};

export default LoginForm;
