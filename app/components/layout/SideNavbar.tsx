"use client";

import React from "react";
import { LuListTree } from "react-icons/lu";
import { FaRegNewspaper } from "react-icons/fa6";

import { LiaElementor } from "react-icons/lia";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

const Icons = [
  {
    id: 0,
    icon: LiaElementor,
    tooltip: "UF",
  },
  {
    id: 1,
    icon: LuListTree,
    tooltip: "DF",
  },
  {
    id: 2,
    icon: FaRegNewspaper,
    tooltip: "PF",
  },
  {
    id: 3,
    icon: FaRegNewspaper

  },
  {
    id: 4,
    icon:LuListTree

  },
  {
    id: 5,
    icon: LiaElementor

  }
];

export default function SideNav() {
  return (
    <div className="h-full">
      <Listbox
        variant="faded"
        aria-label="Listbox menu with icons"
        className="flex flex-col justify-between gap-9 h-full bg-slate-100 pt-2 dark:bg-gray-700"
      >
        {Icons.map((item: any) => (
          <ListboxItem textValue={item.tooltip} key={item.id}>
            <Tooltip content={item.tooltip} key={item.id} placement="right-end">
            <div>
              {React.createElement(item.icon, {
                size: 20,
              })}
            </div>
            </Tooltip>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
}
