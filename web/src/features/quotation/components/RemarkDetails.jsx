import useQuotation from "../../../hooks/useQuotation";

const RemarkDetails = () => {
  const { quotationData } = useQuotation();
  return (
    <div className="px-4 py-2">
      <h2 className="text-lg font-bold mb-2">หมายเหตุ / Remarks</h2>
      <table className="min-w-full">
        <tbody className="text-xxs leading-tight">
          <tr>
            <td className="text-xxs leading-tight px-4 py-1 text-left border-0">
              1. ทำสัญญาจะซื้อจะขายภายใน 14 วัน นับจากวันที่ลูกค้าชำระเงิน /
              Sign contract within 14 days after customer payment.
            </td>
          </tr>
          <tr>
            <td className="text-xxs leading-tight px-4 py-1 text-left border-0">
              2. ค่าใช้จ่ายในวันโอนกรรมสิทธิ์ ดังนี้ / Transfer cost:
            </td>
          </tr>
          <tr>
            <td className="text-xxs leading-tight pl-8 py-1 text-left border-0">
              2.1 ค่าธรรมเนียมการโอนกรรมสิทธิ์ / Transfer fee.
            </td>
          </tr>
          <tr>
            <td className="text-xxs leading-tight pl-8 py-1 text-left border-0">
              2.2 ค่าใช้จ่ายส่วนกลาง{" "}
              {quotationData.commonFee.replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
              บาท/ตร.ม./เดือน / Maintenance fee common area{" "}
              {quotationData.commonFee.replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
              thb/sq.m./month.
            </td>
          </tr>
          <tr>
            <td className="text-xxs leading-tight pl-8 py-1 text-left border-0">
              2.3 เงินกองทุนอาคารชุด{" "}
              {quotationData.sinkingFund.replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
              บาท/ตร.ม. (ชำระครั้งเดียว) / Sinking fund{" "}
              {quotationData.sinkingFund.replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
              thb/sq.m. (Paid one time only).
            </td>
          </tr>
          <tr>
            <td className="text-xxs leading-tight pl-8 py-1 text-left border-0">
              2.4 เงินประกันและการเปิดใช้สาธารณูปโภค / Payment for the initial
              registration of the electricity meters, water meters.
            </td>
          </tr>
          <tr>
            <td className="text-xxs leading-tight pl-8 py-1 text-left border-0">
              2.5 ค่าเบ็ดเตล็ดที่เกิดขึ้น ณ วันโอนกรรมสิทธิ์ / Miscellaneous
              cost on transfer date such as stamp duty, witness fee, lawyer fee,
              power of attorney fee, etc.
            </td>
          </tr>
          <tr>
            <td className="text-xxs leading-tight px-4 py-1 text-left border-0">
              3. เสนอขายผ่านบริษัทนายหน้า บริษัท ไอเอฟซีจี จำกัด (มหาชน) /
              Offered for sale through a brokerage company, IFCG Public Company
              Limited.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RemarkDetails;
