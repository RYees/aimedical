/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { BsFillChatLeftFill, BsPeopleFill } from "react-icons/bs";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2"
import { CgFeed } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";

const DynamicHomeIcon = ({ type }) => {
  const Icon = components[type];
  return <Icon size={"20px"}></Icon>;
};

const components = {
  AiFillHome,
  BsPeopleFill,
  BsFillChatLeftFill,
  AiOutlinePlus,
  CgFeed,
  HiMiniChatBubbleLeftRight,
  IoLogOut
};

export default DynamicHomeIcon;
