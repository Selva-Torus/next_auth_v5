import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google"
import GitHub from "next-auth/providers/github";
let user = {};

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials;

        const encodeFormData = (data: any) => {
          return Object.keys(data)
            .map(
              (key) =>
                encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
            )
            .join("&");
        };
        const data = {
          username,
          password,
          client_id: "demoClient",
          client_secret: "oTtfWsw8SKukpKTiaNr4bGIg5Dlkp4sW",
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
            "http://192.168.2.165:8085/realms/testRealm/protocol/openid-connect/token",
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
        user = res;

        return res;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
    }),
    GitHub({
      clientId:process.env.GITHUB_CLIENT_ID,
      clientSecret:process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        return token;
      } else {
        return token;
      }
    },
    async session({ session, token }:any) {
      session.user = token.user;

      return session;
    },
  },
} satisfies NextAuthConfig;
