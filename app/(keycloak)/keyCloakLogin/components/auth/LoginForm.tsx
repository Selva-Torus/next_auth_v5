"use client";
// import { login } from "@/app/(main)/action/login";
import {
  checkIsActive,
  getAllRealm,
  getClientcredentials,
  loginWithRealm,
} from "@/app/utilsFunctions/ulits/keyCloakAuth";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation"; // Changed from 'next/navigation' to 'next/router'
import React, { useEffect, useState } from "react";
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
import Link from "next/link";

const LoginForm = () => {
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

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token) setToken(JSON.parse(token));
    var user: any = localStorage.getItem("user");
    if (user) setData(JSON.parse(user));

    if (token && user) {
      (async () => {
        const res = await checkIsActive(JSON.parse(user), JSON.parse(token));
        if (res.active == false) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setData({
            realm: "",
            username: "",
            password: "",
            client_id: "",
            client_secret: "",
          });
          setToken(null);
        }
        if (res.active == true) {
          routes.push("/keyCloakLogin/Torus");
        }
      })();
    }
  }, []);

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
    console.log(data);
    // if (
    //   !data.realm ||
    //   !data.username ||
    //   !data.password ||
    //   !data.client_id ||
    //   !data.client_secret
    // ) {
    //   alert("fill all details");
    //   setCheckDetails(true);
    //   return;
    // }

    // // console.log(data);
    // setCheckDetails(true);
    // setLoading(true);
    // localStorage.setItem("user", JSON.stringify(data));
    // const res = await login(data);
    // console.log(res);
    // if (res?.error) {
    //   setLoading(false);
    //   alert("failed to login , check credentials");
    // }

    // return;

    if (
      data.realm &&
      data.username &&
      data.password &&
      data.client_id &&
      data.client_secret
    ) {
      setLoading(true);
      const res = await loginWithRealm(data);

      if (res.access_token) {
        setToken(res);
        setLoading(false);
        localStorage.setItem("token", JSON.stringify(res));
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isLogin", "keyCloakTrue");
        setRealmId("");
        routes.push("/keyCloakLogin/Torus");

        // setRealmList([]);
      } else {
        alert(res);
      }
    } else {
      alert("fill all details");
      setCheckDetails(true);
    }
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
        router.push("./keyCloakLogin/register");
      })
      .catch((error) => {
        alert("error occured");
        console.error("Error:", error);
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
            <Button className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2">
              <Image src={pictures} alt="GitHub logo" width={20} height={25} />
              <span className="ml-2 text-black text-sm">
                Sign in with GitHub
              </span>
            </Button>
            <Button className="google-signin-button flex items-center bg-white border border-black rounded-md px-4 py-2">
              <Image src={picture} alt="Google logo" width={30} height={35} />
              <span className="ml-2 text-black text-sm">
                Sign in with Google
              </span>
            </Button>
          </div>
          <h2 className="text-slate-400 text-[14px]">Or continue with</h2>
        </div>

        <Dropdown className="w-[300px] border border-[#121a24] p-0 shadow-lg text-shadow">
          <DropdownTrigger>
            <Button
              size="lg"
              variant="bordered"
              className={`border border-[#1a1735] ${
                checkDetails && !data.realm ? "text-red-400" : "text-white"
              }`}
            >
              {data.realm ? data.realm : "Select Tenant"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            onSelectionChange={(e) => handleSelectRealm(e)}
            aria-label="Link Actions"
            className=" text-white rounded-sm"
            variant="light"
            classNames={{
              base: "bg-[#20252B] border-1 border-black",
            }}
          >
            {realmList.map((realm, id) => (
              <DropdownItem
                className="bg-[#39316e] text-white hover:bg-slate-900 py-2"
                key={id}
                // onChange={() => handleSelectRealm(realm)}

                // onClick={() => handleSelectRealm(realm)}
              >
                <button
                  onClick={() => handleSelectRealm(realm)}
                  className="p-0 m-0 w-full bg-transparent"
                  // size="sm"
                >
                  {realm.name}
                </button>
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
        <div className="flex justify-center items-center w-full gap-3">
          <Link href={"./nextAuthLogin"} className="text-slate-400 text-[14px]">
            via nextAuth
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
