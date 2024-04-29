"use server";
import { realmData } from "@/realmData";
 
import axios from "axios";
 
export async function registerIdentityProviderUser(user: any, account: any) {
  account.realm_id = realmData.realmId;
  const res = await axios.post(
    "http://192.168.2.110:3002/keycloak/identityprovider",
    { user, account }
  );
  return res.data;
 
 
}