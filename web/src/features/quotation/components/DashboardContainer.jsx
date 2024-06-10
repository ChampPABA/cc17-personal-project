import { Link } from "react-router-dom";

export default function DashboardContainer({ children, Icon, to, amount, bg }) {
  return (
    <Link to={to} className="w-full">
      <div className="bg-white rounded-sm p-4 border border-ifcg-gray-low flex flex-1 items-center mb-4 w-full">
        <div
          className={`rounded-full h-12 w-12 flex items-center justify-center ${bg}`}
        >
          <Icon className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">{children}</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {amount}
            </strong>
          </div>
        </div>
      </div>
    </Link>
  );
}
