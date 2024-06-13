import { useContext } from "react";
import { QuotationContext } from "../contexts/QuotationContext";

export default function useQuotation() {
  return useContext(QuotationContext);
}
