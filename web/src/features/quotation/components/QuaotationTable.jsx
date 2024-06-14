import { Link, useNavigate } from "react-router-dom";
import { QuotationStatus } from "../../../utils/contants/quotation-status";
import { getDateFormat } from "../../../utils/date-format";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { PiPrinterLight } from "react-icons/pi";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import QuotationTemplate from "./QuotationTemplate";
import useQuotation from "../../../hooks/useQuotation";

function QuaotationTable({ quotations, isLoading }) {
  const navigate = useNavigate();
  const componentRef = useRef();
  const { setQuotationData, resetQuotationData } = useQuotation();

  const handleCreateQuotation = () => {
    resetQuotationData();
    navigate("/quotation/");
  };

  const handlePrintAction = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = async (quotation) => {
    await setQuotationData(quotation);
    handlePrintAction();
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gay-200 flex1">
      <div className="flex justify-between items-center">
        <strong className="text-gray-700 font-medium">Quotations</strong>
        <div>
          <Button bg="green" onClick={handleCreateQuotation}>
            Create Quotation
          </Button>
        </div>
      </div>
      <div className="mt-3 overflow-auto max-h-[calc(100vh-256px)]">
        {isLoading && <Loading />}
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead className="sticky top-0">
            <tr>
              <td>No.</td>
              <td>Customer</td>
              <td>Date</td>
              <td>Project Name</td>
              <td>Unit Number</td>
              <td>Status</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quotation) => (
              <tr key={quotation.id}>
                <td role="button" className="hover:text-ifcg-red-low">
                  <Link to={`/quotation/${quotation.id}`}>#{quotation.id}</Link>
                </td>
                <td>
                  {quotation.customerFirstName} {quotation.customerLastName}
                </td>
                <td>{getDateFormat(quotation.createdAt)}</td>
                <td>{quotation.projectName}</td>
                <td>{quotation.roomNo}</td>
                <td>{QuotationStatus(quotation.status)}</td>
                <td className="flex justify-center items-center gap-4 text-2xl">
                  <div className="w-10 h-10 flex justify-center items-center rounded-full bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer">
                    <CiEdit />
                  </div>
                  <div className="w-10 h-10 flex justify-center items-center rounded-full bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer">
                    <MdOutlineDeleteSweep />
                  </div>
                  {quotation.status === "COMPLETED" && (
                    <div
                      className="w-10 h-10 flex justify-center items-center rounded-full bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer"
                      onClick={() => handlePrint(quotation)}
                    >
                      <PiPrinterLight />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "none" }}>
        <QuotationTemplate ref={componentRef} />
      </div>
    </div>
  );
}

export default QuaotationTable;
