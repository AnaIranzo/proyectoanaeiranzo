
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



  /* async function fetchCategory() {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${selected}`
    );
    const datos = await res.json();
    console.log({ datos });
    setCategory(datos);
  } */
  /* useEffect(() => {
    let isMounted = true
    if (isMounted) {
      initialFetch()
    }
    return (() => {
      isMounted = false
    })
  }, []); */
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
  /*  useEffect(() => {
    fetchCategory();
    // fetch(`https://fakestoreapi.com/products/category/${selected}`)
    //   .then((res) => res.json())
    //   .then((datos) => {
    //     console.log("Category", { datos });
    //     setCategory(datos);
    //   });
  }, [fetchCategory]); */

  /*   function addCart(datos) {
      cart.push([...cart, datos]);
      console.log(cart);
    }
    function filterProductsByCategory(category) {
      productos.filter((producto) => {
        return producto.category === category;
      });
    } */
  return (

    <>

      {error && <p>{error}</p>}
      <Main data={filterData(searchKey, productos)} />
     

    </>


  );
}

export default App;