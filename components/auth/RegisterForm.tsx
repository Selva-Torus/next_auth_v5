"use client"
import { register } from '@/action/register'
import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'

const RegisterForm: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData)
      .then((response) => {
        // Handle successful registration, such as redirecting to another page
        // router.push('/success');
      })
      .catch((error) => {
        // Handle registration error, such as displaying an error message
        console.error('Registration failed:', error);
      });
  };

  const handleNavigateToLogin = () => {
    router.push('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-2'>
        <Input label="email" type='email' name="email" value={formData.email} onChange={handleInputChange}/>
        <Input label="username" type='text' name="username" value={formData.username} onChange={handleInputChange}/>
        <Input label="password" type='password' name="password" value={formData.password} onChange={handleInputChange}/>
        <Button type='submit'>Submit</Button>
      </form>
      <div>Already have an account <span className='cursor-pointer' onClick={handleNavigateToLogin}>Login here</span></div>
    </div>
  );
};

export default RegisterForm;
