import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./css/default.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRecipeForm from "./components/NewRecipeForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
