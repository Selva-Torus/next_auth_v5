"use server";
import { db } from "@/lib/db";

export const register = async (values: any) => {
  // console.log(values);
  const { email, username, password } = values;

  return await db.user.create({
    data: {
      name: username,
      email,
      password,
    },
  });
};
