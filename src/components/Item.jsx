import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Item(props) {
  if (!props.full) {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            class="img-fluid"
            variant="top"
            src={props.elemento.image}
            alt={props.elemento.title}
          />
          <Card.Body>
            <Card.Title>
              <Link to={"/" + props.elemento.title.replaceAll(" ", "-")}>
                <h2>{props.elemento.title}</h2>
              </Link>
            </Card.Title>
            <Card.Text>
              <p>{props.elemento.price}€</p>
            </Card.Text>
            <Button
              variant="outline-success"
              onClick={() => props.addCart(props.elemento)}
            >
              Comprar
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else if (props.full) {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            class="img-fluid"
            variant="top"
            src={props.elemento.image}
            alt={props.elemento.title}
          />
          <Card.Body>
            <Card.Title>
              <Link to={"/" + props.elemento.title.replaceAll(" ", "-")}>
                <h2>{props.elemento.title}</h2>
              </Link>
            </Card.Title>
            <Card.Text>
              <p>{props.elemento.price}€</p>
              <p>{props.elemento.description}</p>
            </Card.Text>
            <Button
              variant="outline-success"
              onClick={() => props.addCart(props.elemento)}
            >
              Comprar
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Item;