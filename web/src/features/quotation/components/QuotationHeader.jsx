import useQuotation from "../../../hooks/useQuotation";
import { getDateFormat } from "../../../utils/date-format";

const QuotationHeader = () => {
  const { quotationData, isEdit, isCreate } = useQuotation();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">ใบเสนอราคา (Quotation)</h1>
      <table className="min-w-full mt-2">
        <tbody>
          <tr className="border-0">
            <td className="px-4 py-2 text-gray-700 border-0"></td>
            <td className="px-4 py-2 text-gray-700 border-0">
              วันที่จอง / Reservation Date :
              <span className="inline-block border-b border-dashed border-gray-400 w-full">
                {isEdit
                  ? quotationData.updatedAt
                  : isCreate
                  ? getDateFormat(new Date())
                  : getDateFormat(quotationData.createdAt)}
              </span>
            </td>
          </tr>
          <tr className="border-0">
            <td className="px-4 py-2 text-gray-700 border-0" colSpan={2}>
              ชื่อ – นามสกุล / Customer Name :
              <span className="inline-block border-b border-dashed border-gray-400 w-full">
                {quotationData.customerFirstName}{" "}
                {quotationData.customerLastName}
              </span>
            </td>
          </tr>
          <tr className="border-0">
            <td className="px-4 py-2 text-gray-700 border-0">
              เบอร์โทรศัพท์ / Tel. :
              <span className="inline-block border-b border-dashed border-gray-400 w-full">
                {quotationData.customerMobile}
              </span>
            </td>
            <td className="px-4 py-2 text-gray-700 border-0">
              อีเมล / E-mail :
              <span className="inline-block border-b border-dashed border-gray-400 w-full">
                {quotationData.customerEmail}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuotationHeader;
