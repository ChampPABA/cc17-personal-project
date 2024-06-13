import { useReactToPrint } from "react-to-print";
import QuotationTemplate from "../features/quotation/components/QuotationTemplate";
import "../features/quotation/components/quotation.css";
import { useRef, useState } from "react";
import Button from "../components/Button";
import QuotationForm from "../features/quotation/components/QuotationForm";
import Modal from "../components/Modal";

function QuotationPage() {
  const [open, setOpen] = useState(false);
  const componentRef = useRef();

  const handlerPrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
        >
          <QuotationForm />

          <Button onClick={() => setOpen(true)}>Preview</Button>
        </div>
        <Modal
          title="PDF Preview"
          open={open}
          onClose={() => setOpen(false)}
          width={55}
        >
          <div className=" shadow-lg">
            <div className="flex justify-center items-center">
              <Button onClick={handlerPrint} bg="green">
                Print
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
