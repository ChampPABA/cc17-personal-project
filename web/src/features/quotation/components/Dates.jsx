export default function Dates({ quotationNumber, quotationDate, dueDate }) {
  return (
    <>
      <article className="mt-5 flex flex-col items-end justify-end">
        <ul>
          <li className="py-1">
            <span className="font-bold">Quotation Number:</span>
            {quotationNumber}
          </li>
          <li className="py-1 bg-gray-100">
            <span className="font-bold">Quotation Date:</span>
            {quotationDate}
          </li>
          <li className="py-1">
            <span className="font-bold">Due Date:</span>
            {dueDate}
          </li>
        </ul>
      </article>
    </>
  );
}
