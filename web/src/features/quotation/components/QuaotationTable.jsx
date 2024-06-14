import { useNavigate } from "react-router-dom";
import QuotationStatus from "../../../utils/contants/quotation-status";
import { getDateFormat } from "../../../utils/date-format";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { PiPrinterLight } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import { AiOutlineLink } from "react-icons/ai";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import QuotationTemplate from "./QuotationTemplate";
import useQuotation from "../../../hooks/useQuotation";
import { toast } from "sonner";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import { axiosError } from "../../../utils/axios-error";
import quotationApi from "../../../apis/quotation";

function QuaotationTable({ quotations, isLoading }) {
  const navigate = useNavigate();
  const componentRef = useRef();
  const { setQuotationData, resetQuotationData } = useQuotation();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [email, setEmail] = useState("");
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setnewStatus] = useState("");

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

  const handleSendEmail = (quotation) => {
    setSelectedQuotation(quotation);
    setEmailModalOpen(true);
  };

  const handleCopyLink = (pdfLink) => {
    navigator.clipboard.writeText(pdfLink);
    toast.success("Quotation Link Copied");
  };

  const handleEdit = async (quotation) => {
    await setQuotationData(quotation);
    navigate(`quotation/${quotation.id}`);
  };

  const handleDelete = (quotation) => {
    // รอเขียน Logic
  };

  const sendEmail = () => {
    // รอเขียน Logic ส่ง email ด้วย selectedQuotation.pdfLink แล้วก็ email
    setEmailModalOpen(false);
    toast.success("Email Sent Succesfully");
  };

  const handleStatusChange = (quotation, status) => {
    setSelectedQuotation(quotation);
    setnewStatus(status);
    setStatusModalOpen(true);
  };

  const changeStatus = async () => {
    try {
      await quotationApi.updateStatus(selectedQuotation.id, newStatus);
      // อัปเดตสถานะใน quotations array เพื่อแสดงผลทันทีบน UI
      const updatedQuotations = quotations.map((quotation) =>
        quotation.id === selectedQuotation.id
          ? { ...quotation, status: newStatus }
          : quotation
      );
      setStatusModalOpen(false);
      toast.success("Status Updated Successfully");
    } catch (error) {
      axiosError(error);
    }
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
              <td>Id</td>
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
                <td>{quotation.id}</td>
                <td>
                  {quotation.customerFirstName} {quotation.customerLastName}
                </td>
                <td>{getDateFormat(quotation.createdAt)}</td>
                <td>{quotation.projectName}</td>
                <td>{quotation.roomNo}</td>
                <td>
                  <select
                    value={quotation.status}
                    onChange={(event) =>
                      handleStatusChange(quotation, event.target.value)
                    }
                    className={`border border-gray-300 rounded-md px-2 py-1 ${
                      QuotationStatus[quotation.status]
                    }`}
                  >
                    <option
                      value="DRAFTED"
                      className="text-yellow-600 bg-yellow-100"
                    >
                      Drafted
                    </option>
                    <option
                      value="COMPLETED"
                      className="text-green-600 bg-green-100"
                    >
                      Completed
                    </option>
                  </select>
                </td>
                <td className="flex justify-center items-center gap-4 text-2xl">
                  <div
                    className="w-10 h-10 flex justify-center items-center rounded-full bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer"
                    onClick={() => handleEdit(quotation)}
                  >
                    <CiEdit />
                  </div>
                  <div
                    className="w-10 h-10 flex justify-center items-center rounded-full bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer"
                    onClick={() => handleDelete(quotation)}
                  >
                    <MdOutlineDeleteSweep />
                  </div>
                  <div
                    className={`w-10 h-10 flex justify-center items-center rounded-full ${
                      quotation.status === "COMPLETED"
                        ? "bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer"
                        : "bg-ifcg-gray-low opacity-50"
                    }`}
                    onClick={() =>
                      quotation.status === "COMPLETED" && handlePrint(quotation)
                    }
                  >
                    <PiPrinterLight />
                  </div>
                  <div
                    className={`w-10 h-10 flex justify-center items-center rounded-full ${
                      quotation.status === "COMPLETED"
                        ? "bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer"
                        : "bg-ifcg-gray-low opacity-50"
                    }`}
                    onClick={() =>
                      quotation.status === "COMPLETED" &&
                      handleSendEmail(quotation)
                    }
                  >
                    <FiSend />
                  </div>
                  <div
                    className={`w-10 h-10 flex justify-center items-center rounded-full ${
                      quotation.status === "COMPLETED"
                        ? "bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer"
                        : "bg-ifcg-gray-low opacity-50"
                    }`}
                    onClick={() =>
                      quotation.status === "COMPLETED" &&
                      handleCopyLink(quotation.pdfLink)
                    }
                  >
                    <AiOutlineLink />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "none" }}>
        <QuotationTemplate ref={componentRef} />
      </div>
      <Modal
        width={30}
        title="Send Email"
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
      >
        <div>
          <label>Email</label>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="flex justify-end mt-4">
            <Button bg="green" onClick={sendEmail}>
              Send
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        width={30}
        title="Change Status"
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      >
        <div className="text-center">
          <small>
            Are you sure you want to change the status to {newStatus}?
          </small>
          <div className="flex justify-end mt-4">
            <Button bg="green" onClick={changeStatus}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QuaotationTable;
