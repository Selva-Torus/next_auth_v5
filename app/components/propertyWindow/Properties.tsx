import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { Accordion, AccordionItem, Tooltip } from "@nextui-org/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/utilsFunctions/Store/store";
import _ from "lodash";
import { createApp, createAppGroup } from "@/app/utilsFunctions/ulits/redisFunctions";
import { toast } from "react-toastify";
import { setAppGroup, setApplicationName, setIsProps } from "@/app/utilsFunctions/Store/Reducers/MainSlice";

const RenderAccordion = ({
  data,
  path,
  handlejs,
  keyJson,
  tooltip,
  setTooltip,
}) => {
  const [handleValue, setHandleValue] = useState(null);

  const [visible, setVisible] = useState(false);

  const handleTooltip = (key) => {
    console.log(key, "path");
    setVisible(true);
    setTooltip(keyJson[key]);
  };

  return (
    <>
      {Object.keys(data).map((key, index) => {
        const currentPath = `${path}.${key}`;
        if (typeof data[key] === "object" && !Array.isArray(data[key])) {
          return (
            <div className="mb-4" key={index}>
              <Accordion
                defaultExpandedKeys={[Object.keys(data)[0]]}
                className={`flex text-base gap-4 px-2 border-none`}
                variant="light"
                onClick={() => console.log(currentPath)}
              >
                <AccordionItem key={key} title={key} textValue="dhd">
                  <>
                    {keyJson && (
                      <Tooltip
                        content={
                          visible ? <RenderTooltip tooltip={tooltip} /> : null
                        }
                      >
                        <div className="flex gap-2 items-center">
                          <span onMouseEnter={() => handleTooltip(currentPath)}>
                            <AiOutlineInfoCircle color="white" />
                          </span>
                        </div>
                      </Tooltip>
                    )}

                    <RenderAccordion
                      data={data[key]}
                      path={currentPath}
                      handlejs={handlejs}
                      keyJson={keyJson}
                      tooltip={tooltip}
                      setTooltip={setTooltip}
                    />
                  </>
                </AccordionItem>
              </Accordion>
            </div>
          );
        } else if (
          Array.isArray(data[key]) &&
          typeof data[key][0] !== "string"
        ) {
          return (
            <div className="">
              <Accordion
                key={key}
                // itemClasses={{ title: "text-white/90" }}
                className={`flex flex-row text-base gap-4 px-2 border-none`}
                variant="light"
              >
                <AccordionItem
                  textValue="dgd"
                  title={
                    <div
                      className="flex items-center justify-between gap-2 my-2"
                      style={{
                        width: "30%",
                      }}
                    >
                      <span
                      // className={
                      //   darkmode
                      //     ? "text-white text-sm font-bold"
                      //     : "text-slate-900 text-sm font-bold "
                      // }
                      >
                        {key}
                      </span>

                      {/* {console.log(key.length, "keylength")} */}

                      {keyJson && keyJson.hasOwnProperty(currentPath) && (
                        <Tooltip
                          content={
                            visible ? <RenderTooltip tooltip={tooltip} /> : null
                          }
                          showArrow
                          placement="right"
                          closeDelay={50}
                          delay={10}
                          motionProps={{
                            variants: {
                              exit: {
                                opacity: 0,

                                transition: {
                                  duration: 0.1,

                                  ease: "easeIn",
                                },
                              },

                              enter: {
                                opacity: 1,

                                transition: {
                                  duration: 0.15,

                                  ease: "easeOut",
                                },
                              },
                            },
                          }}
                          classNames={{
                            base: [
                              "before:bg-neutral-400 dark:before:bg-white width-[300px]",
                            ],

                            content: [
                              "py-2 px-4 shadow-xl",

                              "text-black bg-gradient-to-br from-white to-neutral-600 text-center width-[300px]",
                            ],
                          }}
                        >
                          <div className="flex justify-center items-center">
                            <span
                              onMouseEnter={() => handleTooltip(currentPath)}
                            >
                              <AiOutlineInfoCircle color="black" />
                            </span>
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  }
                  className=""
                >
                  {data[key].map((item, index) => (
                    <div key={index}>
                      <RenderAccordion
                        data={item}
                        path={currentPath + "." + index}
                        handlejs={handlejs}
                        keyJson={keyJson}
                        tooltip={tooltip}
                        setTooltip={setTooltip}
                      />
                    </div>
                  ))}
                </AccordionItem>
              </Accordion>
            </div>
          );
        } else if (
          Array.isArray(data[key]) &&
          typeof data[key][0] === "string"
        ) {
          return (
            <div className="">
              <Accordion
                key={key}
                // itemClasses={{ title: "text-white/90" }}
                className={`flex flex-row text-base gap-4 px-2 border-none `}
                variant="light"
              >
                <AccordionItem
                  textValue="dghs"
                  title={
                    <div
                      className="flex items-center justify-between gap-2 my-2"
                      style={{
                        width: "30%",
                      }}
                    >
                      <span>{key}</span>

                      {console.log(key.length, "keylength")}

                      {keyJson && (
                        <Tooltip
                          content={
                            visible ? <RenderTooltip tooltip={tooltip} /> : null
                          }
                          showArrow
                          placement="right"
                          closeDelay={50}
                          delay={10}
                          motionProps={{
                            variants: {
                              exit: {
                                opacity: 0,

                                transition: {
                                  duration: 0.1,

                                  ease: "easeIn",
                                },
                              },

                              enter: {
                                opacity: 1,

                                transition: {
                                  duration: 0.15,

                                  ease: "easeOut",
                                },
                              },
                            },
                          }}
                          classNames={{
                            base: [
                              "before:bg-neutral-400 dark:before:bg-white width-[300px]",
                            ],

                            content: [
                              "py-2 px-4 shadow-xl",

                              "text-black bg-gradient-to-br from-white to-neutral-600 text-center width-[300px]",
                            ],
                          }}
                        >
                          <div className="flex justify-center items-center">
                            <span
                              onMouseEnter={() => handleTooltip(currentPath)}
                            >
                              <AiOutlineInfoCircle color="black" />
                            </span>
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  }
                  className=""
                >
                  {data[key].map((item, index) => (
                    <div key={index} className="my-2 py-1">
                      <Input
                        isClearable
                        radius="lg"
                        labelPlacement="outside"
                        label={<label>{index}</label>}
                        className="text-gray-700 shadow-md"
                        onValueChange={(e) => {
                          setHandleValue(e as any);
                        }}
                        defaultValue={item}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            console.log(currentPath + "." + index, "string");

                            handlejs(handleValue, currentPath + "." + index);
                          }
                        }}
                      />
                    </div>
                  ))}
                </AccordionItem>
              </Accordion>
            </div>
          );
        } else {
          return (
            <div key={key} className="my-2 py-1">
              <>
                <>
                  <Input
                    isClearable
                    radius="lg"
                    label={<label>{key}</label>}
                    labelPlacement="outside"
                    className="text-gray-700 shadow-md"
                    onValueChange={(e) => {
                      setHandleValue(e as any);
                    }}
                    defaultValue={data[key]}
                    onKeyUp={(e) => {
                      // if (e.key === "Enter") {
                      handlejs(handleValue, currentPath);
                      // }
                    }}
                  />
                </>
              </>
            </div>
          );
        }
      })}
    </>
  );
};

const RenderTooltip = ({ tooltip }) => {
  return (
    <div>
      {tooltip &&
        Object.keys(tooltip).map((key, index) => {
          return (
            <div className="px-2 py-2 bg-[D9DEE8]" key={index}>
              <div className="text-small font-bold p-0">{key}:</div>
              <div className="text-tiny p-0">{tooltip[key]}</div>
            </div>
          );
        })}
    </div>
  );
};

const AccordianWindow = ({}) => {
  const PropsJson = useSelector((state: RootState) => state.main.PropsJson);
  const appGroup = useSelector((state: RootState) => state.main.appGroup);
  const dispatch = useDispatch();
  const isAppOrGroup = useSelector(
    (state: RootState) => state.main.isAppOrGroup
  );
  const [value, setValue] = useState(null);

  const [keyJson, setKeyJson] = useState({});

  const [dupjson, setDupjson] = useState(PropsJson);

  const [tooltip, setTooltip] = useState(null);

  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   setDupjson(structuredClone(sideBarData));

  //   setKeyJson(structuredClone(helperJson));
  // }, [sideBarData, helperJson]);

  // const handleChange = (e) => {
  //   setValue(e);
  // };

  const handlejs = (e, i) => {
    console.log(e, i, "render");

    if (i) {
      const js = structuredClone(dupjson);

      _.set(js as any, i, e);

      setDupjson(js);

      // setSidebarData(js);

      console.log(js, "renderjs");
    }
  };

  const handleTooltip = (key) => {
    console.log(key, "path");

    setVisible(true);

    setTooltip(keyJson[key]);
  };
  // useEffect(() => {
  //   setDupjson(PropsJson);
  //   console.log(appGroup);
  // }, [appGroup]);

  const postAllApplicationGroup = async (tenant , group) => {
    try {
      console.log(group);
      
      if (group) {
        const newGroup = await fetch(
          `http://192.168.2.110:3002/vpt/appGroupCreate?tenant=${tenant}&appGroup=${group}`,
          {
            method: "POST",
          }
        ).then((res) => {
          dispatch(setAppGroup(group));
          res.json();
          dispatch(setIsProps())
          toast.success('New AppGroup created')
        });
      } else {
        toast.error("Invalid AppGroup Credentials, Please check");
      }
    } catch (error) {
      toast.error("Invalid AppGroup Credentials, Please check AppGroup Name is already exist");

      throw error;
    }
  };

  const postAllApplication = async (tenant , localApp) => {
    try {
      if (appGroup && localApp) {
        const newApp = await fetch(
          `http://192.168.2.110:3002/vpt/applicationCreate?tenant=GSS-DEV&appGroup=${appGroup}&applicationName=${localApp}`,
          {
            method: "POST",
          }
        ).then((res) => {
          dispatch(setApplicationName(localApp));
          res.json();
          dispatch(setIsProps())
          toast.success("New Application created successfully")
        });
      } else {
        toast.error(
          "Please enter valid Application Name and corresponding AppGroup"
        );
      }
    } catch (error) {
      toast.error(
        "Please enter valid Application Name and corresponding AppGroup"
      );
      throw error;
    }
  };


  const handleFunctions = async() => {
    if(isAppOrGroup.group){
    const res =await createAppGroup(JSON.stringify(dupjson) , localStorage.getItem('tenant'));
      if(res?.data){
        await postAllApplicationGroup(localStorage.getItem('tenant') , res.data)
      }
    }else if(isAppOrGroup.app){
      console.log(dupjson , "app");
      const res = await createApp(JSON.stringify(dupjson) , localStorage.getItem('tenant') , appGroup);
      if(res?.data){
        await postAllApplication(localStorage.getItem('tenant') , res.data)
      }      
    }
  }

  return (
    <div className="w-[30%] h-full border">
      {PropsJson && (
        <>
          <div className="flex flex-col gap-2 p-3 w-[100%] border-none h-[90%] overflow-scroll scrollbar-hide text-white  dark:bg-orange-400">
            {Object.keys(PropsJson).map((key, index) => (
              <>
                {typeof PropsJson[key] === "object" ? (
                  <Accordion
                    defaultExpandedKeys={[Object.keys(PropsJson)[0]]}
                    key={index}
                    // itemClasses={{
                    //   title: "text-white/90 px-2 border-none",
                    // }}
                    className={`flex flex-col text-basegap-4 h-[60%] px-2 border-none`}
                    variant="bordered"
                  >
                    <AccordionItem
                      textValue="dd"
                      key={key}
                      className=""
                      title={
                        <div
                          className="flex items-center justify-between gap-2 my-2 "
                          style={{
                            width: "30%",
                          }}
                        >
                          <span>{key}</span>

                          {keyJson && keyJson.hasOwnProperty(key) && (
                            <Tooltip
                              content={
                                visible ? (
                                  <>
                                    <RenderTooltip tooltip={tooltip} />
                                  </>
                                ) : null
                              }
                              motionProps={{
                                variants: {
                                  exit: {
                                    opacity: 0,

                                    transition: {
                                      duration: 0.1,

                                      ease: "easeIn",
                                    },
                                  },

                                  enter: {
                                    opacity: 1,

                                    transition: {
                                      duration: 0.15,

                                      ease: "easeOut",
                                    },
                                  },
                                },
                              }}
                              showArrow
                              placement="right"
                              closeDelay={50}
                              delay={10}
                              classNames={{
                                base: [
                                  "before:bg-neutral-400 dark:before:bg-white width-[300px]",
                                ],

                                content: [
                                  "py-2 px-4 shadow-xl w-[300px] max-h-[450px] ",

                                  "text-white ",
                                ],
                              }}
                            >
                              <div className="flex gap-2 items-center">
                                <span onMouseEnter={() => handleTooltip(key)}>
                                  <AiOutlineInfoCircle color="black" />
                                </span>
                              </div>
                            </Tooltip>
                          )}
                        </div>
                      }
                    >
                      {typeof PropsJson[key] === "object" && (
                        <RenderAccordion
                          data={PropsJson[key]}
                          path={key}
                          handlejs={handlejs}
                          keyJson={keyJson}
                          tooltip={tooltip}
                          setTooltip={setTooltip}
                        />
                      )}
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <>
                    <div className=" " key={index}>
                      <div className="flex  gap-2 items-center mb-2">
                        {key}

                        {keyJson && keyJson.hasOwnProperty(key) && (
                          <Tooltip
                            content={
                              visible ? (
                                <>
                                  <RenderTooltip tooltip={tooltip} />
                                </>
                              ) : null
                            }
                            motionProps={{
                              variants: {
                                exit: {
                                  opacity: 0,

                                  transition: {
                                    duration: 0.1,

                                    ease: "easeIn",
                                  },
                                },

                                enter: {
                                  opacity: 1,

                                  transition: {
                                    duration: 0.15,

                                    ease: "easeOut",
                                  },
                                },
                              },
                            }}
                            showArrow
                            placement="right"
                            closeDelay={50}
                            delay={10}
                            classNames={{
                              base: [
                                "before:bg-neutral-400 dark:before:bg-white width-[300px]",
                              ],

                              content: [
                                "py-2 px-4 shadow-xl w-[300px] max-h-[450px] ",

                                "text-black ",
                              ],
                            }}
                          >
                            <span onMouseEnter={() => handleTooltip(key)}>
                              <AiOutlineInfoCircle color="white" />
                            </span>
                          </Tooltip>
                        )}
                      </div>

                      <Input
                        isClearable
                        labelPlacement="outside"
                        radius="lg"
                        className="text-gray-700 shadow-md"
                        onValueChange={(e) => {
                          // handleChange(e);
                        }}
                        defaultValue={PropsJson[key]}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            handlejs(value, key);
                          }
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
          <Button color="primary" className="w-full mt-3" onClick={handleFunctions}>
            Save changes
          </Button>
        </>
      )}
    </div>
  );
};

export default AccordianWindow;
