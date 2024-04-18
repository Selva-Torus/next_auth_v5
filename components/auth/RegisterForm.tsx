"use client";
import { register } from "@/action/register";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import torusIcon from "@/app/favicon.ico"


const RegisterForm: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData)
      .then((response) => {
        // Handle successful registration, such as redirecting to another page
        router.push("/");
      })
      .catch((error) => {
        // Handle registration error, such as displaying an error message
        console.error("Registration failed:", error);
      });
  };

  const handleNavigateToLogin = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className={"font-bold text-4xl text-blue-700 flex items-center justify-center gap-2 "}>
          <Image className="h-8 w-8" src={torusIcon} alt="torus"/>
            Torus
          </h2>

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="rounded-lg"
          />
          <Input
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="rounded-lg"
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="rounded-lg"
          />
          <Button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
          >
            Submit
          </Button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={handleNavigateToLogin}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
