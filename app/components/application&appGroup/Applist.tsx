import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalContent, Popover, PopoverContent, PopoverTrigger, Spinner } from "@nextui-org/react";
import { FaFolderOpen } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { CiMemoPad } from "react-icons/ci";


const Applist = ({ appGroup }) => {
  const [applications, setApplications] = useState([]);
  const [appInput, setAppInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localApp , setLocalApp ] = useState('')

  

  //   API CALLS
    const postAllApplication = async () => {
    try {
      if(localApp){
        const newApp = await fetch(
          `http://192.168.2.110:3002/vpt/applicationCreate?tenant=GSS-DEV&appGroup=${appGroup}&applicationName=${localApp}`,
          {
            method: "POST",
          }
        ).then((res) => res.json());
        setApplications(newApp);
        setAppInput(false)
      }else{
        toast.error('Please enter valid Application Name')
      }
      
    } catch (error) {
      throw error;
    }
  };

    const DeleteApplication = async (selectedApp: any) => {
    try {
      const response = await fetch(
        `http://192.168.2.110:3002/vpt/deleteApplication?tenant=GSS-DEV&appGroup=${appGroup}&applicationName=${selectedApp}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());

      if (response.status === 200) {
        setApplications((prev) => prev.filter((item) => item !== selectedApp));
      }
    } catch (error) {
      throw error;
    }
  };
  //   API CALLS


  useEffect(() => {
    try {
      setLoading(true);
      fetch(
        `http://192.168.2.110:3002/vpt/applicationList?tenant=GSS-DEV&appGroup=${appGroup}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setApplications(res);
          setLoading(false);
        });
    } catch (error) {
      throw error;
    }
  }, [appGroup]);


  return (
    <div className="flex flex-col w-full items-center justify-center dark:bg-[#14181b] bg-white">
      <h2 className="font-bold text-2xl text-center">{appGroup}</h2>
      <div className="flex w-full justify-center">
        {applications.length ? (
          applications.map((app, id) => (
            <Popover >
              <PopoverTrigger>
            <div
              key={id}
              className="flex flex-wrap py-4 px-5 gap-4 w-full justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                key={id}
                animate={{ x: [-100, 0], scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ duration: 0.5 }}
              >
                 <div
                    className="bg-blue-400 w-[55px] h-[55px] cursor-pointer flex item-center rounded-md justify-center">
                    <CiMemoPad
                      className="mt-[12px]"
                      size={30}
                    />
                  </div>
                  <span
                    className={
                      " w-[70%] cursor-pointer  mt-[10px] text-center " 
                    }
                    key={app}
                  >
                    {app}
                  </span>
              </motion.div>
            </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="hover:text-white hover:bg-blue-500 p-2">Select Application</div>
              <div className="hover:text-white hover:bg-red-500 p-2" onClick={()=>DeleteApplication(app)}>Delete Application</div>
            </PopoverContent>
            </Popover>
          ))
        ) : loading ? (
          <Spinner />
        ) : (
          <div>No Application Available</div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center">
        {appInput ? (
          <div className="mb-3 flex flex-col ">
            <Input
              type="text"
              style={{ border: "none", boxShadow: "none" }}
                onChange={(e) => setLocalApp(e.target.value)}
              className="border-2 rounded-lg"
            />
            <Button
              className="bg-blue-500 text-white rounded px-3 mx-7 my-3"
                onClick={postAllApplication}
            >
              Create Application
            </Button>
          </div>
        ) : (
          <div className="flex w-full justify-center ">
            <Button onClick={() => setAppInput(true)} className="flex gap-2">
              <IoIosAddCircle size={20} />
              <h2>Create Application</h2>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applist;
