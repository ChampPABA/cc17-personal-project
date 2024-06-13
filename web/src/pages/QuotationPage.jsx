import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import QuotationTemplate from "../features/quotation/components/QuotationTemplate";
import "../features/quotation/components/quotation.css";
import { useRef, useState } from "react";
import Button from "../components/Button";
import QuotationForm from "../features/quotation/components/QuotationForm";
import Modal from "../components/Modal";
import validateQuotation from "../features/quotation/validators/quotation-validator";
import useQuotation from "../hooks/useQuotation";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import quotationApi from "../apis/quotation";
import { axiosError } from "../utils/axios-error";

function QuotationPage() {
  const [open, setOpen] = useState(false);
  const componentRef = useRef();
  const navigate = useNavigate();
  const { quotationData, setQuotationDataError } = useQuotation();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePreview = () => {
    const error = validateQuotation(quotationData);
    if (error) {
      setQuotationDataError(error);
      toast.error("please fill invalid data");
      return;
    }
    setQuotationDataError({});
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const error = validateQuotation(quotationData);
      if (error) {
        setQuotationDataError(error);
        toast.error("please fill invalid data");
        return;
      }
      setQuotationDataError({});

      const canvas = await html2canvas(componentRef.current);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      const pdfBlob = pdf.output("blob");

      const formData = new FormData();
      formData.append("file", pdfBlob, "quotation.pdf");
      formData.append("data", JSON.stringify(quotationData));

      const res = await quotationApi.uploadPdf(formData);

      if (res.status === 200) {
        toast.success("save PDF successfully");
        navigate("/quotation_management");
      }
    } catch (error) {
      console.log(error);
      axiosError(error);
    }
  };

  return (
    <>
      <main
        className="m-5 p-5"
        style={{
          maxWidth: "1920px",
          margin: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "auto",
          }}
          className="overflow-auto max-h-[calc(100vh-50px)]"
        >
          <div className="flex justify-center sticky top-0">
            <Button onClick={handlePreview}>Preview</Button>
          </div>
          <QuotationForm />
        </div>
        <Modal
          title="PDF Preview"
          open={open}
          onClose={() => setOpen(false)}
          width={55}
        >
          <div className=" shadow-lg">
            <div className="flex justify-center items-center sticky top-0">
              <Button onClick={handlePrint} bg="green">
                Print
              </Button>
              <Button onClick={handleSave} bg="gray">
                Save
              </Button>
            </div>

            <div ref={componentRef}>
              <QuotationTemplate />
            </div>
          </div>
        </Modal>
      </main>
    </>
  );
}

export default QuotationPage;
