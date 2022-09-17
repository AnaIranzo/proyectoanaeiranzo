
import "./App.sass";
import { useEffect, useState, useContext, useMemo } from "react";
import Productos from "./components/Productos";
import Producto from "./components/Producto";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import Main from "./components/Main";
import Item from "./components/Item";

import Navbar1 from "./components/Navbar";
import { AppContext, AppContextProvider } from "./state/context";
import { Actions } from "./state/reducer";
import { initialFetch } from "./state/apiCalls";
import { useCallback } from "react";


const App = () => {
  let [data, setData] = useState([]);
  let [cart, setCart] = useState([]);

  let [selected, setSelected] = useState("");
  const context = useContext(AppContext);
  const { estaCargando, dispatch, productos, searchKey, error } = context


  useEffect(() => {
    let isMounted = true
    if (productos.length === 0 && isMounted) {
      console.log("INITIAL FETCH");
      dispatch({ type: "CARGA_INICIAL" });
      fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(datos => {

          dispatch({
            type: "CARGA_EXITOSA",
            payload: { productos: datos }
          })
          localStorage.setItem("productos", JSON.stringify(datos))
        })
    }

    return (() => {
      isMounted = false
    })


  }, [searchKey]);


  function condition(searchItem) {
    return new RegExp(`${searchItem}`, "gi")
  }
  function filterData(searchItem, state) {
    console.log({ searchItem, state })
    if (!searchItem) {
      return state
    } else {
      return state.filter(item => condition(searchItem).test(JSON.stringify(item.title)))
    }
  }
  console.log(filterData(searchKey, productos))

  return (

    <>

      {error && <p>{error}</p>}
      <Main data={filterData(searchKey, productos)} />
     

    </>


  );
}

export default App;