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
import { IoSearchCircleOutline } from "react-icons/io5";
import { set } from "react-hook-form";

const columns = [
  {
    key: "id",
    label: "Id",
  },
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
  const [mainData, setMainData] = useState<any[]>([]);
  const [AllValues, setAllValues] = useState<any[]>([]);
  const [tabdata, setTabData] = useState({ npc: "", ipc: "", err: "" });

  const [selectedAppDetails, setSelectedAppDetails] = useState({
    artifact: "",
    version: "",
  });
  const [tenant, setTenant] = useState([]);
  const [appGroup, setAppGroup] = useState([]);
  const [Apps, setApps] = useState([]);
  const [versions, setVersions] = useState([]);
  const [artifact, setArtifact] = useState([]);
  const [SearchValue, setSearchValue] = useState("");
  const [SearchData, setSearchData] = useState<any[]>([]);

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

    var filter: any = [];

    for (let i = 0; i < rearranged.length; i++) {
      if (rearranged[i].key.startsWith("GSS-DEV:")) {
        filter = [...filter, rearranged[i]];
      }
    }

    setAllValues(filter);
    setMainData(filter);

    var main: any = [];
    for (let i = 0; i < filter.length; i++) {
      main = [...main, filter[i].key.split(":")[4]];
    }

    const filteredData = main.filter((item: any, index: any) => {
      return main.indexOf(item) === index;
    });

    setArtifact(filteredData);

    const updatedOptions = filter.map((option: any) => {
      return { ...option, value: option.key, label: option.key };
    });

    setSearchData(updatedOptions);
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

    var filter: any = [];

    for (let i = 0; i < rearranged.length; i++) {
      if (rearranged[i].key.startsWith("GSS-DEV:")) {
        filter = [...filter, rearranged[i]];
      }
    }
    setAllValues(filter);
  };

  useEffect(() => {
    getData();
  }, []);

  const handelVersion = (artifact: any) => {
    var main: any = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].key.split(":")[4] == artifact)
        main = [...main, data[i].key.split(":")[5]];
    }

    const unique = main.filter((item: any, index: any) => {
      return main.indexOf(item) === index;
    });

    setVersions(unique);
  };

  useEffect(() => {
    if (selectedAppDetails.artifact && selectedAppDetails.version) {
      var main: any = [];
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].key.includes(
            `:${selectedAppDetails.artifact}:${selectedAppDetails.version}:`
          )
        )
          main = [...main, data[i]];
      }

      const unique = main.filter((item: any, index: any) => {
        return main.indexOf(item) === index;
      });
      resetedData(unique);
    } else if (selectedAppDetails.artifact) {
      var main: any = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].key.includes(`:${selectedAppDetails.artifact}:`))
          main = [...main, data[i]];
      }

      const unique = main.filter((item: any, index: any) => {
        return main.indexOf(item) === index;
      });
      resetedData(unique);
    }
  }, [selectedAppDetails]);

  const handleSearch = (e: any) => {
    const value = e.target.value;
    var main: any = [];
    for (let i = 0; i < SearchData.length; i++) {
      if (SearchData[i].key.includes(value)) {
        main = [...main, SearchData[i]];
      }
    }
    console.log(main);
  };
  const [searchedValues, setSearchedValues] = useState<any[]>([]);

  const handleSearchData = (e: any) => {
    setSearchValue(e.target.value);

    var main: any = [];
    for (let i = 0; i < mainData.length; i++) {
      if (mainData[i].key.includes(e.target.value)) {
        main = [...main, SearchData[i]];
      }
    }

    setAllValues(main);
  };

  // useEffect(() => {
  //   var main: any = [];
  //   for (let i = 0; i < mainData.length; i++) {
  //     if (mainData[i].key.includes(SearchValue)) {
  //       main = [...main, SearchData[i]];
  //     }
  //   }

  //   setAllValues(main);
  // }, [SearchValue]);

  return (
    <div className="flex w-full bg-white h-full mt-2">
      <div className="flex flex-col w-3/4 gap-4">
        <h2 className="font-bold text-xl text-center p-2 border-b">
          Process Log Details
        </h2>
        <div className="flex justify-between w-4/4 px-5">
          <div>
            <Input
              size="sm"
              label="Search"
              // isClearable
              radius="lg"
              onChange={handleSearchData}
              value={SearchValue}
              // onClear={() => setSearchValue("")}
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
          </div>
          <div className="flex gap-4">
            <Dropdown className=" border border-[#20252B]  p-0 ">
              <DropdownTrigger>
                <Input
                  size="md"
                  className="w-[200px]"
                  color={selectedAppDetails.artifact ? "primary" : "default"}
                  type="button"
                  value={
                    selectedAppDetails.artifact
                      ? selectedAppDetails.artifact
                      : "Select Artifact"
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Link Actions">
                {artifact.map((item: any, id: any) => (
                  <DropdownItem
                    id={id}
                    onClick={() => {
                      setSelectedAppDetails({
                        ...selectedAppDetails,
                        artifact: item,
                        version: "",
                      });
                      handelVersion(item);
                    }}
                  >
                    {item}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown className=" border border-[#20252B]  p-0 ">
              <DropdownTrigger>
                <Input
                  size="md"
                  className="w-[200px]"
                  type="button"
                  color={selectedAppDetails.artifact ? "primary" : "default"}
                  value={
                    selectedAppDetails.version
                      ? selectedAppDetails.version
                      : "Select Version"
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Link Actions">
                {versions.map((item: any, id: any) => (
                  <DropdownItem
                    id={id}
                    onClick={() => {
                      setSelectedAppDetails({
                        ...selectedAppDetails,
                        version: item,
                      });
                    }}
                  >
                    {item}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
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
                  <TableCell className="border px-4 py-2" width={10}>
                    {id + 1}
                  </TableCell>
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
