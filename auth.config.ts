import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import axios from "axios";
import { registerIdentityProviderUser } from "./action/registerIdentityProvider";
import GoogleProvider from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

let realmDetails = {};

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
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   }
      // },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // console.log(user, account, "hvyhvy");
      if (account?.type == "credentials") {
        return true; //false;
      } else {
        await registerIdentityProviderUser(user, account);

        return true;
      }
    },
    async jwt({ token, user }) {
      if (token) {
        // Check if token exists
        if (user) {
          token.user = user;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && token.user) {
        // Check if token and user exist
        session.user = token.user;
      }
      return session;
    },
  },
} as NextAuthConfig; // Use 'as NextAuthConfig' to satisfy TypeScript
