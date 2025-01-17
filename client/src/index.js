import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserAuthProvider } from "./context/userContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <UserAuthProvider>
            <App />
        </UserAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
