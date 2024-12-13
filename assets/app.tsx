import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./react/pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router";

import "./bootstrap.js";

import "./styles/app.css";
import Layout from "./react/Layout";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* /* Not really using routes but showing how they could be used. */}
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
