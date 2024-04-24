"use server";

import axios from "axios";

export async function registerIdentityProviderUser(user: any, account: any) {
  const res = await axios.post(
    "http://localhost:3002/keycloak/identityprovider",
    { user, account }
  );
  return res.data;
}
