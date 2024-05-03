import React, { useEffect, useState } from "react";
import Applist from "./Applist";
import { Input } from "@nextui-org/react";
import { FaRegFolderOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/utilsFunctions/Store/store";
import { setAppGroup } from "@/app/utilsFunctions/Store/Reducers/MainSlice";


interface Response {
  data: any[];
  status: number;
}

const appSelector = () => {
  const [applicationGroup, setApplicationGroup] = useState<any[]>([]);
  const [selectedAppGroup, setSelectedAppGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const appGroup = useSelector((state: RootState) => state.main.appGroup);
  const dispatch = useDispatch();

  //API calls
  const getAllApplicationGroup = async () => {
    try {
      if (applicationGroup && applicationGroup.length == 0) {
        const allData: Response = await fetch(
          "http://192.168.2.110:3002/vpt/appGroupList?tenant=GSS-DEV",
          {
            method: "GET",
          }
        ).then((res) => res.json());
        console.log(allData);
        

        setApplicationGroup(allData.data);
        setSelectedAppGroup(allData.data[0]);
      }
    } catch (error) {
      throw error;
    }
  };

 

  const deleteAllApplicationGroup = async (e: any) => {
    try {
      const response: Response = await fetch(
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

  //useEffect calls for Data
  useEffect(() => {
  (async () => {
    await getAllApplicationGroup();
  })();
  }, [appGroup]);

  const handleAppGroupSelection = (appGroup: string) => {
    setSelectedAppGroup(appGroup);
    dispatch(setAppGroup(appGroup));
  }

  return (
    <div className="flex w-full ">
      <div className="flex flex-col p-3 gap-5 ">
        <h2 className="font-bold text-xl p-2 border-b">AppGroup List</h2>
        <Input 
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col gap-3 h-full overflow-y-scroll">
          {applicationGroup.length && applicationGroup 
            .filter((appGroup) => appGroup.toLowerCase().includes(searchTerm.toLowerCase())) 
            .map((appGroup, index) =>  ( 
            
            <div
            key={index}
              onClick={() =>handleAppGroupSelection(appGroup)}
              className={`cursor-pointer ${selectedAppGroup == appGroup ? "bg-gray-300 p-2 rounded": ""}`}
            >
              <div className="flex items-center gap-2" >
              <FaRegFolderOpen />
              {appGroup}
            </div>
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
