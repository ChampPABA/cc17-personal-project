import useQuotation from "../../../hooks/useQuotation";

const RoomDetailsTable = () => {
  const { quotationData } = useQuotation();

  const calculateDivided = (dividend, divisor) => {
    return +dividend / +divisor;
  };

  const calculateMinus = (num1, num2) => {
    return +num1 - +num2;
  };

  return (
    <div className="px-4 py-1">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">
              ชื่อโครงการ
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              ห้องชุดเลขที่
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              ชั้นที่
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              รูปแบบห้อง
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              ขนาดห้อง (ตร.ม.)
            </th>
          </tr>
        </thead>
        <tbody className="leading-tight">
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {quotationData.projectName}
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {quotationData.roomNumber}
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {quotationData.roomFloor}
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {quotationData.roomType}
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {quotationData.roomSize.replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="min-w-full mt-2 border border-gray-300">
        <tbody className="leading-tight">
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-left">
              ราคาห้องชุด / Price
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {(+quotationData.roomPrice)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-left">บาท</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-left">
              ราคาห้องชุดต่อ ตร.ม. / Price per sq.m.
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {calculateDivided(
                  quotationData.roomPrice,
                  quotationData.roomSize
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-left">
              บาท / ตร.ม.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-left">
              ส่วนลด / Discount
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {(+quotationData.roomDiscount)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-left">บาท</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-left">
              ราคาห้องชุดสุทธิ / Total Price
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {calculateMinus(
                  quotationData.roomPrice,
                  quotationData.roomDiscount
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-left">บาท</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 text-left">
              ราคาห้องชุดสุทธิต่อ ตร.ม. / Total Price per sq.m.
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <span className="inline-block border-b border-dashed border-gray-400 w-full text-center">
                {calculateDivided(
                  calculateMinus(
                    quotationData.roomPrice,
                    quotationData.roomDiscount
                  ),
                  quotationData.roomSize
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-2 text-left">
              บาท / ตร.ม.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RoomDetailsTable;
