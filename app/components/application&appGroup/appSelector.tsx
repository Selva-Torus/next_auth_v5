"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useState, useEffect, useContext, useRef } from "react";
import { FaFolderOpen } from "react-icons/fa6";
import { DisplayApplication } from "./appList";

var color = [
  {
    id: 0,
    bg_color: "blue",
    icon_colr: "red",
  },
  {
    id: 0,
    bg_color: "blue",
    icon_colr: "red",
  },
  {
    id: 0,
    bg_color: "blue",
    icon_colr: "red",
  },
];

export default function ApplicationSelection({}) {
  const [application, setApplication] = useState([]);
  const [applicationGroup, setApplicationGroup] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState(true);
  const [selectedapplicationGroup, setSelectedApplicationGroup] =
    useState(null);
  const [selectedKey, setSelectedKey] = useState({
    key: "",
    type: "",
  });
  const [posthApplication, setPostApplication] = useState([]);
  const [newApplicationGroup, setNewApplicationGroup] = useState("");
  const [showError, setShowError] = useState(false);

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

        console.log(allData);

        setApplicationGroup(allData);
      }
    } catch (error) {
      throw error;
    }
  };

  const postAllApplicationGroup = async (e: any) => {
    try {
      const newGroup = await fetch(
        `http://192.168.2.110:3002/vpt/appGroupCreate?tenant=GSS-DEV&appGroup=${e}`,
        {
          method: "POST",
        }
      ).then((res) => res.json());
      setApplicationGroup(newGroup);
    } catch (error) {
      throw error;
    }
  };

  const deleteAllApplicationGroup = async (e: any) => {
    try {
      const response = await fetch(
        `http://192.168.2.110:3002/vpt/deleteAppGroup?tenant=GSS-DEV&appGroup=${e}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());
      if (response.status === 200) {
        setApplicationGroup((prev) => prev.filter((item) => item !== e));
      }
    } catch (error) {
      throw error;
    }
  };

  // const getAllApplications = async (appGroup: any) => {
  //   try {
  //     setSelectedApplicationGroup(appGroup);
  //     const data = await fetch(
  //       `http://192.168.2.110:3002/vpt/applicationList?tenant=GSS-DEV&appGroup=${appGroup}`,
  //       {
  //         method: "GET",
  //       }
  //     ).then((res) => res.json());
  //     setApplication(data);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const postAllApplication = async () => {
    try {
      const newApp = await fetch(
        `http://192.168.2.110:3002/vpt/applicationCreate?tenant=GSS-DEV&appGroup=${selectedapplicationGroup}&applicationName=${posthApplication}`,
        {
          method: "POST",
        }
      ).then((res) => res.json());
      setApplication(newApp);
    } catch (error) {
      throw error;
    }
  };

  const DeleteApplication = async (selectedApp: any) => {
    try {
      const response = await fetch(
        `http://192.168.2.110:3002/vpt/deleteApplication?tenant=GSS-DEV&appGroup=${selectedapplicationGroup}&applicationName=${selectedApp}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());

      if (response.status === 200) {
        setApplication((prev) => prev.filter((item) => item !== selectedApp));
      }
    } catch (error) {
      throw error;
    }
  };

  //useEffect calls for Data
  // useEffect(() => {
  (async () => {
    await getAllApplicationGroup();
    // await getAllApplications(selectedapplicationGroup);
  })();
  // },[]);

  console.log(application);

  //Validation for new Application Group
  const handlenewApplicationGroup = (e: any) => {
    if (applicationGroup.includes(e.target.value)) {
      setShowError(true);
      e.target.value = "";
      return;
    } else {
      setShowError(false);
      setNewApplicationGroup(e.target.value);
    }
  };

  //Validation for new Application
  const handlenewApplication = (e: any) => {
    if (application.includes(e.target.value)) {
      setShowError(true);
      e.target.value = "";
      return;
    } else {
      setShowError(false);
      setPostApplication(e.target.value);
    }
  };

  function generateRandomColor() {
    // List of Tailwind CSS color names
    const colors = [
      "bg-red-300",
      "bg-orange-300",
      "bg-yellow-300",
      "bg-green-300",
      "bg-teal-300",
      "bg-blue-300",
      "bg-indigo-300",
      "bg-purple-300",
      "bg-pink-300",
    ];

    // Generate a random index to pick a color from the array
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the randomly selected color
    return colors[randomIndex];
  }

  return (
    <>
      {selectedApp ? (
        <div className="w-full">
          Select an Application Group
          <div className="flex flex-col w-full px-4">
            {applicationGroup.map((key, id) => (
              <>
                <DisplayApplication
                  appGroup={key}
                  bgColor={id % 2 ? "bg-slate-300" : "bg-white"}
                  iconColor={generateRandomColor()}
                />
              </>
            ))}
          </div>
        </div>
      ) : (
        <div className={`w-full h-full `}></div>
      )}
    </>
  );
}
