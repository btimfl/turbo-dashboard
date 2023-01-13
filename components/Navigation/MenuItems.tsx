import { Icon } from "@chakra-ui/react";
import {
  FaChartBar,
  FaUserAlt,
} from "react-icons/fa";
import { TbReport } from "react-icons/tb";

export const MENU_ITEMS = [
  {
    icon: <Icon as={FaChartBar}></Icon>,
    title: "Dashboard",
    children: [],
    path: "/dashboard",
  },
  {
    icon: <Icon as={TbReport}></Icon>,
    title: "Reports",
    children: [],
    path: "/reports",
  },
  {
    icon: <Icon as={FaUserAlt}></Icon>,
    title: "User Management",
    children: [
      {
        title: "Users",
        path: "",
      },
      {
        title: "Add User",
        path: "/add",
      },
    ],
    path: "/users",
  },
];
