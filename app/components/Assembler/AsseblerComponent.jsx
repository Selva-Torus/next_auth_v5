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
import { display } from "@/app/utilsFunctions/ulits/keyCloakAuth";

const AssemblerComponent = () => {
  if (
    AssemblerJson &&
    typeof AssemblerJson === "object" &&
    AssemblerJson.menuGroup &&
    AssemblerJson.menuGroup.length > 0
  ) {
    const [mapingData, setMapingData] = useState([]);
    const [Assembles, setAssemblesData] = useState(AssemblerJson);
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
      setAssemblesData({
        ...Assembles,
        menuGroup: data,
      });
    }, []);
    const [main, setMain] = useState("");

    function handleOnDrop(e, path) {
      // console.log(e.dataTransfer.getData("key"));

      console.log(path);
      var newOne = _.set(Assembles, path, e.dataTransfer.getData("key"));

      console.log(newOne.menuGroup[0].menuItems);

      setMapingData(newOne.menuGroup);

      // display(JSON.parse(newOne));
      e.preventDefault();
    }
    function handleDragOver(e) {
      e.preventDefault();
    }
    const HHHH = () => {
      var set = require("lodash.set");

      // The source object
      let obj = { cpp: [{ java: { python: 2012 } }] };

      set(obj, "cpp[0].java.python", 2020);

      // Prinitng old object
      // before using _.set method
      console.log(obj.cpp[0].java.python);
    };
    return (
      <div className="w-[70vw]">
        <h2 className="text-center">Assembler key</h2>
        <Input
          onDrop={handleOnDrop}
          value={main}
          onDragOver={handleDragOver}
        ></Input>
        <Button onClick={HHHH}>sdfs</Button>
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
                              <p>{fabric.name}</p>
                            ))}
                          </TableCell>
                          <TableCell>
                            {item.Fabric.map((fabric, i) => (
                              <Input
                                className="p-2 m-2"
                                type="text"
                                size="sm"
                                onDrop={(e) =>
                                  handleOnDrop(
                                    e,
                                    `menuGroup[${index}].menuItems[${id}].Fabric[${i}].modelkey`
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
                                type="text"
                                size="sm"
                                value={fabric.version}
                              />
                            ))}
                          </TableCell>
                          <TableCell>
                            {item.Fabric.map((fabric, i) => (
                              <Input
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
        <Button onClick={() => display(Assembles)}>HHHH</Button>
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
