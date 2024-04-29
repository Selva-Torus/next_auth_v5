"use server";
import { verify } from "jsonwebtoken";

export async function Decode(token) {
  // console.log(token);
  const PUBLICK_KEY =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4nxzwnTeXFaMypqO8dU7F9FlDLyXMzQka+u5X6WBIhnDD5pGm6pt2okZ1wxHva2Qh6cXmpSL+dQ45+slIQ97MO28lmNqGtwA95DwxBL/glixaheBHpebTYfUQYE3bfu7bztnzSdkI1sAFRzKB1690VQK5t4To3sonYWMG+WcfimL6IMLd1BIUbamn15D1t2PQ1rcD+oOPbW29e1Or15u3NhAlEqGRvvVNoIhNleNz6IQoZtbwE3zfkFytHIFKlTeaLswdnss5i0DZR0saymiag08guIcJzSjhNe0F0/XUh4m9kvrsHLVOi1t/NbxRSQRWuXYJR5obC6MpM4oz97k4QIDAQAB";
  // const KEY = `-----BEGIN PUBLIC KEY-----\n${PUBLICK_KEY}\n-----END PUBLIC KEY-----`;
  //   console.log(token);
  var decoded;
  try {
    decoded = verify(token.access_token, PUBLICK_KEY);
  } catch (err) {
    decoded = "unable to decode";
  }

  return decoded;
}

