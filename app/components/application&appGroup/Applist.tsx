import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { CiMemoPad } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrCheckboxSelected } from "react-icons/gr";
import { useSelector } from "react-redux";
import { RootState } from "@/app/utilsFunctions/Store/store";

const Applist = ({ appGroup }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp , setSelectedApp ] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const application = useSelector((state: RootState) => state.main.applicationName);

  //   API CALLS

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
          setApplications(res.data);
          setLoading(false);
        });
    } catch (error) {
      throw error;
    }
  }, [appGroup , application]);

  const handleDelete = (app) => {
    onOpen();
    setSelectedApp(app);
  };

  const handleDeleteApp = () => {
    if(selectedApp){
      DeleteApplication(selectedApp);
      onClose();
    }
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center dark:bg-[#14181b] bg-white">
      <h2 className="font-bold text-2xl text-center">{appGroup}</h2>
      <div className="flex w-full justify-center">
        {applications.length ? (
          applications.map((app, id) => (
            <Popover placement="right-start" key={id}>
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
                    <div className="bg-blue-400 w-[55px] h-[55px] cursor-pointer flex item-center rounded-md justify-center">
                      <CiMemoPad className="mt-[12px]" size={30} />
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
                <div className="hover:text-white hover:bg-blue-500 p-2 flex items-center gap-2">
                  <GrCheckboxSelected />
                  Select Application
                </div>
                <div
                  className="hover:text-white hover:bg-red-500 p-2 flex items-center gap-2"
                  onClick={() => handleDelete(app)}
                >
                  <RiDeleteBin6Line />
                  Delete Application
                </div>
              </PopoverContent>
            </Popover>
          ))
        ) : loading ? (
          <Spinner />
        ) : (
          <div>No Application Available</div>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
          <ModalBody>This action can't be reversed.Please confirm the delete action </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDeleteApp}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Applist;
