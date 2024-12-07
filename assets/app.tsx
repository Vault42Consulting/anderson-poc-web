import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./react/MainPage";
import { BrowserRouter, Routes, Route } from "react-router";

import "./bootstrap.js";

import "./styles/app.css";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
