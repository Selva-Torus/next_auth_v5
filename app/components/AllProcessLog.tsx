import React, { useEffect, useState } from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import { Tabs, Tab, Card, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const columns = [
  {
    key: "field",
    label: "Field",
  },
  {
    key: "node",
    label: "Node",
  },
  {
    key: "timestamp",
    label: "Timestamp",
  },
];

const AllProcessLog = ({ data }: any) => {
  const [AllValues, setAllValues] = useState([]);
  const [tabdata, setTabData] = useState({ npc: "", ipc: "", err: "" });
  const [selectedAppDetails, setSelectedAppDetails] = useState({
    tenant: "",
    appGroup: "",
    app: "",
    version: "",
  });
  const [tenant, setTenant] = useState([]);
  const [appGroup, setAppGroup] = useState([]);
  const [Apps, setApps] = useState([]);
  const [versions, setVersions] = useState([]);

  const getData = () => {
    var allKey: any = [];
    for (let i = 0; i < data.length; i++) {
      allKey = [...allKey, data[i].key];
    }
    const unique = allKey.filter((item: any, index: any) => {
      return allKey.indexOf(item) === index;
    });

    allKey = unique;

    var timestamp: any = [];

    for (let i = 0; i < allKey.length; i++) {
      var times: any = [];
      var nodeNames: any = [];
      for (let j = 0; j < data.length; j++) {
        if (allKey[i] == data[j].key) {
          if (data[j].time) times.push(data[j].time);
          if (data[j].nodeName) {
            var ggg = JSON.parse(JSON.stringify(data[j]));
            delete ggg.key;
            delete ggg.time;

            nodeNames.push({ ...ggg });
          }
        }
      }
      timestamp = [...timestamp, { time: times, nodeName: nodeNames }];
    }

    var rearranged: any = [];

    for (let i = 0; i < allKey.length; i++)
      rearranged = [...rearranged, { key: allKey[i], ...timestamp[i] }];

    // console.log(rearranged);
    setAllValues(rearranged);
  };

  const resetedData = (data: any) => {
    var allKey: any = [];
    for (let i = 0; i < data.length; i++) {
      allKey = [...allKey, data[i].key];
    }
    const unique = allKey.filter((item: any, index: any) => {
      return allKey.indexOf(item) === index;
    });

    allKey = unique;

    var timestamp: any = [];

    for (let i = 0; i < allKey.length; i++) {
      var times: any = [];
      var nodeNames: any = [];
      for (let j = 0; j < data.length; j++) {
        if (allKey[i] == data[j].key) {
          if (data[j].time) times.push(data[j].time);
          if (data[j].nodeName) {
            var ggg = JSON.parse(JSON.stringify(data[j]));
            delete ggg.key;
            delete ggg.time;

            nodeNames.push({ ...ggg });
          }
        }
      }
      timestamp = [...timestamp, { time: times, nodeName: nodeNames }];
    }

    var rearranged: any = [];

    for (let i = 0; i < allKey.length; i++)
      rearranged = [...rearranged, { key: allKey[i], ...timestamp[i] }];

    // console.log(rearranged);
    setAllValues(rearranged);
  };

  useEffect(() => {
    getData();

    handleTenant();
  }, []);

  const handleTenant = () => {
    var main: any = [];
    for (let i = 0; i < data.length; i++) {
      main = [...main, data[i].key.split(":")[0]];
    }

    const unique = main.filter((item: any, index: any) => {
      return main.indexOf(item) === index;
    });

    setTenant(unique);
  };

  const handelAppGroup = (appGroupName: any) => {
    var main: any = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].key.split(":")[0] == appGroupName)
        main = [...main, data[i].key.split(":")[1]];
    }

    const unique = main.filter((item: any, index: any) => {
      return main.indexOf(item) === index;
    });

    setAppGroup(unique);
  };

  const handelApps = (appName: any) => {
    var main: any = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].key.split(":")[1] == appName)
        main = [...main, data[i].key.split(":")[2]];
    }

    const unique = main.filter((item: any, index: any) => {
      return main.indexOf(item) === index;
    });

    setApps(unique);
  };

  useEffect(() => {
    if (
      selectedAppDetails.tenant &&
      selectedAppDetails.appGroup &&
      selectedAppDetails.app
    ) {
      var main: any = [];
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].key.startsWith(
            `${selectedAppDetails.tenant}:${selectedAppDetails.appGroup}:${selectedAppDetails.app}`
          )
        )
          main = [...main, data[i]];
      }

      const unique = main.filter((item: any, index: any) => {
        return main.indexOf(item) === index;
      });
      resetedData(unique);
    } else if (selectedAppDetails.tenant && selectedAppDetails.appGroup) {
      var main: any = [];
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].key.startsWith(
            `${selectedAppDetails.tenant}:${selectedAppDetails.appGroup}`
          )
        )
          main = [...main, data[i]];
      }

      const unique = main.filter((item: any, index: any) => {
        return main.indexOf(item) === index;
      });
      resetedData(unique);
    } else if (selectedAppDetails.tenant) {
      var main: any = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].key.startsWith(`${selectedAppDetails.tenant}`))
          main = [...main, data[i]];
      }
      const unique = main.filter((item: any, index: any) => {
        return main.indexOf(item) === index;
      });
      resetedData(unique);
    }
  }, [selectedAppDetails]);
  return (
    <div className="flex w-full bg-white h-full">
      <div className="flex flex-col w-3/4 gap-4">
        <div className="flex justify-between w-4/4 pl-6 pr-6">
          <Dropdown className=" border border-[#20252B]  p-0 ">
            <DropdownTrigger>
              {/* <Button size="lg" variant="bordered">
                {selectedAppDetails.tenant
                  ? selectedAppDetails.tenant
                  : "Select Tenant"}
              </Button> */}
              <Input
                className="w-[200px]"
                key="outside"
                type="button"
                label="Tenant Name"
                value={
                  selectedAppDetails.tenant
                    ? selectedAppDetails.tenant
                    : "Select Tenant"
                }
                labelPlacement="outside"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Link Actions"
              className=" text-white rounded-sm"
              variant="light"
              classNames={{
                base: "bg-[#20252B] border-1 border-black",
              }}
            >
              {tenant.map((item: any, id: any) => (
                <DropdownItem
                  id={id}
                  className=" text-white hover:bg-slate-500"
                  onClick={() => {
                    setSelectedAppDetails({
                      ...selectedAppDetails,
                      tenant: item,
                      appGroup: "",
                      app: "",
                    });
                    handelAppGroup(item);
                  }}
                >
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown className=" border border-[#20252B]  p-0 ">
            <DropdownTrigger>
              {/* <Button size="lg" variant="bordered">
                {selectedAppDetails.appGroup
                  ? selectedAppDetails.appGroup
                  : "Select AppGroup"}
              </Button> */}
              <Input
                className="w-[200px]"
                key="outside"
                type="button"
                label="AppGroup Name"
                value={
                  selectedAppDetails.appGroup
                    ? selectedAppDetails.appGroup
                    : "Select AppGroup"
                }
                labelPlacement="outside"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Link Actions"
              className=" text-white rounded-sm"
              variant="light"
              classNames={{
                base: "bg-[#20252B] border-1 border-black",
              }}
            >
              {appGroup.map((item: any, id: any) => (
                <DropdownItem
                  id={id}
                  className=" text-white hover:bg-slate-500"
                  onClick={() => {
                    setSelectedAppDetails({
                      ...selectedAppDetails,
                      appGroup: item,
                      app: "",
                    });
                    handelApps(item);
                    // handelResetArray();
                  }}
                >
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown className=" border border-[#20252B]  p-0 ">
            <DropdownTrigger>
              {/* <Button size="lg" variant="bordered">
                {selectedAppDetails.app ? selectedAppDetails.app : "Select App"}
              </Button> */}
              <Input
                className="w-[200px]"
                key="outside"
                type="button"
                label="App Name"
                value={
                  selectedAppDetails.app ? selectedAppDetails.app : "Select App"
                }
                labelPlacement="outside"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Link Actions"
              className=" text-white rounded-sm"
              variant="light"
              classNames={{
                base: "bg-[#20252B] border-1 border-black",
              }}
            >
              {Apps.map((item: any, id: any) => (
                <DropdownItem
                  id={id}
                  className=" text-white hover:bg-slate-500"
                  onClick={() => {
                    setSelectedAppDetails({
                      ...selectedAppDetails,
                      app: item,
                    });
                  }}
                >
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Table
          isHeaderSticky
          className="w-full h-full"
          aria-label="Example table with client side sorting"
          classNames={{
            base: "max-h-[510px] overflow-scroll",
            table: "min-h-[410px]",
          }}
        >
          <TableHeader
            columns={columns}
            className="bg-white border-b sticky top-0"
          >
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {AllValues &&
              AllValues.map((item: any, id: any) => (
                <TableRow key={id}>
                  <TableCell className="border px-4 py-2" width={50}>
                    {item.key.split(":").join(": ")}
                  </TableCell>
                  <TableCell className="border px-4 py-2 ">
                    {item.nodeName.map((ele: any, id: any) => (
                      <div
                        key={id}
                        onClick={() => setTabData(ele)}
                        className="hover:underline cursor-pointer"
                      >
                        {ele.nodeName}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="border px-4 py-2">
                    {item.time.map((ele: any, id: any) => (
                      <li key={id}>{ele}</li>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-1/4 flex flex-col">
        <Tabs aria-label="Options" fullWidth size="md">
          <Tab key="NPC" title="NPC">
            <Card>
              <JsonView src={tabdata.npc ?? { data: "No data available" }} />
            </Card>
          </Tab>
          <Tab key="IPC" title="IPC">
            <Card>
              <JsonView src={tabdata.ipc ?? { data: "No data available" }} />
            </Card>
          </Tab>
          <Tab key="ERR" title="ERR">
            <Card>
              <JsonView src={tabdata.err ?? { data: "No data available" }} />
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AllProcessLog;
