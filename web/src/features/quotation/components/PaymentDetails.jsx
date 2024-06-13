import useQuotation from "../../../hooks/useQuotation";

const PaymentDetails = () => {
  const { quotationData } = useQuotation();

  const calculateSum = (num1, num2) => {
    return +num1 + +num2;
  };

  const calculateMinus = (num1, num2) => {
    return +num1 - +num2;
  };

  return (
    <div className="px-4 py-2">
      <h2 className="text-lg font-bold">การชำระเงิน / Payment Details</h2>
      <table className="min-w-full">
        <tbody className="leading-tight">
          <tr>
            <td className="px-4 py-2 text-left border-0">เงินจอง / Booking</td>
            <td className="px-4 py-2 text-center border-0">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {(+quotationData.bookingPayment)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </td>
            <td className="px-4 py-2 text-left border-0">บาท</td>
          </tr>
          <tr>
            <td className="px-4 py-2 text-left border-0">
              เงินทำสัญญา หรือ เงินดาวน์ / Down Payment
            </td>
            <td className="px-4 py-2 text-center border-0">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {(+quotationData.downPayment)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </td>
            <td className="px-4 py-2 text-left border-0">บาท</td>
          </tr>
          <tr>
            <td className="px-4 py-2 text-right font-bold border-0">
              รวมเป็นเงิน / Total Payment
            </td>
            <td className="px-4 py-2 text-center border-0">
              <span className="inline-block border border-gray-700 w-full text-center font-bold">
                {calculateSum(
                  quotationData.bookingPayment,
                  quotationData.downPayment
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </td>
            <td className="px-4 py-2 text-left font-bold border-0">บาท</td>
          </tr>
          <tr>
            <td className="px-4 py-2 text-left border-0">
              เงินโอนกรรมสิทธิ์ / Transfer of Ownership
            </td>
            <td className="px-4 py-2 text-center border-0">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {calculateMinus(
                  calculateMinus(
                    quotationData.roomPrice,
                    quotationData.roomDiscount
                  ),
                  calculateSum(
                    quotationData.bookingPayment,
                    quotationData.downPayment
                  )
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </td>
            <td className="px-4 py-2 text-left border-0">บาท</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentDetails;
