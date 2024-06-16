import Input from "../components/Input";
import Dropdown from "./Dropdown";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";

export default function Header({ onSearch }) {
  return (
    <header className="grid grid-cols-2 bg-white shadow px-4 items-center mb-4">
      <div className="flex items-center">
        <div>
          <HiOutlineSearch fontSize={20} className="text-ifcg-black-low" />
        </div>
        <div>
          <Input placeholder="Search..." onChange={onSearch} />
        </div>
      </div>

      <div className="justify-self-end h-[48px] flex items-center gap-2">
        <div className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-ifcg-gray-low cursor-pointer">
          <HiOutlineChatAlt fontSize={24} />
        </div>
        <div className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-ifcg-gray-low cursor-pointer">
          <HiOutlineBell fontSize={24} />
        </div>
        <Dropdown />
      </div>
    </header>
  );
}
