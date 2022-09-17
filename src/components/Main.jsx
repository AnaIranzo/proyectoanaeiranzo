import Productos from "./Productos";


import Navbar from "./Navbar";
import { capitalize, productosPorCategoria } from "../utils";

const Main = (props) => {

  const RenderProductos = (props) => {
    return props.data?.map(item => {
      return (

        <Productos
          datos={item}
          // addCart={props.addCart}
          key={item.id}
          full={false}
        />

      )
    })
  }
  const RenderComponente = () => {
    return productosPorCategoria(props.data)?.map((datos) => {
      return (
        <div key={datos.category}>
          {datos.category === "jewelery" ?
            (<h2>Jewelry</h2>) :
            (<h2>{`${capitalize(datos.category)} `}</h2>)}
          <div className="row">
            <RenderProductos data={datos?.products} />
          </div>
        </div>
      );
    })

  }
  return (
    <>
    <main>
      <Navbar />
      <div className="container">
        <RenderComponente />
      </div>

    </main>



</>

  );
}

export default Main;