import { useEffect } from "react";
import DashboardStatsGrid from "../features/quotation/components/DashboardStatsGrid";
import QuaotationTable from "../features/quotation/components/QuaotationTable";
import useQuotation from "../hooks/useQuotation";

export default function QuotationManagement() {
  const { fetchQuotations } = useQuotation();

  useEffect(() => {
    fetchQuotations();
  }, []);

  return (
    <div className="flex flex-col">
      <DashboardStatsGrid />
      <QuaotationTable />
    </div>
  );
}
