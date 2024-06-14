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
import Loading from "../components/Loading";

function QuotationPage() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef();
  const navigate = useNavigate();
  const { quotationData, setQuotationDataError } = useQuotation();

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
    setIsLoading(true);
    try {
      const error = validateQuotation(quotationData);
      if (error) {
        setQuotationDataError(error);
        toast.error("please fill invalid data");
        return;
      }
      setQuotationDataError({});

      const canvas = await html2canvas(componentRef.current, {
        scale: 1.6, // ตั้งค่า ความละเอียดของ PDF
      });
      const imgData = canvas.toDataURL("image/png", 0.5); // เพิ่ม/ลด คุณภาพเพื่อลดขนาด file ของ PNG

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // set สัดส่วนของ pdf Option1 แบบสวยงาม
      // const imgProps = pdf.getImageProperties(imgData);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Option2 แบบตรงตาม สัดส่วน A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdfWidth * (297 / 210);

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = pdf.output("blob");

      // // สร้าง URL เอาไว้ดู PDF
      // const pdfUrl = URL.createObjectURL(pdfBlob);

      // // เปิด PDF ใน Tab ใหม่
      // window.open(pdfUrl, "_blank");

      // ส่งไปหลังบ้าน
      const formData = new FormData();
      formData.append("file", pdfBlob, "quotation.pdf");
      formData.append("data", JSON.stringify(quotationData));

      const res = await quotationApi.uploadPdf(formData);

      if (res.status === 201) {
        toast.success("save PDF successfully");
        navigate("/quotation_management");
      }
    } catch (error) {
      console.log(error);
      axiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
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
              <Button onClick={handleSave} bg="green">
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
