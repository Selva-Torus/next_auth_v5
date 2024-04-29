// server.js (or wherever you initialize your Next.js server)
"use server";
import fs from "fs";
import path from "path";
 
export const readFileContents = () => {
  const filePath = path.join(process.cwd(), "realmData.json"); // Assuming data.txt is in the root directory of your Next.js project
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    return JSON.parse(data);
  });
};
 
// Function to write contents to a file
export const writeFileContents = (content : any) => {
  var main = `export const realmData = {
    realm: "${content.realm}",
    realmId: "${content.realmId}",
    client_id: "${content.client_id}",
    client_secret: "${content.client_secret}"
  };`;
 
  console.log(main);
 
  const filePath = path.join(process.cwd(), "realmData.js");
  fs.writeFile(filePath, main, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log("File write successful!");
  });
 
  return true;
};
 