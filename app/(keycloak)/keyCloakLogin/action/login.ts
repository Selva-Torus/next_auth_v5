"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: any) => {
  // console.log(values);

  try {
    const { realm, username, password, client_id, client_secret } = values;
    await signIn("credentials", {
      realm,
      username,
      password,
      client_id,
      client_secret,

      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw err;
  }
};
