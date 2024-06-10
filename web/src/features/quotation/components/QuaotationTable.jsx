import { Link } from "react-router-dom";
import { QuotationStatus } from "../../../utils/quotation-status";

function QuaotationTable() {
  const recentOrderData = [
    {
      id: "1",
      product_id: "4324",
      customer_id: "23143",
      customer_name: "Shirley A. Lape",
      order_date: "2022-05-17T03:24:00",
      order_total: "$435.50",
      current_order_status: "PLACED",
      shipment_address: "Cottage Grove, OR 97424",
    },
    {
      id: "7",
      product_id: "7453",
      customer_id: "96453",
      customer_name: "Ryan Carroll",
      order_date: "2022-05-14T05:24:00",
      order_total: "$96.35",
      current_order_status: "CONFIRMED",
      shipment_address: "Los Angeles, CA 90017",
    },
    {
      id: "2",
      product_id: "5434",
      customer_id: "65345",
      customer_name: "Mason Nash",
      order_date: "2022-05-17T07:14:00",
      order_total: "$836.44",
      current_order_status: "SHIPPED",
      shipment_address: "Westminster, CA 92683",
    },
    {
      id: "3",
      product_id: "9854",
      customer_id: "87832",
      customer_name: "Luke Parkin",
      order_date: "2022-05-16T12:40:00",
      order_total: "$334.50",
      current_order_status: "SHIPPED",
      shipment_address: "San Mateo, CA 94403",
    },
    {
      id: "4",
      product_id: "8763",
      customer_id: "09832",
      customer_name: "Anthony Fry",
      order_date: "2022-05-14T03:24:00",
      order_total: "$876.00",
      current_order_status: "OUT_FOR_DELIVERY",
      shipment_address: "San Mateo, CA 94403",
    },
    {
      id: "5",
      product_id: "5627",
      customer_id: "97632",
      customer_name: "Ryan Carroll",
      order_date: "2022-05-14T05:24:00",
      order_total: "$96.35",
      current_order_status: "DELIVERED",
      shipment_address: "Los Angeles, CA 90017",
    },
  ];

  const getDateFormat = (unformatDate) => {
    const date = new Date(unformatDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gay-200 flex1">
      <strong className="text-gray-700 font-medium">Quatations</strong>
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>Product ID</td>
              <td>Customer Name</td>
              <td>Order Date</td>
              <td>Order Total</td>
              <td>Shipping Address</td>
              <td>Order Status</td>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/quotation/${order.id}`}>#{order.id}</Link>
                </td>
                <td>{order.product_id}</td>
                <td>{order.customer_name}</td>
                <td>{getDateFormat(order.order_date)}</td>
                <td>{order.order_total}</td>
                <td>{order.shipment_address}</td>
                <td>{QuotationStatus(order.current_order_status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuaotationTable;
