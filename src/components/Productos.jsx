import { useContext } from "react";

import { Link } from "react-router-dom";
import { AppContext } from "../state/context";

function Productos(props) {
  const { estaCargando } = useContext(AppContext)
  if (!props.full) {
    return (
      <>
        <div className="card" key={props.id}>
          <figure className={estaCargando ? "skeleton" : ""}>
            <img className="card__img"
              src={props.datos.image}
              alt={props.datos.title}
            />
          </figure>
          <div className="card__body">
            <div className="card__title">
              <Link to={`/products/${props.datos.id}`}>
                {props.datos.title}
              </Link>
            </div>
            <div className="card__text">
              {props.datos.price}€
            </div>

          </div >
        </div>
      </>
    );
  } else if (props.full) {
    return (
      <>
        <div className="card">
          <figure>
            <img className="card__img"


              src={props.producto.image}
              alt={props.producto.title}
            />
          </figure>
          <div className="card__body">
            <div className="card__title">
              <Link to={`/products/${props.producto.id}`}>
                {props.producto.title}
              </Link>
            </div >
            <div className="card__text">
              <>
                {`${props.producto.price}€`}
                {`${props.producto.description}`}

              </>
            </div >

          </div >
        </div>
      </>
    );
  }
}
export default Productos;