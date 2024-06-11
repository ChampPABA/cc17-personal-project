export function QuotationStatus(status) {
  switch (status) {
    case "DRAFTED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
          {status.toLowerCase()}
        </span>
      );
    case "COMPLETED":
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
          {status.toLowerCase()}
        </span>
      );
    default:
      return (
        <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
          {status.toLowerCase()}
        </span>
      );
  }
}
