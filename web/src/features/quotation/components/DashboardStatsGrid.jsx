import DashboardContainer from "./DashboardContainer";
import { HiOutlineDocumentCheck } from "react-icons/hi2";

export default function DashboardStatsGrid() {
  return (
    <div className="flex gap-4 w-full">
      <DashboardContainer>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <HiOutlineDocumentCheck className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">50</strong>
            <span className="text-sm text-green-500 pl-2">อัน</span>
          </div>
        </div>
      </DashboardContainer>
      <DashboardContainer>
        {" "}
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <HiOutlineDocumentCheck className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Drafted</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">50</strong>
            <span className="text-sm text-green-500 pl-2">อัน</span>
          </div>
        </div>
      </DashboardContainer>
      <DashboardContainer>
        {" "}
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <HiOutlineDocumentCheck className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Completed</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">50</strong>
            <span className="text-sm text-green-500 pl-2">อัน</span>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
}
