import axios from "axios";

export const handleKeycloakRegister = async (data: any) => {
  // Define the URL
  const url =
    "https://keycloak9x.gsstvl.com:18443/realms/testRealm/protocol/openid-connect/token";

  // Define the request body as a URL-encoded string
  const requestBody = {
    grant_type: "client_credentials",
    client_id: "demoClient",
    client_secret: "oTtfWsw8SKukpKTiaNr4bGIg5Dlkp4sW",
  };

  // Define the headers
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const encodeFormData = (data: any) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };
  var access_token = "";
  // Make the POST request with request body and headers
  const res = await axios
    .post(url, encodeFormData(requestBody), {
      headers: headers,
    })
    .then((response) => {
      access_token = response.data.access_token;
    })
    .catch((error) => {
      alert("error occured");
      console.error("Error:", error);
    });

  if (access_token)
    try {
      const requestBody = {
        attributes: {
          attribute_key: "test_value",
        },
        credentials: [
          {
            temporary: false,
            type: "password",
            value: data.password,
          },
        ],
        username: data.username,
        firstName: "testuser",
        lastName: "testuser",
        email: data.email,
        emailVerified: true,
        enabled: true,
      };

      const headers = {
        Authorization: `Bearer ${access_token}`, // Include bearer token in headers
      };

      axios
        .post(
          "https://keycloak9x.gsstvl.com:18443/admin/realms/testRealm/users",
          requestBody,
          {
            headers: headers,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            return { data: "user created" };
          } else {
            return { error: "there is an issue with user creation" };
          }
        });
    } catch (error) {
      console.error("Error:", error);
      return { error: "there is an issue with user creation" };
    }
};
