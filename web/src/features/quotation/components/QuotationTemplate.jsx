import PaymentDetails from "./PaymentDetails";
import QuotationHeader from "./QuotationHeader";
import RemarkDetails from "./RemarkDetails";
import RoomDetailsTable from "./RoomDetailsTable";
import SignatureSection from "./SignatureSection";
import "./quotation.css";

function QuotationTemplate() {
  return (
    <div className="max-w-4xl mx-auto p-[34px] bg-white shadow-lg font-sarabun">
      <QuotationHeader />
      <RoomDetailsTable />
      <PaymentDetails />
      <RemarkDetails />
      <SignatureSection />
    </div>
  );
}

export default QuotationTemplate;
