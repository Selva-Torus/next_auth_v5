"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useState, useEffect, useContext, useRef } from "react";
import { FaFolderOpen } from "react-icons/fa6";

// Another component that need to reuse the application view UI
interface componentProps {
  appGroup: string;
  bgColor: string;
  iconColor: string;
}

export const DisplayApplication = ({
  appGroup,
  bgColor,
  iconColor,
}: componentProps) => {
  // const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  const [application, setApplication] = useState([]);
  const [selectedApp, setSelectedApp] = useState(true);
  const [selectedapplicationGroup, setSelectedApplicationGroup] = useState<
    null | string
  >(null);
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
    <div className={`flex flex-col ${bgColor}`}>
      <h2 className="text-xl font-bold px-2">{appGroup}</h2>
      <div className="grid grid-cols-8 gap-4 pl-6">
        {application.map((app, index) => (
          <div
            key={index}
            className="flex items-center justify-center flex-col"
          >
            <div
              //   type="button"
              //   isIconOnly
              className={`${iconColor} flex items-center justify-center h-16 w-16 rounded-small`}
              //   className="flex items-center justify-center bg-blue-500 text-white h-16 w-16 rounded-full"
            >
              <FaFolderOpen className="text-white text-3xl" />
            </div>
            <span
              className={`cursor-pointer mt-2 text-center ${
                selectedApp === app ? "text-blue-500 font-bold" : ""
              }`}
              onClick={() => setSelectedApp(app)}
            >
              {app}
            </span>
          </div>
        ))}
        {/* <Button>+</Button> */}
      </div>
    </div>
  );
};
