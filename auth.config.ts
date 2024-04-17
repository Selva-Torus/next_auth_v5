import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import axios from "axios";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { username, password } = credentials;

        const encodeFormData = (data :any) => {
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
              'Content-Type': 'application/x-www-form-urlencoded', 
            }
          };
        axios.post(
          "http://192.168.2.165:8085/realms/testRealm/protocol/openid-connect/token" ,encodeFormData(data) , config
        ).then(res => {
            if(res.status == 200){
                return res.data
            }else{
                return null
            }
        });

        return null
      },
    }),
  ],
} satisfies NextAuthConfig;
