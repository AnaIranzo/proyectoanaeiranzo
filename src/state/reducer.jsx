export function reducer(state, action) {
    switch (action.type) {
      case "CARGA_INICIAL":
        console.log("Dispara Carga Inicial");
        return {
          ...state,
          estaCargando: true,
        };
      case "CARGA_EXITOSA":
        console.log("Dispara Carga Exitosa", action.payload, { state });
        return {
          ...state,
          estaCargando: false,
          error: null,
          productos: action.payload.productos,
        };
      case "CARGA_EXITOSA_PRODUCTO":
        console.log("Dispara Carga Exitosa", action.payload, { state });
        return {
          ...state,
          estaCargando: false,
          error: null,
        };
      case "CARGA_FALLIDA":
        console.log("Dispara Carga Fallida", action.payload);
        return {
          estaCargando: false,
          error: action.payload.error,
          productos: [],
        };
  
      case "BUSCAR":
        console.log("disparando búsqueda", { state })
  
        return {
          ...state,
          searchKey: action.payload.searchItem
  
        }
      case "ADD_TO_CART":
        console.log("ADD_TO_CART", { state, action: action.payload.item })
        const newCart = (cart, elem) => {
          console.log("From new cart", { cart, elem })
          let newItems = []
          const foundItem = cart.items?.find(item => item.productId === elem.productId)
          console.log({ foundItem })
          if (!foundItem) {
            newItems = [...cart.items, { ...elem, quantity: 1, subtotal: elem.price }]
  
          } else {
            newItems = [...cart.items.filter(item => item !== foundItem),
            {
              ...foundItem,
              quantity: foundItem.quantity + 1,
              subtotal: (foundItem.quantity + 1) * foundItem.price
            }]
          }
  
          console.log({ newItems })
          const totalToPay = newItems.reduce((accum, current) => {
            accum = accum + (current.price * current.quantity)
            return accum
          }, 0)
          const totalItems = newItems.reduce((accum, current) => {
            accum = accum + current.quantity
            return accum
          }, 0)
          console.log({ totalToPay, totalItems })
          const result = {
  
            items: newItems,
            totalToPay,
            totalItems
  
          }
          console.log({ result })
          return result
        }
  
        return {
          ...state,
          cart: newCart(state.cart, action.payload.item)
        }
  
  
      case "REMOVE_FROM_CART":
        console.log("REMOVE_FROM_CART", { state, action: action.payload.item })
        const newCart2 = (cart, elem) => {
          console.log("From new cart", { cart, elem })
          let accumItems = []
          const foundItem = cart.items?.find(item => item.productId === elem.productId)
          console.log({ foundItem })
          if (foundItem) {
            accumItems = [...cart.items.filter(item => item !== foundItem), { ...foundItem, quantity: foundItem.quantity - 1, subtotal: (foundItem.quantity - 1) * foundItem.price }]
  
          } else {
            accumItems = [...cart.item.filter(item => item.quantity > 0)]//quiero dejarlo como esta, no se si es asi
          }
  
          console.log({ accumItems })
          const totalToPay = accumItems.reduce((accum, current) => {
            accum = accum + (current.price * current.quantity)
            return accum
          }, 0)
          const totalItems = accumItems.reduce((accum, current) => {
            accum = accum + current.quantity
            return accum
          }, 0)
  
          const result = {
  
            items: accumItems,
            totalToPay,
            totalItems
  
          }
          console.log({ result })
          return result
        }
  
        return {
          ...state,
          cart: newCart2(state.cart, action.payload.item)
        }
  
      default:
        return state;
  
    }
  }