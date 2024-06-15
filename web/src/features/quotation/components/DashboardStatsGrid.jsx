import useQuotation from "../../../hooks/useQuotation";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { GrDocumentUser } from "react-icons/gr";
import { MdMarkEmailRead } from "react-icons/md";
import StatCard from "./StatCard";

export default function DashboardStatsGrid() {
  const { quotationsData, setFilterQuotationsData } = useQuotation();

  // logic ของ stat ของ dashboard จาก quotationsData
  const totalQuotations = quotationsData.length;
  const completedQuotations = quotationsData.filter(
    (quotation) => quotation.status === "COMPLETED"
  ).length;
  const draftedQuotations = quotationsData.filter(
    (quotation) => quotation.status === "DRAFTED"
  ).length;

  const handleFilter = (status) => {
    if (status === "ALL") {
      setFilterQuotationsData(quotationsData);
    } else {
      setFilterQuotationsData(
        quotationsData.filter((quotation) => quotation.status === status)
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        Icon={HiOutlineDocumentCheck}
        amount={totalQuotations}
        bg="bg-sky-500"
        onClick={() => handleFilter("ALL")}
      >
        Total Quotations
      </StatCard>
      <StatCard
        Icon={MdMarkEmailRead}
        amount={completedQuotations}
        bg="bg-green-500"
        onClick={() => handleFilter("COMPLETED")}
      >
        Completed Quotations
      </StatCard>
      <StatCard
        Icon={GrDocumentUser}
        amount={draftedQuotations}
        bg="bg-yellow-500"
        onClick={() => handleFilter("DRAFTED")}
      >
        Drafted Quotations
      </StatCard>
    </div>
  );
}
