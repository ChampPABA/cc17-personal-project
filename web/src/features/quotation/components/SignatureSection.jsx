import useQuotation from "../../../hooks/useQuotation";

const SignatureSection = () => {
  const { quotationData } = useQuotation();
  return (
    <div className="px-4 py-2">
      <table className="min-w-full">
        <tbody className="text-sm leading-none">
          <tr>
            <td className="px-4 py-2 text-center border-0">
              ลูกค้า / Customer ................................................
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="px-4 py-2 text-center border-0">
              ( {quotationData.customerFirstName}{" "}
              {quotationData.customerLastName} )
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SignatureSection;
