import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/auth-provider";
import "./styles/sass/globals.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: "#ff82a8" } }}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>
);
