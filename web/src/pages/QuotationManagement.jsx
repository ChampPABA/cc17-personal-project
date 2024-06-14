import { useEffect, useState } from "react";
import DashboardStatsGrid from "../features/quotation/components/DashboardStatsGrid";
import QuaotationTable from "../features/quotation/components/QuaotationTable";
import quotationApi from "../apis/quotation";
import { axiosError } from "../utils/axios-error";

export default function QuotationManagement() {
  const [quotations, setQuotations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const res = await quotationApi.getAllQuotations();
        setQuotations(res.data.quotations);
      } catch (error) {
        console.log(error);
        axiosError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotations();
  }, []);
  return (
    <div className="flex flex-col">
      <DashboardStatsGrid quotations={quotations} />
      <QuaotationTable quotations={quotations} isLoading={isLoading} />
    </div>
  );
}
