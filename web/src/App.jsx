import Router from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors />
      <Router />
    </>
  );
}

export default App;
