import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { SessionProvider } from "./context/SessionContext";
import { FolderProvider } from "./context/FolderContext";
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
