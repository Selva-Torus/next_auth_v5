"use client";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { GrChapterAdd } from "react-icons/gr";
import { MdAddRoad } from "react-icons/md";
import { FcSearch } from "react-icons/fc";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "@nextui-org/react";

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
import { useTheme } from "next-themes";

const columns = [
  {
    key: "MenuItems",
    label: "MenuItems",
  },
  {
    key: "Fabrics",
    label: "Fabrics",
  },
  {
    key: "keys",
    label: "keys",
  },
  {
    key: "roles",
    label: "roles",
  },
  {
    key: "MiRoles",
    label: "MiRoles",
  },
  {
    key: "Actions",
    label: "Actions",
  },
];

const AssemblerComponent = () => {
  const { theme, setTheme } = useTheme();

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
    const [isAddNewGroup, setIsAddNewGroup] = useState(false);
    const [mgGroupName, setMgGroupName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
      const data = [];

      // Loop through each menuGroup in AssemblerJson
      Object.keys(AssemblerJson.menuGroup[0]).forEach((menuGroupKey) => {
        const group = {};
        group.menuGroup = menuGroupKey;
        group.menuItems = [];

        // Loop through each menu item in menuGroup
        Object.keys(AssemblerJson.menuGroup[0][menuGroupKey][0]).forEach(
          (menuItemKey) => {
            const menuItem = {
              item: menuItemKey,
            };
            const itemData =
              AssemblerJson.menuGroup[0][menuGroupKey][0][menuItemKey];
            const fabric = [];

            // Loop through df, uf, pf in menuItem
            ["df", "uf", "pf"].forEach((fabricKey) => {
              fabric.push({
                name: fabricKey,
                modelkey: itemData[fabricKey].modelkey,
                version: itemData[fabricKey].version,
                roles: itemData[fabricKey].roles,
              });
            });

            menuItem.Fabric = fabric;
            menuItem.miroles = itemData.miroles;

            group.menuItems.push(menuItem);
          }
        );

        data.push(group);
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

    const handleDeleteRow = (path) => {
      console.log(path.split(":"));
      var arr = path.split(":");

      const data = structuredClone(mapingData);
      console.log(data[path]);

      console.log(data[arr[0]].menuItems[arr[1]].Fabric[arr[2]]);
      data[arr[0]].menuItems[arr[1]].Fabric.splice(arr[2], 1);
      setMapingData(data);
    };

    const handleAddRow = (path, i) => {
      console.log(path.split(":"));
      var arr = path.split(":");

      const data = structuredClone(mapingData);
      console.log(data[path]);

      console.log(data[arr[0]].menuItems[arr[1]].Fabric[arr[2]]);
      data[arr[0]].menuItems[arr[1]].Fabric.push({
        name: `_New_`,
        modelkey: "",
        version: "",
        roles: [],
      });
      setMapingData(data);
    };

    const handelAddNewModelGroup = () => {
      const data = structuredClone(mapingData);
      data.push({
        menuGroup: mgGroupName,
        menuItems: [
          {
            item: "mi1",
            Fabric: [
              { name: "df", modelkey: "", version: "", roles: [] },
              { name: "uf", modelkey: "", version: "", roles: [] },
              { name: "pf", modelkey: "", version: "", roles: [] },
            ],
            miroles: [],
          },
        ],
      });
      console.log(data);
      setMapingData(data);
      setIsAddNewGroup(false);
    };

    function handelAddNewMenuItem(index) {
      const data = structuredClone(mapingData);
      data[index].menuItems.push({
        item: "mi1",
        Fabric: [
          { name: "df", modelkey: "", version: "", roles: [] },
          { name: "uf", modelkey: "", version: "", roles: [] },
          { name: "pf", modelkey: "", version: "", roles: [] },
        ],
        miroles: [],
      });
      setMapingData(data);
    }

    const topContent = () => {
      return (
        <div className=" w-full flex">
          <div className="flex justify-between w-full">
            <Input
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="Search by menu item..."
              size="sm"
              startContent={
                <FcSearch size={20} className="text-default-300 " />
              }
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="bordered"
            />
            <div className="flex gap-2">
              <Tooltip content="Add New Menu Group">
                <Button
                  color="success"
                  size="sm"
                  onClick={() => setIsAddNewGroup(true)}
                >
                  <GrChapterAdd size={20} />
                </Button>
              </Tooltip>
              <Button size="sm" onClick={convertData}>
                save
              </Button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="w-[78vw] h-full">
        <h2 className="text-center">Assembler key</h2>
        <div className="w-full flex flex-col">
          <Tabs aria-label="Options">
            {mapingData.map((ele, index) => (
              <Tab key={ele.menuGroup} title={ele.menuGroup}>
                <Table
                  isHeaderSticky
                  topContent={topContent()}
                  aria-label="Example static collection table"
                  classNames={{
                    base: "max-h-[490px] overflow-scroll scrollbar-hide",
                  }}
                  bottomContent={
                    <div className="flex w-full justify-center">
                      <Tooltip content="Add New Menu Items">
                        <Button
                          size="sm"
                          className=""
                          onClick={() => handelAddNewMenuItem(index)}
                        >
                          <MdAddRoad size={20} />
                        </Button>
                      </Tooltip>
                    </div>
                  }
                >
                  <TableHeader
                    columns={columns}
                    className="border-b sticky top-0"
                  >
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody>
                    {ele.menuItems
                      .filter((app) =>
                        app.item
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((item, id) => (
                        <TableRow key={id}>
                          <TableCell>
                            <Input
                              className="p-2"
                              color="primary"
                              classNames={{
                                base: " w-[150px] ",
                                label: [
                                  "text-xs  text-black focus-within:text-white focus:text-white",
                                ],

                                input: [
                                  `${theme == "light" ? "" : "text-white"}`,
                                ],

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
                                  `${index}.menuItems[${id}].item`
                                )
                              }
                              value={item.item}
                            />
                          </TableCell>
                          <TableCell>
                            {item.Fabric.map((fabric, i) => (
                              <Input
                                className="p-2"
                                color="primary"
                                classNames={{
                                  base: " w-[50px] ",
                                  label: [
                                    "text-xs  text-black focus-within:text-white focus:text-white",
                                  ],
                                  input: [
                                    `${theme == "light" ? "" : "text-white"}`,
                                  ],

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
                                    `${index}.menuItems[${id}].Fabric[${i}].name`
                                  )
                                }
                                value={fabric.name}
                              />
                            ))}
                          </TableCell>
                          <TableCell>
                            {item.Fabric.map((fabric, i) => (
                              <Input
                                className="p-2"
                                color="primary"
                                classNames={{
                                  base: " w-full ",
                                  label: [
                                    "text-xs  text-black focus-within:text-white focus:text-white",
                                  ],
                                  input: [
                                    `${theme == "light" ? "" : "text-white"}`,
                                  ],

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
                            ))}
                          </TableCell>
                          {/* <TableCell>
                        {item.Fabric.map(
                          (fabric, i) =>
                            i < 3 && (
                              <Input
                                className="p-2"
                                color="primary"
                                classNames={{
                                  base: " w-full ",
                                  label: [
                                    "text-xs  text-black focus-within:text-white focus:text-white",
                                  ],

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
                      </TableCell> */}
                          <TableCell>
                            {item.Fabric.map((fabric, i) => (
                              <Input
                                className="p-2"
                                color="primary"
                                classNames={{
                                  base: " w-full ",
                                  label: [
                                    "text-xs  text-black focus-within:text-white focus:text-white",
                                  ],
                                  input: [
                                    `${theme == "light" ? "" : "text-white"}`,
                                  ],

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
                                    fill={theme == "light" ? "" : "white"}
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
                            ))}
                          </TableCell>
                          <TableCell>
                            <Input
                              className="p-2"
                              color="primary"
                              classNames={{
                                base: " w-full ",
                                label: [
                                  "text-xs  text-black focus-within:text-white focus:text-white",
                                ],
                                input: [
                                  `${theme == "light" ? "" : "text-white"}`,
                                ],

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
                              endContent={
                                <LiaHandPointer
                                  fill={theme == "light" ? "" : "white"}
                                  className="cursor-pointer"
                                  size={20}
                                  onClick={(e) =>
                                    handleRolesModal(
                                      item.miroles,
                                      `${index}.menuItems[${id}].miroles`
                                    )
                                  }
                                />
                              }
                              value={item.miroles}
                            />
                          </TableCell>
                          <TableCell>
                            {item.Fabric.map((fabric, i) => (
                              <p className="flex w-full p-2 justify-between gap-2">
                                <MdDeleteOutline
                                  size={20}
                                  onClick={() =>
                                    handleDeleteRow(`${index}:${id}:${i}`)
                                  }
                                  className="cursor-pointer"
                                />
                                {item.Fabric.length - 1 == i && (
                                  <IoIosAddCircleOutline
                                    size={20}
                                    onClick={() =>
                                      handleAddRow(`${index}:${id}`)
                                    }
                                    className="cursor-pointer"
                                  />
                                )}
                              </p>
                            ))}
                            {item.Fabric.length == 0 && (
                              <IoIosAddCircleOutline
                                size={20}
                                onClick={() => handleAddRow(`${index}:${id}`)}
                                className="cursor-pointer"
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Tab>
            ))}
          </Tabs>
        </div>
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
        <Modal isOpen={isAddNewGroup} onOpenChange={setIsAddNewGroup}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Menu Group
              </ModalHeader>
              <ModalBody>
                <Input
                  className="p-2"
                  color="primary"
                  type="text"
                  name="name"
                  value={mgGroupName}
                  onChange={(e) => setMgGroupName(e.target.value)}
                  classNames={{
                    base: " w-full ",
                    label: [
                      "text-xs  text-black focus-within:text-white focus:text-white",
                    ],

                    inputWrapper: [
                      "border border-slate-500/50",
                      "text-black",
                      "bg-transparent",
                      "data-[hover=true]:bg-[#282551] data-[hover=true]:text-white",
                      "data-[hover=true]:border-[#4435CF]",
                      "focus-within:!bg-[#282551] focus-within:text-white",
                      "focus-within:border-[#4435CF] border-2 ",
                    ],
                    innerWrapper: ["bg-transparent", "boder-2 border-blue-100"],
                  }}
                  size="sm"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={handelAddNewModelGroup}>
                  Add
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  onPress={setIsAddNewGroup}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </div>
    );
  } else {
    return <>No data available</>;
  }
};

export default AssemblerComponent;
