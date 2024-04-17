"use client";
import { login } from "@/action/login";
// import { Button, Input } from '@nextui-org/react'
// import { useRouter } from 'next/navigation'
// import React, { FC } from 'react'

// const LoginForm : FC = () => {
// const router = useRouter();
//   const handleNavigateToRegister = () => {
//     router.push('register')
//   }
//   return (
//     <div>
//       <div className='flex flex-col justify-center items-center gap-2'>
//         <Input label="username" type='text'/>
//         <Input label="password" type='password'/>
//         <Button>Submit</Button>
//       </div>
//       <div>Not a registered user <span className='cursor-pointer' onClick={handleNavigateToRegister}>Signup here</span></div>
//     </div>
//   )
// }

// export default LoginForm

import { Button, Input } from "@nextui-org/react";
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
