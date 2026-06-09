import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";
import ProfilePage from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
