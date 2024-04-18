"use client";
import { login } from "@/action/login";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Changed from 'next/navigation' to 'next/router'
import React, { FC, useState } from "react";

const LoginForm: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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
    router.push("/register"); // Changed to '/register'
  };

  const handleSocialLogin = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className={"font-bold text-center text-4xl text-blue-700 "}>
            Torus
          </h2>

          <Input
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="rounded-lg"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username}</span>
          )}
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="rounded-lg"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
          <Button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
          >
            Submit
          </Button>
        </form>
        <div className="mt-4 flex justify-between">
          <Button
            onClick={() => handleSocialLogin("google")}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Google
          </Button>
          <Button
            onClick={() => handleSocialLogin("github")}
            className="bg-black hover:bg-gray-800 text-white rounded-lg"
          >
            GitHub
          </Button>
        </div>
        <div className="mt-4 text-center">
          Not a registered user?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={handleNavigateToRegister}
          >
            Signup here
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
