import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataContextProvider } from "./context/DataContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";

createRoot(document.getElementById("root")).render(
  <Router>
    <ClerkProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </ClerkProvider>
  </Router>,
);
