import { Link } from "react-router-dom";

export function SidebarItem({ active, Icon, to, label }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 font-light px-3 py-2 hover:no-underline rounded-lg text-base ${
        active ? " bg-ifcg-black-low" : "hover:bg-ifcg-black-low"
      }`}
    >
      <Icon
        className={`text-xl ${
          active ? "fill-ifcg-black-high" : "fill-gray-500"
        }`}
      />
      <span>{label}</span>
    </Link>
  );
}
