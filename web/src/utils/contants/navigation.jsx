import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";
import { FaUserEdit, FaEdit } from "react-icons/fa";

export const SIDEBAR_LINKS = [
  {
    key: "1",
    label: "Admin",
    to: "/user_management",
    icon: FaUserEdit,
  },
  {
    key: "2",
    label: "User",
    to: "/quotation_management",
    icon: FaEdit,
  },
];

export const SIDEBAR_BOTTOM_LINKS = [
  {
    key: "1",
    label: "Settings",
    to: "/settings",
    icon: HiOutlineCog,
  },
  {
    key: "2",
    label: "Help & Support",
    to: "/support",
    icon: HiOutlineQuestionMarkCircle,
  },
];
