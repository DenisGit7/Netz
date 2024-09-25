import React, { useState } from "react";
import Main from "./components/Main.js";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout.js";

function App() {
  // Main state of show / hide upload & navigation features. passed down to (1)Layout from which we control, and (2)Main that receives state
  const [showUpload, setShowUpload] = useState(false);
  const [showFolders, setShowFolders] = useState(false);
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            user={user}
            setUser={setUser}
            role={role}
            setRole={setRole}
            showUpload={showUpload}
            setShowUpload={setShowUpload}
            showFolders={showFolders}
            setShowFolders={setShowFolders}
          />
        }
      >
        <Route
          index
          element={
            <Main
              showUpload={showUpload}
              showFolders={showFolders}
              role={role}
              user={user}
            />
          }
        />

        <Route />
      </Route>
    </Routes>
  );
}

export default App;
