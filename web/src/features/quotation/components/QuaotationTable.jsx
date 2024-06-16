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
import Pagination from "../../../components/Pagination";

function QuaotationTable() {
  const navigate = useNavigate();
  const componentRef = useRef();
  const {
    filterQuotationsData,
    setQuotationData,
    resetQuotationData,
    isQuotationsDataLoading,
    updateQuotationStatus,
    setQuotationsData,
    setFilterQuotationsData,
    setIsEdit,
    setIsCreate,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    sortConfig,
    setSortConfig,
  } = useQuotation();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [newStatus, setnewStatus] = useState("");
  const [email, setEmail] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [quotationToDelete, setQuotationToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateQuotation = async () => {
    await setIsCreate(true);
    setIsEdit(false);
    resetQuotationData();
    navigate("/quotation");
  };

  const handlePrintAction = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = async (quotation) => {
    setIsEdit(false);
    setIsCreate(false);
    await setQuotationData(quotation);
    handlePrintAction();
  };

  const handleSendEmail = (quotation) => {
    setSelectedQuotation(quotation);
    setEmail("");
    setEmailModalOpen(true);
  };

  const handleCopyLink = (pdfLink) => {
    navigator.clipboard.writeText(pdfLink);
    toast.success("Quotation Link Copied");
  };

  const handleEdit = async (quotation) => {
    setIsEdit(true);
    setIsCreate(false);
    await setQuotationData({
      ...quotation,
      updatedAt: getDateFormat(new Date()),
    });
    navigate(`/quotation/${quotation.id}`);
  };

  const handleDelete = (quotation) => {
    setQuotationToDelete(quotation);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (quotationToDelete.status === "DRAFTED") {
        await quotationApi.hardDeleteQuotation(quotationToDelete.id);
      } else {
        await quotationApi.softDeleteQuotation(quotationToDelete.id);
      }
      toast.success("Quotation Deleted Successfully");
      setQuotationsData((prev) =>
        prev.filter((q) => q.id !== quotationToDelete.id)
      );
      setFilterQuotationsData((prev) =>
        prev.filter((q) => q.id !== quotationToDelete.id)
      );
    } catch (error) {
      axiosError(error);
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setQuotationToDelete(null);
    }
  };

  const sendEmail = async () => {
    setIsLoading(true);
    try {
      await quotationApi.sendEmail(selectedQuotation.id, email);
      toast.success("Email Sent Succesfully");
      setEmailModalOpen(false);
    } catch (error) {
      axiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (quotation, status) => {
    setSelectedQuotation(quotation);
    setnewStatus(status);
    setStatusModalOpen(true);
  };

  const changeStatus = async () => {
    try {
      await updateQuotationStatus(selectedQuotation.id, newStatus);
      setStatusModalOpen(false);
      toast.success("Status Updated Successfully");
    } catch (error) {
      axiosError(error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterQuotationsData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalItems = filterQuotationsData.length;

  const totalPages = Math.ceil(filterQuotationsData.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = "descending";
    if (sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
    setFilterQuotationsData((prev) => {
      const sortedData = [...prev];
      sortedData.sort((a, b) => {
        if (a[key] < b[key]) return direction === "descending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "descending" ? 1 : -1;
        return 0;
      });
      return sortedData;
    });
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
        {isQuotationsDataLoading && <Loading />}
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead className="sticky top-0">
            <tr>
              <td className="cursor-pointer" onClick={() => handleSort("id")}>
                Id{" "}
                {sortConfig.key === "id" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => handleSort("customerFirstName")}
              >
                Customer{" "}
                {sortConfig.key === "customerFirstName" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Date{" "}
                {sortConfig.key === "createdAt" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => handleSort("projectName")}
              >
                Project Name{" "}
                {sortConfig.key === "projectName" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => handleSort("roomNo")}
              >
                Unit Number{" "}
                {sortConfig.key === "roomNo" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((quotation) => (
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
                    className={`w-10 h-10 flex justify-center items-center rounded-full ${
                      quotation.status === "DRAFTED"
                        ? "bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer"
                        : "bg-ifcg-gray-low opacity-50"
                    }`}
                    onClick={() =>
                      quotation.status === "DRAFTED" && handleEdit(quotation)
                    }
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
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
            <Button bg="green" onClick={sendEmail} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
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
      <Modal
        title="Confirm Delete"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <div>
          <p>Are you sure you want to delete this quotation?</p>
          <div className="flex justify-end mt-4">
            <Button bg="red" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Confirm"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QuaotationTable;
