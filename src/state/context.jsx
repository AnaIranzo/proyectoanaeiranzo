import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
// const item = { productId: "", price: 0, quantity: 0, subtotal }
const initialState = {
  estaCargando: false,
  error: null,
  // productos: [],
  productos: !localStorage.getItem("productos") ? [] : JSON.parse(localStorage.getItem("productos")),
  searchKey: "",
  cart: {
    items: [
    ],
    totalToPay: 0,
    totalItems: 0
  }
};


export const AppContext = createContext(initialState);
export function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{
        estaCargando: state.estaCargando,
        error: state.error,
        productos: state.productos,
        searchKey: state.searchKey,
        cart: state.cart,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}