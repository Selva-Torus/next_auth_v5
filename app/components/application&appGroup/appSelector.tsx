import React, { useState } from "react";
import Applist from "./Applist";

const appSelector = () => {
  const [applicationGroup, setApplicationGroup] = useState<any[]>([]);
  const [selectedAppGroup, setSelectedAppGroup] = useState("");
  
  //API calls
  const getAllApplicationGroup = async () => {
    try {
      if (applicationGroup && applicationGroup.length == 0) {
        const allData: string[] = await fetch(
          "http://192.168.2.110:3002/vpt/appGroupList?tenant=GSS-DEV",
          {
            method: "GET",
          }
        ).then((res) => res.json());

        setApplicationGroup(allData);
        setSelectedAppGroup(allData[0]);
      }
    } catch (error) {
      throw error;
    }
  };

  // const postAllApplicationGroup = async (e: any) => {
  //   try {
  //     const newGroup = await fetch(
  //       `http://192.168.2.110:3002/vpt/appGroupCreate?tenant=GSS-DEV&appGroup=${e}`,
  //       {
  //         method: "POST",
  //       }
  //     ).then((res) => res.json());
  //     setApplicationGroup(newGroup);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // const deleteAllApplicationGroup = async (e: any) => {
  //   try {
  //     const response = await fetch(
  //       `http://192.168.2.110:3002/vpt/deleteAppGroup?tenant=GSS-DEV&appGroup=${e}`,
  //       {
  //         method: "DELETE",
  //       }
  //     ).then((res) => res.json());
  //     if (response.status === 200) {
  //       setApplicationGroup((prev) => prev.filter((item) => item !== e));
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  //useEffect calls for Data
  // useEffect(() => {
  (async () => {
    await getAllApplicationGroup();
  })();

  return (
    <div className="flex w-full">
      <div className="flex flex-col p-3 gap-5">
        <h2 className="font-bold text-xl p-2 border-b">AppGroup List</h2>
        <div className="flex flex-col gap-3">
          {applicationGroup.map((appGroup, index) => (
            <div
              onClick={() => setSelectedAppGroup(appGroup)}
              className={`cursor-pointer ${selectedAppGroup == appGroup ? "bg-gray-300 p-2 rounded": ""}`}
            >
              {appGroup}
            </div>
          ))}
        </div>
      </div>
      <div>
        <Applist appGroup={selectedAppGroup} />
      </div>
    </div>
  );
};

export default appSelector;
