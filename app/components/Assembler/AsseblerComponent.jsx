import React, { useEffect, useState } from "react";
// var set = require("lodash.set");
import { Tabs, Tab, Input, useDisclosure, Button } from "@nextui-org/react";
import { AssemblerJson } from "@/app/utilsFunctions/ulits/Torus9x_AssemblerKey";
import _ from "lodash";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import RolesAssignModal from "./RolesAssignModal";
import { LiaHandPointer } from "react-icons/lia";

const AssemblerComponent = () => {
  if (
    AssemblerJson &&
    typeof AssemblerJson === "object" &&
    AssemblerJson.menuGroup &&
    AssemblerJson.menuGroup.length > 0
  ) {
    const [mapingData, setMapingData] = useState([]);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [rolesPath, setRolesPath] = useState("");
    const [existingRoles, setExistingRoles] = useState([]);
    useEffect(() => {
      const data = [];

      AssemblerJson.menuGroup.forEach((group) => {
        Object.entries(group).forEach(([groupName, items]) => {
          const menuGroup = groupName;
          const menuItems = items.map((itemGroup) => {
            return Object.entries(itemGroup).map(([itemName, fabric]) => {
              return {
                item: itemName,
                Fabric: Object.entries(fabric).map(
                  ([fabricName, properties]) => {
                    if (fabricName === "miroles") {
                      return { name: fabricName };
                    } else {
                      return { name: fabricName, ...properties };
                    }
                  }
                ),
              };
            });
          })[0];

          data.push({ menuGroup, menuItems });
        });
      });

      setMapingData(data);
    }, []);

    const convertData = () => {
      var convertedData = {};

      mapingData.forEach((group) => {
        var mg = group.menuGroup;
        convertedData[mg] = [];
        group.menuItems.forEach((item) => {
          var newItem = {};
          newItem[item.item] = {};
          item.Fabric.forEach((fab) => {
            if (fab.name !== "miroles") {
              newItem[item.item][fab.name] = {
                modelkey: fab.modelkey,
                version: fab.version,
                roles: fab.roles,
              };
            } else {
              newItem[item.item][fab.name] = [];
            }
          });
          convertedData[mg].push(newItem);
        });
      });
      const newData = {
        ...AssemblerJson,
        menuGroup: convertedData,
      };

      console.log(newData);
    };

    function handleOnDrop(e, path) {
      const data = structuredClone(mapingData);
      var newOne = _.set(data, path, e.dataTransfer.getData("key"));
      setMapingData(newOne);
      e.preventDefault();
    }
    0;
    function handleDragOver(e) {
      e.preventDefault();
    }

    function handleRolesModal(role, path) {
      setExistingRoles(role);
      setRolesPath(path);
      onOpen();
    }
    function clearKey(path) {
      const data = structuredClone(mapingData);
      var newOne = _.set(data, path, "");
      setMapingData(newOne);
    }

    function handleOnChange(value, path) {
      const data = structuredClone(mapingData);
      var newOne = _.set(data, path, value);
      setMapingData(newOne);
    }

    return (
      <div className="w-[78vw] h-full overflow-y-scroll">
        <h2 className="text-center">Assembler key</h2>
        <div className="w-full flex justify-end">
          <Button onClick={convertData}>save</Button>
        </div>
        <Tabs aria-label="Options">
          {mapingData.map((ele, index) => (
            <Tab key={ele.menuGroup} title={ele.menuGroup}>
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>MenuItems</TableColumn>
                  <TableColumn>Fabrics</TableColumn>
                  <TableColumn>keys</TableColumn>
                  <TableColumn>version</TableColumn>
                  <TableColumn>roles</TableColumn>
                </TableHeader>
                <TableBody>
                  {ele.menuItems.map((item, id) => (
                    <TableRow key={id}>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>
                        {item.Fabric.map(
                          (fabric, i) =>
                            i < 3 && (
                              <p className="p-2" key={i}>
                                {fabric.name}
                              </p>
                            )
                        )}
                      </TableCell>
                      <TableCell>
                        {item.Fabric.map(
                          (fabric, i) =>
                            i < 3 && (
                              <Input
                                className="p-2"
                                color="primary"
                                classNames={{
                                  base: " w-full ",
                                  label: [
                                    // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                                    "text-xs  text-black focus-within:text-white focus:text-white",
                                  ],

                                  // mainWrapper: ["h-full text-white rounded-xl bg-transparent"],

                                  // input: [
                                  //   "bg-transparent",
                                  //   "text-black",
                                  //   "placeholder:text-white",
                                  //   "text-sm",
                                  //   "font-bold",
                                  // ],

                                  inputWrapper: [
                                    "border border-slate-500/50",
                                    "text-black",
                                    "bg-transparent",
                                    "data-[hover=true]:bg-[#282551] data-[hover=true]:text-white",
                                    "data-[hover=true]:border-[#4435CF]",
                                    "focus-within:!bg-[#282551] focus-within:text-white",
                                    "focus-within:border-[#4435CF] border-2 ",
                                  ],
                                  innerWrapper: [
                                    "bg-transparent",
                                    "boder-2 border-blue-100",
                                  ],
                                }}
                                type="text"
                                size="sm"
                                isClearable
                                onClear={() => {
                                  clearKey(
                                    `${index}.menuItems[${id}].Fabric[${i}].modelkey`
                                  );
                                }}
                                onDrop={(e) =>
                                  handleOnDrop(
                                    e,
                                    `${index}.menuItems[${id}].Fabric[${i}].modelkey`
                                  )
                                }
                                onDragOver={handleDragOver}
                                value={fabric.modelkey}
                                key={i}
                              />
                            )
                        )}
                      </TableCell>
                      <TableCell>
                        {item.Fabric.map(
                          (fabric, i) =>
                            i < 3 && (
                              <Input
                                className="p-2"
                                color="primary"
                                classNames={{
                                  base: " w-full ",
                                  label: [
                                    // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                                    "text-xs  text-black focus-within:text-white focus:text-white",
                                  ],

                                  // mainWrapper: ["h-full text-white rounded-xl bg-transparent"],

                                  // input: [
                                  //   "bg-transparent",
                                  //   "text-black",
                                  //   "placeholder:text-white",
                                  //   "text-sm",
                                  //   "font-bold",
                                  // ],

                                  inputWrapper: [
                                    "border border-slate-500/50",
                                    "text-black",
                                    "bg-transparent",
                                    "data-[hover=true]:bg-[#282551] data-[hover=true]:text-white",
                                    "data-[hover=true]:border-[#4435CF]",
                                    "focus-within:!bg-[#282551] focus-within:text-white",
                                    "focus-within:border-[#4435CF] border-2 ",
                                  ],
                                  innerWrapper: [
                                    "bg-transparent",
                                    "boder-2 border-blue-100",
                                  ],
                                }}
                                type="text"
                                size="sm"
                                onChange={(e) =>
                                  handleOnChange(
                                    e.target.value,
                                    `${index}.menuItems[${id}].Fabric[${i}].version`
                                  )
                                }
                                value={fabric.version}
                                key={i}
                              />
                            )
                        )}
                      </TableCell>
                      <TableCell>
                        {item.Fabric.map(
                          (fabric, i) =>
                            i < 3 && (
                              <Input
                                className="p-2"
                                color="primary"
                                classNames={{
                                  base: " w-full ",
                                  label: [
                                    // "text-sm font-bold  text-[#3243C4] focus-within:text-[#3243C4]",
                                    "text-xs  text-black focus-within:text-white focus:text-white",
                                  ],

                                  // mainWrapper: ["h-full text-white rounded-xl bg-transparent"],

                                  // input: [
                                  //   "bg-transparent",
                                  //   "text-black",
                                  //   "placeholder:text-white",
                                  //   "text-sm",
                                  //   "font-bold",
                                  // ],

                                  inputWrapper: [
                                    "border border-slate-500/50",
                                    "text-black",
                                    "bg-transparent",
                                    "data-[hover=true]:bg-[#282551] data-[hover=true]:text-white",
                                    "data-[hover=true]:border-[#4435CF]",
                                    "focus-within:!bg-[#282551] focus-within:text-white",
                                    "focus-within:border-[#4435CF] border-2 ",
                                  ],
                                  innerWrapper: [
                                    "bg-transparent",
                                    "boder-2 border-blue-100",
                                  ],
                                }}
                                type="text"
                                size="sm"
                                key={i}
                                value={fabric.roles}
                                endContent={
                                  <LiaHandPointer
                                    className="cursor-pointer"
                                    size={20}
                                    onClick={(e) =>
                                      handleRolesModal(
                                        fabric.roles,
                                        `${index}.menuItems[${id}].Fabric[${i}].roles`
                                      )
                                    }
                                  />
                                }
                              />
                            )
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tab>
          ))}
        </Tabs>
        <RolesAssignModal
          onClose={onClose}
          isOpen={isOpen}
          path={rolesPath}
          roles={AssemblerJson.roles}
          mapingData={mapingData}
          setMapingData={setMapingData}
          existingRoles={existingRoles}
          setExistingRoles={setExistingRoles}
        />
      </div>
    );
  } else {
    return <>No data available</>;
  }
};

export default AssemblerComponent;
