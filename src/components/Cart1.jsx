import { Link } from "react-router-dom";
import { AppContext } from "../state/context";

import { useContext } from "react";

import Navbar from "./Navbar";
import { renderCurrency } from "../utils";

//He intentado hacer una tarjeta para cada producto en el carrito con un boton para eliminar productos con su funcion, pero da error, mañana intentare darle una vuelta antes de la tutoría.

function Cart() {
  const { cart, dispatch } = useContext(AppContext)
  const CartContent = () => {

    return (
      <div className="cart__container" >

        {cart.items.sort((a, b) => a.productId - b.productId).map((item, i) => {
          return item.quantity > 0 && (
            <>
              <h4>Item #{i + 1}</h4>
              {/* <h5>{item.name}</h5> */}
              <span className="cart__row" key={item.title}>
                <div className="flex1">
                  <img src={item.imgUrl} alt={item.title} />

                </div>
                <div className="flex1">
                  <Link to={`/products/${item.productId}`}>{item.name}</Link>

                  <div className="row center">
                    <button className="affordance" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: { item } })}>-</button>
                    <p>Quantity: {item.quantity}</p>
                    <button className="affordance" onClick={() => dispatch({ type: "ADD_TO_CART", payload: { item } })}>+</button>
                  </div>
                  <p className="subtotal">Subtotal: €{renderCurrency(item.subtotal)}</p>
                </div>
              </span>
              <hr />
            </>
          )
        }


        )}

        <p className="total">Total: €{renderCurrency(cart.totalToPay)}</p>
        <div className="comprar">
          <button className="btn" onClick={() => window.confirm(`Total: ${renderCurrency(cart.totalToPay)}€. Continue below to enter card details `)}>Checkout</button>
        </div>
      </div>
    )

  }
  return (
    <main>
      <Navbar />
      <div className="cart container">
        <h2>Cart</h2>
        {!cart.totalItems > 0 ? (<p>YOUR CART IS EMPTY</p>) : (<>
          <CartContent />
        </>
        )}


      </div>
    </main >
  )

}

export default Cart