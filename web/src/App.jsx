import { Suspense } from "react";
import UserContextProvider from "./contexts/UserContext";
import Router from "./routes";
import { Toaster } from "sonner";
import Loading from "./components/Loading";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserContextProvider>
        <Router />
        <Toaster richColors />
      </UserContextProvider>
    </Suspense>
  );
}

export default App;
