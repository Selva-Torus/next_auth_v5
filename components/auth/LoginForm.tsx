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
    e.preventDefault();
    await login(formData);
  };

  const handleNavigateToRegister = () => {
    router.push("/register"); // Changed to '/register'
  };

  const handleSocialLogin = (provider : "github"|"google") =>{
    signIn(provider , {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-2"
      >
        <Input
          label="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username}</span>
        )}
        <Input
          label="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password}</span>
        )}
        <Button type="submit">Submit</Button>
      </form>
      <div className="flex justify-between w-full">
        <Button onClick={()=>handleSocialLogin("google")}>Google</Button>
        <Button onClick={()=>handleSocialLogin('github')}>github</Button>
      </div>
      <div>
        Not a registered user{" "}
        <span className="cursor-pointer" onClick={handleNavigateToRegister}>
          Signup here
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
