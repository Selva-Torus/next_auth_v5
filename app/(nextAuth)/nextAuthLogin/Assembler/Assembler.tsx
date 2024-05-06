import AssemblerComponent from "@/app/components/Assembler/AsseblerComponent";
import { RootState } from "@/app/utilsFunctions/Store/store";
import { Input } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Assembler = () => {
  const [AllApplications, setAllApplications] = useState([]);
  const [viewAllApplications, setviewAllApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fabric = useSelector((state: RootState) => state.main.fabric);
  const getAllApplicationList = async () => {
    const key: any = localStorage.getItem("AssemblerKey");
    console.log(`${key}:${fabric}:`);
    // return;

    if (key && key.split(":")[0] == "GSS-DEV") {
      const res = await axios.post(
        "http://192.168.2.110:3002/keycloak/getAllKeys",
        {
          keyPrefix: `${key}:${fabric}`, //key,
        }
      );
      console.log(res);
      if (res.data.data) {
        setAllApplications(res.data.data);
        setviewAllApplications(res.data.data);
      } else {
        toast.error("There is no ModelKey found for the AssemblerKey");
      }

      // setAllApplications(res.data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getAllApplicationList();
  }, [fabric]);

  // const handleSearch = (e: any) => {
  //   const value = e.target.value;
  //   var main: any = [];
  //   for (let i = 0; i < AllApplications.length; i++) {
  //     if (AllApplications[i].includes(value)) {
  //       main = [...main, AllApplications[i]];
  //     }
  //   }
  //   setviewAllApplications(main);
  // };
  return (
    <div className="flex w-full ">
      <div className="flex flex-col p-3 gap-5 w-1/5">
        <h2 className="font-bold text-xl p-2 border-b">{fabric} Model Keys</h2>
        <Input
          size="sm"
          label="Search"
          isClearable
          radius="lg"
          onChange={(e) => setSearchTerm(e.target.value)}
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
        />
        {/* <div className=" overflow-y-auto w-full">
        
        </div> */}
        <div className="flex flex-col gap-3 h-full overflow-y-scroll">
          {viewAllApplications.length &&
            viewAllApplications
              .filter((app: string) =>
                app.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((app: string, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2">
                    <div>
                      <FaRegFolderOpen />
                    </div>
                    <div>{app.split(":").join(": ")}</div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div>
        <AssemblerComponent />
      </div>
    </div>
  );
};

export default Assembler;
