import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Providers } from "./Provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Providers>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Providers>
);
