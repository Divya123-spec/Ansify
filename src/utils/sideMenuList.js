import React from "react";
import {
  AiFillHome,
  AiOutlineUserSwitch,
  AiFillStar,
  AiFillSetting,
} from "react-icons/ai";
import { RiHashtag } from "react-icons/ri";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { MdContactSupport } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { FaCrown, FaUsers } from "react-icons/fa";

export const menuItems = [
  {
    path: "/",
    name: "Home",
    icon: <AiFillHome className="icon" />,
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    icon: <FaCrown className="icon" />,
  },
  {
    path: "/tags",
    name: "Tags",
    icon: <RiHashtag className="icon" />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <FaUsers className="icon" />,
  },
  {
    path: "/bookmarked",
    name: "Bookmarked Qs.",
    icon: <BsFillBookmarkStarFill className="icon" />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <AiFillSetting className="icon" />,
  },
  {
    path: "/support",
    name: "Support",
    icon: <MdContactSupport className="icon" />,
  },
  // {
  //   path: "/user-info",
  //   name: "User Info",
  //   icon: <ImUser className="icon" />,
  // },
];
