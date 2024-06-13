import { createContext, useState } from "react";
import { getDateFormat } from "../utils/date-format";

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
  approveEmail: "",
};

export default function QuotationContextProvider({ children }) {
  const [quotationData, setQuotationData] = useState(initialQuotationData);

  const [quotationDataError, setQuotationDataError] = useState(
    initialQuotationDataError
  );

  const [isQuotationDataLoading, setIsQuotationDataLoading] = useState(true);

  const context = {
    quotationData,
    setQuotationData,
    quotationDataError,
    setQuotationDataError,
    isQuotationDataLoading,
  };
  return (
    <QuotationContext.Provider value={context}>
      {children}
    </QuotationContext.Provider>
  );
}
