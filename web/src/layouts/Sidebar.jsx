import { useLocation, useNavigate } from "react-router-dom";
import {
  SIDEBAR_BOTTOM_LINKS,
  SIDEBAR_LINKS,
} from "../utils/contants/navigation";
import { SidebarItem } from "./SidebarItem";
import { HiOutlineLogout } from "react-icons/hi";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { logout, authUser } = useAuth();

  const handleClickLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logout Successfully");
  };

  return (
    <aside className="flex flex-col w-80 p-3 bg-ifcg-red-high text-ifcg-white">
      <div className="flex items-center gap-2 px-1 py-4">
        <div className=" bg-ifcg-gray-low rounded-lg">
          <img src="../../assets/ifcg_logo.png" alt="company logo" />
        </div>
      </div>
      <div className="py-4 border-t border-ifcg-gray-low">
        <p className="font-semibold">
          {authUser?.firstName} {authUser?.lastName}
        </p>
        <small className="lowercase">{authUser?.userRoles.join(", ")}</small>
      </div>
      <div className="flex-1 py-4 flex flex-col gap-0.5 border-t border-ifcg-gray-low">
        {SIDEBAR_LINKS.map((el) => (
          <SidebarItem
            key={el.key}
            Icon={el.icon}
            to={el.to}
            label={el.label}
            active={pathname === el.to}
          />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-ifcg-gray-low">
        {SIDEBAR_BOTTOM_LINKS.map((el) => (
          <SidebarItem
            key={el.key}
            Icon={el.icon}
            to={el.to}
            label={el.label}
            active={pathname === el.to}
          />
        ))}
        <div
          role="button"
          className="flex items-center gap-2 font-light px-3 py-2 hover:no-underline rounded-lg text-base hover:bg-ifcg-black-high bg-ifcg-black-low"
          onClick={handleClickLogout}
        >
          <HiOutlineLogout className="text-xl" />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}
