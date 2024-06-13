import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./contexts/UserContext.jsx";
import QuotationContext from "./contexts/QuotationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <UserContextProvider>
    <QuotationContext>
      <App />
    </QuotationContext>
  </UserContextProvider>
  // </React.StrictMode>,
);
