import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar1 from './Navbar'

import { useContext } from 'react';
import { AppContext } from '../state/context';




function Producto(props) {
  const { id } = useParams()
  const { cart, dispatch, estaCargando, error } = useContext(AppContext)
  const [data, setData] = useState({})
  useEffect(() => {
    dispatch({ type: "CARGA_INICIAL" })
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json()).then(datos => {
        setData(datos)
        dispatch({ type: "CARGA_EXITOSA_PRODUCTO" })
      }).catch(error => {
        console.log(error)
        dispatch({ type: "CARGA_FALLIDA", payload: { error: error.message } })
      })

  }, [])
  function handleClick() {
    console.log("handle Click")
    dispatch({
      type: "ADD_TO_CART", payload: {
        item: {
          productId: data.id,
          price: data.price,
          name: data.title,
          imgUrl: data.image

        }
      }
    })
  }
  return (
    <>

      {/*  {error && !estaCargando && <p>{error}</p>}
      {estaCargando && !error ? <p>Cargando...</p>
        :
        (<> */}


      <Navbar1 />
      <div className="container__prod">
        <div className="card__prod" key={data.id}>
          <div className="card__prod__imgcontainer">
            <figure className={estaCargando ? "skeleton" : ""}>
              <img className="card__img"
                src={data.image}
                alt={data.title}
              />
            </figure>
          </div>
          <div className="card__body">
            <h3 className={estaCargando ? "card__title skeleton" : "card__title"}>
              {data.title}
            </h3>
            <div className={estaCargando ? "card__text skeleton" : "card__text"}>
              <p>{data.description}</p>
              {data.price}€
            </div>
            <button className="btn" onClick={() => handleClick()}>Add to Cart</button>
          </div>
        </div>
      </div>















      {/* <div class="product-card">
        <div class="product-details">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <p>{data.price}</p>
          <button type="button" class="btn" onClick={() => handleClick()}>Buy Now</button>
        </div>
        <div class="product-image">
          <img src={data.image} alt={data.title} />
        </div>
      </div> */}

      {/*   <div style={{ minHeight: "300px", overflowWrap: "break-word" }}>
        <pre>{JSON.stringify({ cart })}</pre>
        {cart.items.map(item => (
          <>
            <p>Product Id: {item.productId}</p>
            <p>Quantity: {item.quantity}</p>
          </>
        ))}
        <p><strong>Items</strong>: {cart.items.length}</p>
        <p>Total: €{cart.total}</p> 
        <p>Total: €{(Number(cart.total)).toLocaleString("es-es", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</p>
      </div>  */}

    </>
    // )}
    // </>
  )
}

export default Producto



