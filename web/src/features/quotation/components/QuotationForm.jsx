import Input from "../../../components/Input";
import useQuotation from "../../../hooks/useQuotation";

function QuotationForm() {
  const { quotationData, setQuotationData, quotationDataError } =
    useQuotation();

  const handleChangeInput = (event) => {
    setQuotationData({
      ...quotationData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="border bg-white rounded-lg p-8 mb-4 space-y-6">
      <div className="text-center text-xl font-semibold px-4 py-2">
        <p>Quotation Form</p>
      </div>

      {/* Customer's Details */}
      <div className="border p-4 rounded-lg space-y-4">
        <p className="font-medium text-lg">Customer&apos;s Details</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="customerFirstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <Input
              id="customerFirstName"
              placeholder="First Name"
              value={quotationData.customerFirstName}
              name="customerFirstName"
              error={quotationDataError.customerFirstName}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label
              htmlFor="customerLastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <Input
              id="customerLastName"
              placeholder="Last Name"
              value={quotationData.customerLastName}
              name="customerLastName"
              error={quotationDataError.customerLastName}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="customerMobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <Input
              id="customerMobile"
              placeholder="Mobile Number"
              value={quotationData.customerMobile}
              name="customerMobile"
              error={quotationDataError.customerMobile}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="customerEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="customerEmail"
              placeholder="Email"
              value={quotationData.customerEmail}
              name="customerEmail"
              error={quotationDataError.customerEmail}
              onChange={handleChangeInput}
            />
          </div>
        </div>
      </div>

      {/* Unit's Details */}
      <div className="border p-4 rounded-lg space-y-4">
        <p className="font-medium text-lg">Unit&apos;s Details</p>
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-4">
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <Input
              id="projectName"
              placeholder="Project Name"
              value={quotationData.projectName}
              name="projectName"
              error={quotationDataError.projectName}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="roomNo"
              className="block text-sm font-medium text-gray-700"
            >
              Unit Number
            </label>
            <Input
              id="roomNo"
              placeholder="Unit Number"
              value={quotationData.roomNo}
              name="roomNo"
              error={quotationDataError.roomNo}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="roomFloor"
              className="block text-sm font-medium text-gray-700"
            >
              Floor
            </label>
            <Input
              id="roomFloor"
              placeholder="Floor"
              value={quotationData.roomFloor}
              name="roomFloor"
              error={quotationDataError.roomFloor}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="roomType"
              className="block text-sm font-medium text-gray-700"
            >
              Room Type
            </label>
            <Input
              id="roomType"
              placeholder="Room Type"
              value={quotationData.roomType}
              name="roomType"
              error={quotationDataError.roomType}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="roomSize"
              className="block text-sm font-medium text-gray-700"
            >
              Room Size
            </label>
            <Input
              id="roomSize"
              placeholder="Room Size"
              value={quotationData.roomSize}
              name="roomSize"
              error={quotationDataError.roomSize}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="roomPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Unit Price
            </label>
            <Input
              id="roomPrice"
              placeholder="Unit Price"
              value={quotationData.roomPrice}
              name="roomPrice"
              error={quotationDataError.roomPrice}
              onChange={handleChangeInput}
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="roomDiscount"
              className="block text-sm font-medium text-gray-700"
            >
              Unit Discount
            </label>
            <Input
              id="roomDiscount"
              placeholder="Unit Discount"
              value={quotationData.roomDiscount}
              name="roomDiscount"
              error={quotationDataError.roomDiscount}
              onChange={handleChangeInput}
            />
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="border p-4 rounded-lg space-y-4">
        <p className="font-medium text-lg">Payment Details</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="bookingPayment"
              className="block text-sm font-medium text-gray-700"
            >
              Booking Payment
            </label>
            <Input
              id="bookingPayment"
              placeholder="Booking Payment"
              value={quotationData.bookingPayment}
              name="bookingPayment"
              error={quotationDataError.bookingPayment}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label
              htmlFor="downPayment"
              className="block text-sm font-medium text-gray-700"
            >
              Down Payment
            </label>
            <Input
              id="downPayment"
              placeholder="Down Payment"
              value={quotationData.downPayment}
              name="downPayment"
              error={quotationDataError.downPayment}
              onChange={handleChangeInput}
            />
          </div>
        </div>
      </div>

      {/* Miscellaneous expenses */}
      <div className="border p-4 rounded-lg space-y-4">
        <p className="font-medium text-lg">Miscellaneous expenses</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="commonFee"
              className="block text-sm font-medium text-gray-700"
            >
              Common Fee
            </label>
            <Input
              id="commonFee"
              placeholder="Common Fee"
              value={quotationData.commonFee}
              name="commonFee"
              error={quotationDataError.commonFee}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <label
              htmlFor="sinkingFund"
              className="block text-sm font-medium text-gray-700"
            >
              Sinking Fund
            </label>
            <Input
              id="sinkingFund"
              placeholder="Sinking Fund"
              value={quotationData.sinkingFund}
              name="sinkingFund"
              error={quotationDataError.sinkingFund}
              onChange={handleChangeInput}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default QuotationForm;
