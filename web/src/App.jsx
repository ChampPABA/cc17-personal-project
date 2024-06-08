import { Suspense } from "react";
import UserContextProvider from "./contexts/UserContext";
import Router from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <UserContextProvider>
        <Router />
        <Toaster richColors />
      </UserContextProvider>
    </Suspense>
  );
}

export default App;
