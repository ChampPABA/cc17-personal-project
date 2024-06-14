import { Link, useNavigate } from "react-router-dom";
import { QuotationStatus } from "../../../utils/contants/quotation-status";
import { getDateFormat } from "../../../utils/date-format";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { PiPrinterLight } from "react-icons/pi";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import QuotationTemplate from "./QuotationTemplate";
import useQuotation from "../../../hooks/useQuotation";

function QuaotationTable({ quotations, isLoading }) {
  // const draftData = [
  //   {
  //     id: 1,
  //     customer_first_name: "ธงชัย",
  //     customer_last_name: "เกษมสันต์",
  //     customer_mobile: "0891234567",
  //     project_name: "The Issara Sathorn",
  //     room_no: "B1503",
  //     room_type: "1BR",
  //     room_size: 29.58,
  //     room_discount: 350000,
  //     booking_payment: 50000,
  //     transfer_payment: 10000000,
  //     sinking_fund: 500,
  //     common_fee: 80,
  //     quotation_no: "2024-02-0001",
  //     approve_email: "thongchai_kasem@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-02T10:24:00",
  //   },
  //   {
  //     id: 2,
  //     customer_first_name: "อรวรรณ",
  //     customer_last_name: "บุญศรี",
  //     customer_mobile: "0887654321",
  //     project_name: "Chewathai Hallmark Ladpro Chokchai4",
  //     room_no: "A0207",
  //     room_type: "studio",
  //     room_size: 22.34,
  //     room_discount: 120000,
  //     booking_payment: 100000,
  //     transfer_payment: 15000000,
  //     sinking_fund: 400,
  //     common_fee: 90,
  //     quotation_no: "2024-02-0002",
  //     approve_email: "orawan_boonsee@ifcg.co.th",
  //     status: "COMPLETED",
  //     created_at: "2024-02-05T14:45:00",
  //   },
  //   {
  //     id: 3,
  //     customer_first_name: "วีระ",
  //     customer_last_name: "ชัยสมบัติ",
  //     customer_mobile: "0812345678",
  //     project_name: "Wish Signature II Midtown Siam",
  //     room_no: "C3301",
  //     room_type: "2BR+",
  //     room_size: 65.23,
  //     room_discount: 240000,
  //     booking_payment: 50000,
  //     transfer_payment: 2000000,
  //     sinking_fund: 750,
  //     common_fee: 110,
  //     quotation_no: "2024-02-0003",
  //     approve_email: "wera_chaisombat@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-10T09:30:00",
  //   },
  //   {
  //     id: 4,
  //     customer_first_name: "นภาพร",
  //     customer_last_name: "วรรณสุข",
  //     customer_mobile: "0898765432",
  //     project_name: "Park Origin Payathai",
  //     room_no: "D2505",
  //     room_type: "1BR+",
  //     room_size: 34.12,
  //     room_discount: 190000,
  //     booking_payment: 100000,
  //     transfer_payment: 18000000,
  //     sinking_fund: 600,
  //     common_fee: 70,
  //     quotation_no: "2024-02-0004",
  //     approve_email: "napaporn_wansook@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-12T11:15:00",
  //   },
  //   {
  //     id: 5,
  //     customer_first_name: "พีระ",
  //     customer_last_name: "สมบัติ",
  //     customer_mobile: "0876543210",
  //     project_name: "Altitude Symphony Charoenkrung",
  //     room_no: "E0408",
  //     room_type: "2BR",
  //     room_size: 42.56,
  //     room_discount: 370000,
  //     booking_payment: 50000,
  //     transfer_payment: 10000000,
  //     sinking_fund: 450,
  //     common_fee: 100,
  //     quotation_no: "2024-02-0005",
  //     approve_email: "peera_sombat@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-15T16:00:00",
  //   },
  //   {
  //     id: 6,
  //     customer_first_name: "สมชาย",
  //     customer_last_name: "พรหมเทพ",
  //     customer_mobile: "0891122334",
  //     project_name: "Wish Signature II Midtown Siam",
  //     room_no: "A0307",
  //     room_type: "studio",
  //     room_size: 23.45,
  //     room_discount: 150000,
  //     booking_payment: 50000,
  //     transfer_payment: 5000000,
  //     sinking_fund: 350,
  //     common_fee: 75,
  //     quotation_no: "2024-02-0021",
  //     approve_email: "somchai_promthep@ifcg.co.th",
  //     status: "COMPLETED",
  //     created_at: "2024-02-21T15:30:00",
  //   },
  //   {
  //     id: 7,
  //     customer_first_name: "สายชล",
  //     customer_last_name: "สวัสดิ์วัฒน์",
  //     customer_mobile: "0883344556",
  //     project_name: "The Issara Sathorn",
  //     room_no: "B1410",
  //     room_type: "1BR",
  //     room_size: 30.56,
  //     room_discount: 250000,
  //     booking_payment: 100000,
  //     transfer_payment: 10000000,
  //     sinking_fund: 500,
  //     common_fee: 85,
  //     quotation_no: "2024-02-0022",
  //     approve_email: "saichon_sawatwat@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-22T10:45:00",
  //   },
  //   {
  //     id: 8,
  //     customer_first_name: "ภัทร",
  //     customer_last_name: "เทวารักษ์",
  //     customer_mobile: "0874455667",
  //     project_name: "Chewathai Hallmark Ladpro Chokchai4",
  //     room_no: "C0212",
  //     room_type: "2BR+",
  //     room_size: 55.32,
  //     room_discount: 300000,
  //     booking_payment: 50000,
  //     transfer_payment: 8000000,
  //     sinking_fund: 700,
  //     common_fee: 95,
  //     quotation_no: "2024-02-0023",
  //     approve_email: "pat_thewarak@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-23T12:10:00",
  //   },
  //   {
  //     id: 9,
  //     customer_first_name: "ดนัย",
  //     customer_last_name: "สิริชัย",
  //     customer_mobile: "0895566778",
  //     project_name: "Park Origin Payathai",
  //     room_no: "D0909",
  //     room_type: "1BR+",
  //     room_size: 34.89,
  //     room_discount: 120000,
  //     booking_payment: 50000,
  //     transfer_payment: 7000000,
  //     sinking_fund: 400,
  //     common_fee: 50,
  //     quotation_no: "2024-02-0024",
  //     approve_email: "danai_sirichai@ifcg.co.th",
  //     status: "COMPLETED",
  //     created_at: "2024-02-24T09:50:00",
  //   },
  //   {
  //     id: 10,
  //     customer_first_name: "ประภา",
  //     customer_last_name: "จันทรเสวี",
  //     customer_mobile: "0866677889",
  //     project_name: "Altitude Symphony Charoenkrung",
  //     room_no: "E2020",
  //     room_type: "penthouse",
  //     room_size: 90.34,
  //     room_discount: 450000,
  //     booking_payment: 100000,
  //     transfer_payment: 18000000,
  //     sinking_fund: 750,
  //     common_fee: 110,
  //     quotation_no: "2024-02-0025",
  //     approve_email: "prapa_jantrasewee@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-25T11:20:00",
  //   },
  //   {
  //     id: 11,
  //     customer_first_name: "สมชาย",
  //     customer_last_name: "พรหมเทพ",
  //     customer_mobile: "0891122334",
  //     project_name: "Wish Signature II Midtown Siam",
  //     room_no: "A0307",
  //     room_type: "studio",
  //     room_size: 23.45,
  //     room_discount: 150000,
  //     booking_payment: 50000,
  //     transfer_payment: 5000000,
  //     sinking_fund: 350,
  //     common_fee: 75,
  //     quotation_no: "2024-02-0021",
  //     approve_email: "somchai_promthep@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-21T15:30:00",
  //   },
  //   {
  //     id: 12,
  //     customer_first_name: "สายชล",
  //     customer_last_name: "สวัสดิ์วัฒน์",
  //     customer_mobile: "0883344556",
  //     project_name: "The Issara Sathorn",
  //     room_no: "B1410",
  //     room_type: "1BR",
  //     room_size: 30.56,
  //     room_discount: 250000,
  //     booking_payment: 100000,
  //     transfer_payment: 10000000,
  //     sinking_fund: 500,
  //     common_fee: 85,
  //     quotation_no: "2024-02-0022",
  //     approve_email: "saichon_sawatwat@ifcg.co.th",
  //     status: "COMPLETED",
  //     created_at: "2024-02-22T10:45:00",
  //   },
  //   {
  //     id: 13,
  //     customer_first_name: "ภัทร",
  //     customer_last_name: "เทวารักษ์",
  //     customer_mobile: "0874455667",
  //     project_name: "Chewathai Hallmark Ladpro Chokchai4",
  //     room_no: "C0212",
  //     room_type: "2BR+",
  //     room_size: 55.32,
  //     room_discount: 300000,
  //     booking_payment: 50000,
  //     transfer_payment: 8000000,
  //     sinking_fund: 700,
  //     common_fee: 95,
  //     quotation_no: "2024-02-0023",
  //     approve_email: "pat_thewarak@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-23T12:10:00",
  //   },
  //   {
  //     id: 14,
  //     customer_first_name: "ดนัย",
  //     customer_last_name: "สิริชัย",
  //     customer_mobile: "0895566778",
  //     project_name: "Park Origin Payathai",
  //     room_no: "D0909",
  //     room_type: "1BR+",
  //     room_size: 34.89,
  //     room_discount: 120000,
  //     booking_payment: 50000,
  //     transfer_payment: 7000000,
  //     sinking_fund: 400,
  //     common_fee: 50,
  //     quotation_no: "2024-02-0024",
  //     approve_email: "danai_sirichai@ifcg.co.th",
  //     status: "COMPLETED",
  //     created_at: "2024-02-24T09:50:00",
  //   },
  //   {
  //     id: 15,
  //     customer_first_name: "ประภา",
  //     customer_last_name: "จันทรเสวี",
  //     customer_mobile: "0866677889",
  //     project_name: "Altitude Symphony Charoenkrung",
  //     room_no: "E2020",
  //     room_type: "penthouse",
  //     room_size: 90.34,
  //     room_discount: 450000,
  //     booking_payment: 100000,
  //     transfer_payment: 18000000,
  //     sinking_fund: 750,
  //     common_fee: 110,
  //     quotation_no: "2024-02-0025",
  //     approve_email: "prapa_jantrasewee@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-25T11:20:00",
  //   },
  //   {
  //     id: 16,
  //     customer_first_name: "ประภา",
  //     customer_last_name: "จันทรเสวี",
  //     customer_mobile: "0866677889",
  //     project_name: "Altitude Symphony Charoenkrung",
  //     room_no: "E2020",
  //     room_type: "penthouse",
  //     room_size: 90.34,
  //     room_discount: 450000,
  //     booking_payment: 100000,
  //     transfer_payment: 18000000,
  //     sinking_fund: 750,
  //     common_fee: 110,
  //     quotation_no: "2024-02-0025",
  //     approve_email: "prapa_jantrasewee@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-25T11:20:00",
  //   },
  //   {
  //     id: 17,
  //     customer_first_name: "วิศรุต",
  //     customer_last_name: "บัวแก้ว",
  //     customer_mobile: "0893344556",
  //     project_name: "The Issara Sathorn",
  //     room_no: "D1512",
  //     room_type: "2BR",
  //     room_size: 42.68,
  //     room_discount: 350000,
  //     booking_payment: 50000,
  //     transfer_payment: 9000000,
  //     sinking_fund: 600,
  //     common_fee: 85,
  //     quotation_no: "2024-02-0026",
  //     approve_email: "wisarut_buakaew@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-26T09:40:00",
  //   },
  //   {
  //     id: 18,
  //     customer_first_name: "วิชัย",
  //     customer_last_name: "ทองคำ",
  //     customer_mobile: "0875566778",
  //     project_name: "Wish Signature II Midtown Siam",
  //     room_no: "A1205",
  //     room_type: "1BR+",
  //     room_size: 34.56,
  //     room_discount: 120000,
  //     booking_payment: 100000,
  //     transfer_payment: 15000000,
  //     sinking_fund: 450,
  //     common_fee: 75,
  //     quotation_no: "2024-02-0027",
  //     approve_email: "wichai_thongkam@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-27T13:50:00",
  //   },
  //   {
  //     id: 19,
  //     customer_first_name: "ชาญชัย",
  //     customer_last_name: "วิริยะ",
  //     customer_mobile: "0896677889",
  //     project_name: "Chewathai Hallmark Ladpro Chokchai4",
  //     room_no: "B1810",
  //     room_type: "2BR+",
  //     room_size: 55.89,
  //     room_discount: 200000,
  //     booking_payment: 50000,
  //     transfer_payment: 8000000,
  //     sinking_fund: 700,
  //     common_fee: 100,
  //     quotation_no: "2024-02-0028",
  //     approve_email: "chanchai_wiriya@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-28T11:10:00",
  //   },
  //   {
  //     id: 20,
  //     customer_first_name: "อุดม",
  //     customer_last_name: "บัวบาน",
  //     customer_mobile: "0867788990",
  //     project_name: "Park Origin Payathai",
  //     room_no: "C0203",
  //     room_type: "studio",
  //     room_size: 24.67,
  //     room_discount: 150000,
  //     booking_payment: 50000,
  //     transfer_payment: 5000000,
  //     sinking_fund: 350,
  //     common_fee: 50,
  //     quotation_no: "2024-03-0001",
  //     approve_email: "udom_buabarn@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-03-01T10:30:00",
  //   },
  //   {
  //     id: 21,
  //     customer_first_name: "ชาญชัย",
  //     customer_last_name: "วิริยะ",
  //     customer_mobile: "0896677889",
  //     project_name: "Chewathai Hallmark Ladpro Chokchai4",
  //     room_no: "B1810",
  //     room_type: "2BR+",
  //     room_size: 55.89,
  //     room_discount: 200000,
  //     booking_payment: 50000,
  //     transfer_payment: 8000000,
  //     sinking_fund: 700,
  //     common_fee: 100,
  //     quotation_no: "2024-02-0028",
  //     approve_email: "chanchai_wiriya@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-02-28T11:10:00",
  //   },
  //   {
  //     id: 22,
  //     customer_first_name: "อุดม",
  //     customer_last_name: "บัวบาน",
  //     customer_mobile: "0867788990",
  //     project_name: "Park Origin Payathai",
  //     room_no: "C0203",
  //     room_type: "studio",
  //     room_size: 24.67,
  //     room_discount: 150000,
  //     booking_payment: 50000,
  //     transfer_payment: 5000000,
  //     sinking_fund: 350,
  //     common_fee: 50,
  //     quotation_no: "2024-03-0001",
  //     approve_email: "udom_buabarn@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-03-01T10:30:00",
  //   },
  //   {
  //     id: 23,
  //     customer_first_name: "ณรงค์",
  //     customer_last_name: "จันทร์แสง",
  //     customer_mobile: "0878899001",
  //     project_name: "The Issara Sathorn",
  //     room_no: "D2507",
  //     room_type: "1BR",
  //     room_size: 28.45,
  //     room_discount: 120000,
  //     booking_payment: 50000,
  //     transfer_payment: 7000000,
  //     sinking_fund: 400,
  //     common_fee: 80,
  //     quotation_no: "2024-03-0002",
  //     approve_email: "narong_chansang@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-03-02T09:50:00",
  //   },
  //   {
  //     id: 24,
  //     customer_first_name: "ทศพร",
  //     customer_last_name: "ทองดี",
  //     customer_mobile: "0899900112",
  //     project_name: "Wish Signature II Midtown Siam",
  //     room_no: "E3015",
  //     room_type: "1BR+",
  //     room_size: 32.67,
  //     room_discount: 220000,
  //     booking_payment: 100000,
  //     transfer_payment: 9000000,
  //     sinking_fund: 650,
  //     common_fee: 75,
  //     quotation_no: "2024-03-0003",
  //     approve_email: "thosaporn_thongdee@ifcg.co.th",
  //     status: "DRAFTED",
  //     created_at: "2024-03-03T12:20:00",
  //   },
  //   {
  //     id: 25,
  //     customer_first_name: "เกียรติศักดิ์",
  //     customer_last_name: "วิชัย",
  //     customer_mobile: "0880011223",
  //     project_name: "Altitude Symphony Charoenkrung",
  //     room_no: "B1211",
  //     room_type: "2BR",
  //     room_size: 46.78,
  //     room_discount: 300000,
  //     booking_payment: 50000,
  //     transfer_payment: 10000000,
  //     sinking_fund: 500,
  //     common_fee: 90,
  //     quotation_no: "2024-03-0004",
  //     approve_email: "kiattisak_vichai@ifcg.co.th",
  //     status: "COMPLETED",
  //     created_at: "2024-03-04T14:00:00",
  //   },
  // ];

  const navigate = useNavigate();
  const componentRef = useRef();
  const { setQuotationData, resetQuotationData } = useQuotation();

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
              <td>No.</td>
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
                <td role="button" className="hover:text-ifcg-red-low">
                  <Link to={`/quotation/${quotation.id}`}>#{quotation.id}</Link>
                </td>
                <td>
                  {quotation.customerFirstName} {quotation.customerLastName}
                </td>
                <td>{getDateFormat(quotation.createdAt)}</td>
                <td>{quotation.projectName}</td>
                <td>{quotation.roomNo}</td>
                <td>{QuotationStatus(quotation.status)}</td>
                <td className="flex justify-center items-center gap-4 text-2xl">
                  <div className="w-10 h-10 flex justify-center items-center rounded-full bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer">
                    <CiEdit />
                  </div>
                  <div className="w-10 h-10 flex justify-center items-center rounded-full bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer">
                    <MdOutlineDeleteSweep />
                  </div>
                  {quotation.status === "COMPLETED" && (
                    <div
                      className="w-10 h-10 flex justify-center items-center rounded-full bg-ifcg-gray-high hover:bg-ifcg-gray-low cursor-pointer"
                      onClick={() => handlePrint(quotation)}
                    >
                      <PiPrinterLight />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "none" }}>
        <QuotationTemplate ref={componentRef} />
      </div>
    </div>
  );
}

export default QuaotationTable;
