import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { SessionProvider } from "./context/SessionContext";
import { useState } from "react";
const App = () => {
  return (
    <>
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </>
  );
};

export default App;
