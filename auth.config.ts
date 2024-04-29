import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import axios from "axios";
import { registerIdentityProviderUser } from "./action/registerIdentityProvider";
import GoogleProvider from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { sign } from "jsonwebtoken";
import { realmData } from "@/realmData";
 
let realmDetails = {};
 
const PUBLICK_KEY =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4nxzwnTeXFaMypqO8dU7F9FlDLyXMzQka+u5X6WBIhnDD5pGm6pt2okZ1wxHva2Qh6cXmpSL+dQ45+slIQ97MO28lmNqGtwA95DwxBL/glixaheBHpebTYfUQYE3bfu7bztnzSdkI1sAFRzKB1690VQK5t4To3sonYWMG+WcfimL6IMLd1BIUbamn15D1t2PQ1rcD+oOPbW29e1Or15u3NhAlEqGRvvVNoIhNleNz6IQoZtbwE3zfkFytHIFKlTeaLswdnss5i0DZR0saymiag08guIcJzSjhNe0F0/XUh4m9kvrsHLVOi1t/NbxRSQRWuXYJR5obC6MpM4oz97k4QIDAQAB";
// const KEY = `-----BEGIN PUBLIC KEY-----\n${PUBLICK_KEY}\n-----END PUBLIC KEY-----`;
 
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { realm, username, password, client_id, client_secret } =
          credentials;
 
        const encodeFormData = (data: any) => {
          return Object.keys(data)
            .map(
              (key) =>
                encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
            )
            .join("&");
        };
        const data = {
          username: username,
          password: password,
          client_id: client_id,
          client_secret: client_secret,
          grant_type: "password",
        };
        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
        // Return the promise from the axios.post() call
        const res = await axios
          .post(
            `http://192.168.2.165:8085/realms/${realm}/protocol/openid-connect/token`,
            encodeFormData(data),
            config
          )
          .then((res) => {
            if (res.status == 200) {
              // Return the user object from the response data
              return res.data;
            } else {
              // Return null if the request fails
              return null;
            }
          });
        realmDetails = {
          realm: realm,
          token: res,
          client_id: client_id,
          client_secret: client_secret,
        };
        return realmDetails;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type == "credentials") {
        return true; //false;
      } else {
        console.log("++++++++-------+++");
        console.log(user, account);
 
        await registerIdentityProviderUser(user, account);
        return true;
      }
    },
    async jwt({ token, user }) {
      if (token) {
        // Check if token exists
        if (user) {
          token.user = user;
          if (user.image) {
            const defaultTokenOfKeycloak = {
              iss: `http://192.168.2.165:8085/realms/${realmData.realm}`,
              aud: "account",
              typ: "Bearer",
              azp: realmData.client_id,
              session_state: "",
              acr: "1",
              "allowed-origins": ["http://localhost:3000"],
              realm_access: {
                roles: ["offline_access", "default-roles-testrealm"],
              },
              resource_access: {
                demoClient: { roles: ["testuser"] },
                account: {
                  roles: [
                    "manage-account",
                    "manage-account-links",
                    "view-profile",
                  ],
                },
              },
              scope: "social profile",
              sid: "",
              email_verified: true,
              name: token?.name ?? "",
              preferred_username: token?.name ?? "",
              given_name: token?.name ?? "",
              family_name: token?.name ?? "",
              email: token?.email ?? "",
            };
 
            const updatedToken = {
              ...token,
              ...defaultTokenOfKeycloak,
            };
            const access_token = sign(updatedToken, PUBLICK_KEY, {
              expiresIn: "10m",
            });
            token.acc = access_token;
          }
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && token.user) {
        // Check if token and user exist
        session.user = token.user;
        if (token.user.image) {
          const obj = {
            access_token: token.acc ?? "",
            expires_in: 300,
            refresh_expires_in: 3600,
            refresh_token: "",
            token_type: "bearer",
            session_state: "",
            scope: "social profile",
          };
          session.user.token = obj;
          session.client_id = realmData.client_id;
          (session.client_secret = realmData.client_secret),
            (session.realm = realmData.realm);
        }
      }
      return session;
    },
  },
} as NextAuthConfig; // Use 'as NextAuthConfig' to satisfy TypeScript
 