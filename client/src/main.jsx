import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./styles.css";
import { NotificationProvider } from "../context/NotificationContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
      <Toaster />
    </NotificationProvider>
  </React.StrictMode>,
);
