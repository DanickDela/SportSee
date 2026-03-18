import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Accueil from "./pages/Accueil/Accueil";
import Profil from "./pages/Profil/Profil";
import Sidebar from "./components/Sidebar/Sidebar";
import "./styles/common.scss";

import { Navigate } from "react-router-dom";
import { RechartsDevtools } from "@recharts/devtools";

const Redirect = () => {
  const userId = "12";

  return <Navigate to={`/user/${userId}`} replace />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="app">
        <Header />
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Redirect />} />
            <Route path="/profil" element={<Profil />} />

            {/* route dynamique */}
            <Route path="/user/:id" element={<Accueil />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
);
