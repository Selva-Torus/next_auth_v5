import React, { useEffect, useState } from "react";
import Applist from "./Applist";
import { Button, Input } from "@nextui-org/react";
import { FaRegFolderOpen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/utilsFunctions/Store/store";
import { setAppGroup } from "@/app/utilsFunctions/Store/Reducers/MainSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Subloader } from "../layout/Loader";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import AccordianWindow from "../propertyWindow/Properties";

interface Response {
  data: any[];
  status: number;
}

const appSelector = () => {
  const [applicationGroup, setApplicationGroup] = useState<any[]>([]);
  const [selectedAppGroup, setSelectedAppGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const appGroup = useSelector((state: RootState) => state.main.appGroup);
  const isProps = useSelector((state: RootState) => state.main.isProps);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [fallBack, setFallBack] = useState(true);

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
        // console.log(allData.data[0]);
        dispatch(setAppGroup(allData.data[0]));
        setFallBack(false);
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
      setIsOpen(false);
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

  useEffect(() => {
    setTimeout(() => {
      setFallBack(false);
    }, Infinity);
  }, []);

  const getPropsApplicationList = async () => {
    const res = await fetch(
      `http://192.168.2.110:3002/vpt/applicationList?tenant=GSS-DEV&appGroup=${appGroup}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  };

  const handleAppGroupSelection = (appGroup: string) => {
    setSelectedAppGroup(appGroup);
    dispatch(setAppGroup(appGroup));
  };

  return (
    <>
      {fallBack ? (
        <Subloader />
      ) : (
        <div className={` w-full ${fallBack ? "hidden" : "flex"}`}>
          <div className="flex flex-col w-[20%] p-3 gap-5 ">
            <h2 className="font-bold text-xl p-2">AppGroup List</h2>
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col gap-3 h-full overflow-y-scroll">
              {applicationGroup.length &&
                applicationGroup
                  .filter((appGroup) =>
                    appGroup.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((appGroup, index) => (
                    <div
                      key={index}
                      onClick={() => handleAppGroupSelection(appGroup)}
                      className={`cursor-pointer ${
                        selectedAppGroup == appGroup
                          ? "bg-gray-400 p-2 rounded"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <FaRegFolderOpen />
                          {appGroup}
                        </div>
                        {selectedAppGroup == appGroup && (
                          <div>
                            <RiDeleteBin6Line onClick={() => setIsOpen(true)} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <Modal
            className="rounded-xl border-2 border-[#323B45] text-white bg-[#20252B] bg-opacity-800/70"
            isOpen={isOpen}
            onOpenChange={setIsOpen}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Deletion
              </ModalHeader>
              <ModalBody>
                This action can't be reversed.Please confirm the delete action{" "}
                {selectedAppGroup}{" "}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => deleteAllApplicationGroup(selectedAppGroup)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <div className="w-full flex">
            <Applist appGroup={selectedAppGroup} />
            {isProps && <AccordianWindow />}
          </div>
        </div>
      )}
    </>
  );
};

export default appSelector;
