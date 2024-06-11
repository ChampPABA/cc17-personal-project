export default function Footer({
  name,
  email,
  website,
  phone,
  bankName,
  bankAccount,
}) {
  return (
    <>
      <footer className="my-0.5 mx-0.2 border-t-2 border-t-gray-300 pt-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-1">
          <li>
            <span className="font-bold">Sales Name:</span> {name}
          </li>
          <li>
            <span className="font-bold">Sales Email:</span> {email}
          </li>
          <li>
            <span className="font-bold">Phone Number:</span> {phone}
          </li>
          <li>
            <span className="font-bold">Bank:</span> Bank {bankName}
          </li>
          <li>
            <span className="font-bold">Account Holder:</span> {name}
          </li>
          <li>
            <span className="font-bold">Account Number:</span> {bankAccount}
          </li>
          <li>
            <span className="font-bold">Website:</span>
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
