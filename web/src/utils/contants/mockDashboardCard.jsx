import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { GrDocumentUser } from "react-icons/gr";
import { MdMarkEmailRead } from "react-icons/md";

export const mockDashboardCard = [
  {
    key: "1",
    label: "Total",
    to: "/quotation_management/:userId/total",
    icon: HiOutlineDocumentCheck,
    amount: 127,
    cardBgColor: "bg-sky-500",
  },
  {
    key: "2",
    label: "Drafted",
    to: "/quotation_management/:userId/drafted",
    icon: GrDocumentUser,
    amount: 77,
    cardBgColor: "bg-yellow-500",
  },
  {
    key: "3",
    label: "Completed",
    to: "/quotation_management/:userId/completed",
    icon: MdMarkEmailRead,
    amount: 50,
    cardBgColor: "bg-green-500",
  },
];
