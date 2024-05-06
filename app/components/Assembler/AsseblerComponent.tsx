import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { AssemblerJson } from "@/app/utilsFunctions/ulits/Torus9x_AssemblerKey";
import TableComponent from "./tableComponent";

const AssemblerComponent = () => {
  if (
    AssemblerJson &&
    typeof AssemblerJson === "object" &&
    AssemblerJson.menuGroup &&
    AssemblerJson.menuGroup.length > 0
  ) {
    return (
      <div className="w-[70vw]">
        <h2 className="text-center">Assembler key</h2>
        <Tabs
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
        </Tabs>
      </div>
    );
  } else {
    return <>No data available</>;
  }
};

export default AssemblerComponent;
