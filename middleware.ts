import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  console.log("mid");

  const { nextUrl } = req;
  console.log("nextUrl", nextUrl.pathname);
  const isLoggedIn = !!req.auth;
  console.log("isLoggedIn", isLoggedIn);

  console.log("req.auth", req.auth);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  console.log("isApiAuthRoute", isApiAuthRoute);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log("isAuthRoute", isAuthRoute);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  console.log("isPublicRoute", isPublicRoute);

  if (isApiAuthRoute) {
    return null;
  }
  console.log("called __________");

  if (isAuthRoute) {
    if (isLoggedIn) {
      // it will call if login found
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  console.log("called +++++++++++++++");

  if (!isLoggedIn && !isPublicRoute) {
    //  // it will call if the url 3000/{something}
    //  console.log("_____________");

    return Response.redirect(new URL("/nextAuthLogin", nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    "/nextAuthLogin/((?!.+\\.[\\w]+$|_next).*)",
    "/nextAuthLogin",
    "/nextAuthLogin/(api|trpc)(.*)",
  ],
};
