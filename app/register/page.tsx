import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <RegisterForm />
    </div>
  );
};

export default page;
