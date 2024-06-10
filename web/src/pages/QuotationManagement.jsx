import DashboardStatsGrid from "../features/quotation/components/DashboardStatsGrid";
import QuaotationTable from "../features/quotation/components/QuaotationTable";

export default function QuotationManagement() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <QuaotationTable />
    </div>
  );
}
