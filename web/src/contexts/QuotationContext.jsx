import { createContext, useEffect, useState } from "react";
import { getDateFormat } from "../utils/date-format";
import { axiosError } from "../utils/axios-error";
import quotationApi from "../apis/quotation";
import { useParams } from "react-router-dom";

export const QuotationContext = createContext();

const initialQuotationData = {
  createdAt: getDateFormat(new Date()),
  customerFirstName: "",
  customerLastName: "",
  customerMobile: "",
  customerEmail: "",
  projectName: "",
  roomNo: "",
  roomFloor: "",
  roomType: "",
  roomSize: "",
  roomPrice: "",
  roomDiscount: "",
  bookingPayment: "",
  downPayment: "",
  commonFee: "",
  sinkingFund: "",
};

const initialQuotationDataError = {
  customerFirstName: "",
  customerLastName: "",
  customerMobile: "",
  customerEmail: "",
  projectName: "",
  roomNo: "",
  roomFloor: "",
  roomType: "",
  roomSize: "",
  roomPrice: "",
  roomDiscount: "",
  bookingPayment: "",
  downPayment: "",
  commonFee: "",
  sinkingFund: "",
};

export default function QuotationContextProvider({ children }) {
  const [quotationData, setQuotationData] = useState(initialQuotationData);

  const [quotationDataError, setQuotationDataError] = useState(
    initialQuotationDataError
  );

  const [quotationsData, setQuotationsData] = useState([]);

  const [filterQuotationsData, setFilterQuotationsData] =
    useState(quotationsData);

  const [isQuotationsDataLoading, setIsQuotationsDataLoading] = useState(true);

  const [isQuotationDataLoading, setIsQuotationDataLoading] = useState(true);

  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { id } = useParams();

  const fetchQuotations = async () => {
    try {
      const res = await quotationApi.getAllQuotations();
      setQuotationsData(res.data.quotations);
      setFilterQuotationsData(res.data.quotations);
    } catch (error) {
      axiosError(error);
    } finally {
      setIsQuotationsDataLoading(false);
    }
  };

  useEffect(() => {
    const fetchQuotation = async () => {
      if (id) {
        try {
          const res = await quotationApi.getQuotationById(id);
          setQuotationData(res.data);
        } catch (error) {
          axiosError(error);
        } finally {
          setIsQuotationDataLoading(false);
        }
      }
    };
    fetchQuotation();
  }, [id]);

  const resetQuotationData = () => {
    setQuotationData(initialQuotationData);
    setQuotationDataError({});
  };

  const updateQuotationStatus = async (quotationId, newStatus) => {
    try {
      await quotationApi.updateStatus(quotationId, newStatus);
      setQuotationsData((prev) =>
        prev.map((quotation) =>
          quotation.id === quotationId
            ? { ...quotation, status: newStatus }
            : quotation
        )
      );

      setFilterQuotationsData((prev) =>
        prev.map((quotation) =>
          quotation.id === quotationId
            ? { ...quotation, status: newStatus }
            : quotation
        )
      );
    } catch (error) {
      axiosError(error);
    }
  };

  const context = {
    quotationData,
    setQuotationData,
    quotationDataError,
    setQuotationDataError,
    isQuotationsDataLoading,
    isQuotationDataLoading,
    resetQuotationData,
    quotationsData,
    setQuotationsData,
    updateQuotationStatus,
    filterQuotationsData,
    setFilterQuotationsData,
    fetchQuotations,
    setIsQuotationDataLoading,
    isEdit,
    setIsEdit,
    isCreate,
    setIsCreate,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };
  return (
    <QuotationContext.Provider value={context}>
      {children}
    </QuotationContext.Provider>
  );
}
