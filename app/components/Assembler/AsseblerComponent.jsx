import React, { useEffect, useState } from "react";
// var set = require("lodash.set");
import { Tabs, Tab, Card, CardBody, Button, Input } from "@nextui-org/react";
import { AssemblerJson } from "@/app/utilsFunctions/ulits/Torus9x_AssemblerKey";
import TableComponent from "./tableComponent";
import _ from "lodash";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const AssemblerComponent = () => {
  if (
    AssemblerJson &&
    typeof AssemblerJson === "object" &&
    AssemblerJson.menuGroup &&
    AssemblerJson.menuGroup.length > 0
  ) {
    const [mapingData, setMapingData] = useState([]);

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

    function handleOnDrop(e, path) {
      const data = structuredClone(mapingData);
      console.log(path);
      var newOne = _.set(data, path, e.dataTransfer.getData("key"));
      setMapingData(newOne);
      e.preventDefault();
    }
    0;
    function handleDragOver(e) {
      e.preventDefault();
    }
    return (
      <div className="w-[70vw]">
        <h2 className="text-center">Assembler key</h2>
        <Tabs aria-label="Options">
          {mapingData.map((ele, index) => (
            <Tab key={ele.menuGroup} title={ele.menuGroup}>
              <Card>
                <CardBody>
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
                            {item.Fabric.map((fabric, i) => (
                              <p className="p-2">{fabric.name}</p>
                            ))}
                          </TableCell>
                          <TableCell>
                            {item.Fabric.map((fabric, i) => (
                              <Input
                                className="p-2"
                                type="text"
                                size="sm"
                                onDrop={(e) =>
                                  handleOnDrop(
                                    e,
                                    `${index}.menuItems[${id}].Fabric[${i}].modelkey`
                                  )
                                }
                                onDragOver={handleDragOver}
                                value={fabric.modelkey}
                              />
                            ))}
                          </TableCell>
                          <TableCell>
                            {item.Fabric.map((fabric, i) => (
                              <Input
                                className="p-2"
                                type="text"
                                size="sm"
                                value={fabric.version}
                              />
                            ))}
                          </TableCell>
                          <TableCell>
                            {item.Fabric.map((fabric, i) => (
                              <Input
                                className="p-2"
                                type="text"
                                size="sm"
                                value={fabric.roles}
                              />
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  } else {
    return <>No data available</>;
  }
};

export default AssemblerComponent;

{
  /* <Tabs
          aria-label="Options"
          className="w-[70vw] mt-5"
          // classNames={{
          //   base: "w-[70vw] mt-5",
          // }}
        >
          {AssemblerJson.menuGroup.map((menuGroups, index) =>
            Object.keys(menuGroups).map((menuGroup, i) => (
              <Tab title={menuGroup}>
                <TableComponent
                  menuGroup={menuGroups[menuGroup]}
                  sub={menuGroup}
                />
              </Tab>
            ))
          )}
        </Tabs> */
}
