import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { NotificationProvider } from "../context/NotificationContext";
import NavBarProvider from "../context/NavBarContext";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <NavBarProvider>
      <NotificationProvider>
          <App />
          <Toaster />
      </NotificationProvider>
        </NavBarProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
