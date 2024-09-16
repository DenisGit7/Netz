import FolderTree from "./components/FolderTree.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./layouts/Layout.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FolderTree />} />
        <Route />
      </Route>
    </Routes>
  );
}

export default App;
