"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useState, useEffect, useContext, useRef } from "react";
import { FaFolderOpen } from "react-icons/fa6";

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

  return (
    <>
      {selectedApp ? (
        <div className="w-full">
          Select an Application Group
          <div className="grid grid-cols-2 w-full px-3">
            {applicationGroup.map((key) => (
              <>
                <DisplayApplication appGroup={key} />
              </>
            ))}
          </div>
         
        </div>
      ) : (
        <div className={`w-full h-full `}>
        
        </div>
      )}
    </>
  );
}

// Another component that need to reuse the application view UI
interface componentProps {
    appGroup : string
}

const DisplayApplication = ({ appGroup }: componentProps) => {
  // const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  const [application, setApplication] = useState([]);
  const [selectedApp, setSelectedApp] = useState(true);
  const [selectedapplicationGroup, setSelectedApplicationGroup] =
    useState<null | string>(null);
  const getAllApplications = async (appGroup: any) => {
    try {
      setSelectedApplicationGroup(appGroup);
      const data = await fetch(
        `http://192.168.2.110:3002/vpt/applicationList?tenant=GSS-DEV&appGroup=${appGroup}`,
        {
          method: "GET",
        }
      ).then((res) => res.json());
      setApplication(data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      await getAllApplications(appGroup);
    })();
  }, []);

  return (
    // <div>
    //   <h2 className="text-xl font-bold mb-4">{appGroup}</h2>
    //   <div className="flex flex-wrap items-center gap-5 mb-2 p-3 ">
    //     {application.map((app, index) => (
    //       <div key={index}>
    //         <div className="flex flex-col items-center">
    //             <Button
    //               type="button"
    //               className="flex items-center justify-center bg-blue-200 text-white h-16"
    //             >
    //               <FaFolderOpen className="text-black text-3xl" fill="blue" />
    //             </Button>
    //           <span
    //             className="cursor-pointer truncate"
    //             onClick={() => {
    //               setSelectedApplicationGroup(appGroup);
    //               setSelectedApp(app);
    //             }}
    //           >
    //             {app}
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="border">
      <h2 className="text-xl font-bold px-2">{appGroup}</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {application.map((app, index) => (
          <div key={index} className="flex items-center justify-center flex-col">
            <Button
              type="button"
              className="flex items-center justify-center bg-blue-500 text-white h-16 w-16 rounded-full"
            >
              <FaFolderOpen className="text-blue-700 text-3xl" />
            </Button>
            <span
              className={`cursor-pointer mt-2 text-center ${
                selectedApp === app ? 'text-blue-500 font-bold' : ''
              }`}
              onClick={() => setSelectedApp(app)}
            >
              {app}
            </span>
          </div>
        ))}
      </div>
        <Button>+</Button>
    </div>
  );
};
