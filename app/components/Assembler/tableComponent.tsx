import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

const TableComponent = ({ menuGroup, sub }) => {
  if (menuGroup && menuGroup.length > 0) {
    const commonKeys = Object.keys(menuGroup[0]?.["mi1"]);

    return (
      <Table>
        <TableHeader>
          {commonKeys.map((key, index) => (
            <TableColumn key={index}>{key}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {menuGroup.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {commonKeys.map((key, cellIndex) => (
                <TableCell key={cellIndex}>
                  {Array.isArray(item[`mi${rowIndex + 1}`][key])
                    ? item[`mi${rowIndex + 1}`][key].map((roles) => (
                        <div>roles</div>
                      ))
                    : Object.entries(item[`mi${rowIndex + 1}`][key]).map(
                        ([x, y]: any) => (
                          <div>
                            {x} : {y ? y : ""}
                          </div>
                        )
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return <>No data available</>;
  }
};

export default TableComponent;
