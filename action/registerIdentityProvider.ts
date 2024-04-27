"use server";

import axios from "axios";

export async function registerIdentityProviderUser(user: any, account: any) {
  // console.log("+++++++++++++++");
  // console.log(user, account);
  // user.realm = "dfgdsfgfdshsfgd";

  const res = await axios.post(
    "http://192.168.2.110:3002/keycloak/identityprovider",
    { user, account }
  );
  return res.data;
}
