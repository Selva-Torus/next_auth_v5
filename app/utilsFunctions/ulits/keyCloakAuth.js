"use server";
import { client } from "./dbFunctions";

// code for realm and client

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

export const getdatafromDb = async (query) => {
  try {
    const res = await client.query(query);
    return { status: 200, data: res.rows };
  } catch (error) {
    return { status: 404, msg: "error occurred" };
  }
};

export const getAllRealm = async () => {
  const res = await getdatafromDb(`select id ,name from realm`);
  return res;
};

export const getClientcredentials = async (realmId) => {
  try {
    const res = await client.query(
      `SELECT client_id, secret FROM client WHERE realm_id = $1 AND full_scope_allowed = $2`,
      [realmId, true]
    );
    return { status: 200, data: res.rows };
  } catch (err) {
    return { status: 404, data: "error occured" };
  }
};

const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const loginWithRealm = async (data) => {
  var url = `http://192.168.2.165:8085/realms/${data.realm}/protocol/openid-connect/token`;
  var maindata = { ...data, grant_type: "password" };
  delete maindata.realm;
  try {
    console.log(maindata);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodeFormData(maindata),
    });

    // Parsing JSON response and returning it
    const jsonResponse = await res.json();
    if (jsonResponse.error) return "Invalid user credentials";
    return jsonResponse;
  } catch (err) {
    return "error";
  }
};

export const getRealm = async () => {
  const adminToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwd25RMHBFZFJDYXFUTTJvR3QwOVJjSlZJdTQyY0p2Q0RzaGpnbzBZanUwIn0.eyJleHAiOjE3MTI4MTI5NTksImlhdCI6MTcxMjgxMjg5OSwiYXV0aF90aW1lIjoxNzEyODEyODk4LCJqdGkiOiJhNTA4OGJiYS1kZWVkLTQ1MGQtOWIzYi1hMmM3NjYzZDQ2YzIiLCJpc3MiOiJodHRwOi8vMTkyLjE2OC4yLjExMDo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJzdWIiOiJjY2IyYmUyOS0wNzM5LTQwMzktODQxZS0zMDhhOGMzMTEzMDYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzZWN1cml0eS1hZG1pbi1jb25zb2xlIiwibm9uY2UiOiIxMzhhNThiYS1kNWNhLTRiNDUtODE3Ny0xODk4M2ZhMTk5N2QiLCJzZXNzaW9uX3N0YXRlIjoiNjcyNjVhMzQtYzc2OC00MDY0LWE0OTUtNmIyMzgzZTI4NjU0IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vMTkyLjE2OC4yLjExMDo4MDgwIl0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI2NzI2NWEzNC1jNzY4LTQwNjQtYTQ5NS02YjIzODNlMjg2NTQiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.BU1HnqP84urWAL83kBvJfko9P9qFmSHL2VjqoyKjY2P2Ae56cSHzc7dnCZURUQdCV7wZ_nLUWw3lQuKdIZL3TRWmHHZOLJajtCnNGz7eb5eP-rOQF8UtzckbbDOsAxBWOmcAe3lJ9QyP1KUkHQldCsGkpsiCGIkux627ULyfrj3fiWz7GgArV3bAi01416PiNxasovxsaiC5_C_75RSCOUfl1kfRjesPyRcVyM66VldQVAbneylE4gpkKeqzDVfDIGu0t-nCQu0GfOkXlMYcjsqGkr4CAxfOJHSQfbbND5PfSLMmAwj2r-00SVTId_qUuiIWo-6pGXhXrbEMSOkboA"; // Replace with your admin access token

  try {
    const response = await fetch(
      "http://192.168.2.165:8085/auth/admin/realms",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminToken,
        },
      }
    );
    if (response.ok) {
      const realms = await response.json();
      return realms;
    } else {
      throw new Error("Failed to fetch realms");
    }
  } catch (error) {
    return null;
  }
};

export const logoutRealm = async (data, token) => {
  // console.log("logoutRealm", data, token);
  // return;
  if (!data.realm) return "";
  var logOutUrl = `http://192.168.2.165:8085/realms/${data.realm}/protocol/openid-connect/logout`;
  var maindata = { ...data, refresh_token: token.refresh_token };
  delete maindata.realm;

  // if (data.realm === "testRealm") {
  //   maindata = {
  //     refresh_token: token.refresh_token,
  //     client_secret: "cDG5XcuqnJmj8ZeTIFO1kHrCOJGiO8Os",
  //     client_id: "testRealm1",
  //   };
  //   delete maindata.realm;
  // } else {
  //   return "failed";
  //   maindata = {
  //     ...data,
  //     grant_type: "password",
  //     client_secret: "cDG5XcuqnJmj8ZeTIFO1kHrCOJGiO8Os",
  //     client_id: "demoClient",
  //   };
  //   delete maindata.realm;
  // }
  try {
    const res = await fetch(logOutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodeFormData(maindata),
    });

    return "success";
  } catch (err) {
    return "error";
  }
};

export const checkIsActive = async (data, token) => {
  console.log("checkIsActive", data, token);
  var checkisAciveUrl = `http://192.168.2.165:8085/realms/${data.realm}/protocol/openid-connect/token/introspect`;
  var maindata = { ...data, token: token.access_token };
  delete maindata.realm;

  // if (data.realm === "testRealm") {
  //   maindata = {
  //     token: token.access_token,
  //     client_secret: "cDG5XcuqnJmj8ZeTIFO1kHrCOJGiO8Os",
  //     client_id: "testRealm1",
  //   };
  // } else {
  //   return "failed";
  //   maindata = {
  //     ...data,
  //     grant_type: "password",
  //     client_secret: "cDG5XcuqnJmj8ZeTIFO1kHrCOJGiO8Os",
  //     client_id: "demoClient",
  //   };
  //   delete maindata.realm;
  // }
  try {
    const res = await fetch(checkisAciveUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodeFormData(maindata),
    })
      .then((res) => res.json())
      .then((res) => res);
    // Parsing JSON response and returning it
    // const jsonResponse = await res.json();

    // return jsonResponse;
    return res;
  } catch (err) {
    return "error";
  }
};
