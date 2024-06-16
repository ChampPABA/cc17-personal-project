import { useEffect, useState } from "react";
import DashboardStatsGrid from "../features/quotation/components/DashboardStatsGrid";
import QuaotationTable from "../features/quotation/components/QuaotationTable";
import useQuotation from "../hooks/useQuotation";
import Header from "../layouts/Header";
import { getDateFormat } from "../utils/date-format";

export default function QuotationManagement() {
  const {
    fetchQuotations,
    filterQuotationsData,
    setFilterQuotationsData,
    quotationsData,
  } = useQuotation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilterQuotationsData(quotationsData);
    } else {
      setFilterQuotationsData(
        quotationsData.filter((quotation) => {
          const formattedDate = getDateFormat(quotation.createdAt);
          return (
            quotation.customerFirstName.toLowerCase().includes(query) ||
            quotation.customerLastName.toLowerCase().includes(query) ||
            quotation.projectName.toLowerCase().includes(query) ||
            quotation.roomNo.toLowerCase().includes(query) ||
            quotation.status.toLowerCase().includes(query) ||
            formattedDate.includes(query)
          );
        })
      );
    }
  };
  return (
    <div className="flex flex-col">
      <Header onSearch={handleSearch} />
      <DashboardStatsGrid />
      <QuaotationTable />
    </div>
  );
}
