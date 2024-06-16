import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainContainer() {
  return (
    <>
      <div className="flex flex-row bg-neutral-100 h-screen w-screen">
        <Sidebar />
        <div className="p-4 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
