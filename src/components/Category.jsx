import Productos from "./Productos";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Navbar1 from "./Navbar";
import { useParams } from "react-router-dom";
import { capitalize } from "../utils";
import { AppContext } from "../state/context";
import { useContext } from "react";

const Category = () => {
  const { category } = useParams();
  const { searchKey, productos } = useContext(AppContext)
  function condition(searchItem) {
    return new RegExp(`${searchItem}`, "gi")
  }
  function filterData(searchItem, state) {
    console.log({ searchItem, state })
    if (!searchItem) {
      return state
    } else {
      return state.filter(item => condition(searchItem).test(JSON.stringify(item)))
    }
  }

  const productosPorCategoria = filterData(searchKey, productos)?.reduce((accum, current) => {
    if (!accum.find(item => item.category === current.category)) {
      accum.push({ category: current.category, products: [current] })
    } else {
      accum.map(item => {
        if (item.category === current.category) {
          return { ...item, products: item.products.push(current) }
        } else {
          return item
        }
      })
    }
    return accum
  }, [])
  const productosFiltrados = productosPorCategoria.filter(item => item.category === category)

  const RenderProductos = (props) => {
    return props.data?.map(item => {
      return (
        <Col key={item.id}>
          <Productos
            datos={item}
            // addCart={props.addCart}
            key={item.id}
            full={false}
          />
        </Col>
      )
    })
  }
  const RenderComponente = () => {
    return productosFiltrados?.map((datos) => {
      return (
        <div key={datos.category}>
          {datos.category === "jewelery" ?
            (<h2>Jewelry</h2>) :
            (<h2>{`${capitalize(datos.category)} `}</h2>)}

          < Row className="g-4" xs={1} s={2} md={3} lg={3} xl={4}>
            <RenderProductos data={datos?.products} />
          </Row>
        </div >
      );
    })

  }
  return (
    <main>
      <Navbar1 />

      <div className="container">

        <RenderComponente />

      </div>
    </main>

  );
}

export default Category;