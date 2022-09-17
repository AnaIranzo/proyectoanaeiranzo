import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppContextProvider } from "./state/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Producto from "./components/Producto";
import Category from "./components/Category";
import Cart from "./components/Cart1";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/category/:category"
            element={
              // <Category data={filterData(searchKey, productos)} />
              <Category />
            }
          />
          <Route path="/products/:id"
            element={
              <Producto />
            }
          />
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();