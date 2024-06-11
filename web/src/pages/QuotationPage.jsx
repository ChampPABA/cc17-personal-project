import { useState } from "react";
import ClientDetails from "../features/quotation/components/ClientDetails";
import Dates from "../features/quotation/components/Dates";
import Footer from "../features/quotation/components/Footer";
import Header from "../features/quotation/components/Header";
import MainDetail from "../features/quotation/components/MainDetail";
import Notes from "../features/quotation/components/Notes";
import Table from "../features/quotation/components/Table";

function QuotationPage() {
  const [showQuotation, setShowQuotation] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [quotationNumber, setQuotationNumber] = useState("");
  const [quotationDate, setQuotationDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl: bg-white rounded shadow-lg">
        {showQuotation ? (
          <div>
            <Header handlePrint={handlePrint} />
            <MainDetail name={name} address={address} />
            <ClientDetails
              clientName={clientName}
              clientAddress={clientAddress}
            />
            <Dates
              quotationNumber={quotationNumber}
              quotationDate={quotationDate}
              dueDate={dueDate}
            />
            <Table />
            <Notes notes={notes} />
            <Footer
              name={name}
              address={address}
              website={website}
              email={email}
              phone={phone}
              bankName={bankName}
              bankAccount={bankAccount}
            />

            <button
              onClick={() => setShowQuotation(false)}
              className="mt-5 bg-blue-500 text-white font-bold  py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
            >
              Edit Information
            </button>
          </div>
        ) : (
          <>
            {/* name, address, email, phone, bank, bank name, bank account number, website client name, client adress, quotation number, quotation date, due date, notes */}
            <div className="flex flex-col justify-center">
              <label htmlFor="name">Enter your name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your Name"
                autoComplete="off"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <label htmlFor="address">Enter your address</label>
              <input
                type="text"
                name="adress"
                id="address"
                placeholder="Enter your address"
                autoComplete="off"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />

              <label htmlFor="email">Enter your email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="off"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <label htmlFor="website">Enter your website</label>
              <input
                type="url"
                name="website"
                id="website"
                placeholder="Enter your website"
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />

              <label htmlFor="phone">Enter your phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter your phone"
                autoComplete="off"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />

              <label htmlFor="bankName">Enter your bank name</label>
              <input
                type="text"
                name="bankName"
                id="bankName"
                placeholder="Enter your bank name"
                autoComplete="off"
                value={bankName}
                onChange={(event) => setBankName(event.target.value)}
              />

              <label htmlFor="bankAccount">Enter your bank account</label>
              <input
                type="text"
                name="bankAccount"
                id="bankAccount"
                placeholder="Enter your bank account"
                autoComplete="off"
                value={bankAccount}
                onChange={(event) => setBankAccount(event.target.value)}
              />

              <label htmlFor="clientName">Enter your client`s name</label>
              <input
                type="text"
                name="clientName"
                id="clientName"
                placeholder="Enter your client`s name"
                autoComplete="off"
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
              />

              <label htmlFor="clientAddress">Enter your client`s address</label>
              <input
                type="text"
                name="clientAddress"
                id="clientAddress"
                placeholder="Enter your client`s address"
                autoComplete="off"
                value={clientAddress}
                onChange={(event) => setClientAddress(event.target.value)}
              />

              <label htmlFor="quotationNumber">
                Enter your quotation number
              </label>
              <input
                type="text"
                name="quotationNumber"
                id="quotationNumber"
                placeholder="Enter your quotation number"
                autoComplete="off"
                value={quotationNumber}
                onChange={(event) => setQuotationNumber(event.target.value)}
              />

              <label htmlFor="quotationDate">Enter your quotation date</label>
              <input
                type="date"
                name="quotationDate"
                id="quotationDate"
                placeholder="Enter your quotation date"
                autoComplete="off"
                value={quotationDate}
                onChange={(event) => setQuotationDate(event.target.value)}
              />

              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                placeholder="Quotation Due Date"
                autoComplete="off"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />

              <label htmlFor="notes">Additional Notes</label>
              <textarea
                name="notes"
                id="notes"
                cols="30"
                rows="10"
                placeholder="Additional notes to the client"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              ></textarea>

              <button
                onClick={() => setShowQuotation(true)}
                className="bg-blue-500 text-white font-bold  py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
              >
                Preview Quotation
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default QuotationPage;
