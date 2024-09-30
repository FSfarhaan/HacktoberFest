// src/App.js
import React from "react";
import AuthForm from "./components/AuthForm";
import PrUploadForm from "./components/PrUploadForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrUploadForm />}></Route>
        <Route path="/auth" element={<AuthForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
