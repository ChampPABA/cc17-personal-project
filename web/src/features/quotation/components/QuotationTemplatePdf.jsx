import { Page, Document } from "@react-pdf/renderer";
import QuotationTemplate from "./QuotationTemplate";

function QuotationTemplatePdf({ data }) {
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <QuotationTemplate data={data} />
      </Page>
    </Document>
  );
}

export default QuotationTemplatePdf;

QuotationTemplatePdf.jsx;
