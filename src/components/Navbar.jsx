import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../state/context";
import { ReactComponent as CartIcon } from '../assets/cart.svg'
import { ReactComponent as LogoIcon } from '../assets/ecommerce.svg'

function Navbar() {
  const [formState, setFormState] = useState({ search: "" })
  const [isOpen, setIsOpen] = useState(false)
  const { cart, dispatch } = useContext(AppContext);

  function handleChange(e) {
    console.log("From handle change")
    setFormState({ ...formState, search: e.target.value })
    // if (formState.search > 2) {
    return dispatch({
      type: "BUSCAR",
      payload: { searchItem: e.target.value }
    })
    // }
  }
  return (

    <nav>
      <span className="navbar">
        <span className="mobile">
        <NavLink to="/" className="navbar__item"> <LogoIcon className="logo" /></NavLink>
         

          <div className="burger" onClick={() => { setIsOpen(!isOpen) }}>
            <span className={isOpen ? "burger__icon isOpen" : "burger__icon"}></span>
            {isOpen && (
              <span className="dropdown__menu">
                <ul>
                  <li onClick={() => setIsOpen(!isOpen)}><NavLink to="/category/electronics" className="dropdown__item">Electronics</NavLink></li>
                  <li onClick={() => setIsOpen(!isOpen)}><NavLink to="/category/jewelery" className="dropdown__item">Jewelry</NavLink></li>
                  <li onClick={() => setIsOpen(!isOpen)}><NavLink to="/category/men's clothing" className="dropdown__item">Men's Clothing</NavLink></li>
                  <li onClick={() => setIsOpen(!isOpen)}> <NavLink to="/category/women's clothing" className="dropdown__item">Women's Clothing</NavLink></li>
                  <li onClick={() => setIsOpen(!isOpen)}> <NavLink to="/cart" className="dropdown__item">Cart</NavLink></li>
                  <li onClick={() => setIsOpen(!isOpen)}> <NavLink to="/contact" className="dropdown__item">Contact</NavLink></li>
                </ul>
              </span>
              
              
            )
            }
            </div>
        </span>
            

        <span className="navbar__block">
          <LogoIcon className="logo" />
          <NavLink to="/" className="navbar__item">Home</NavLink>
          <NavLink to="/contact" className="navbar__item">Contact</NavLink>
          <span className="dropdown">
            <span className="dropdown__title" onClick={() => setIsOpen(!isOpen)}>Categories</span>
            {isOpen && (
              <span className="dropdown__menu">
                <ul>
                  <li onClick={() => setIsOpen(!isOpen)}><NavLink to="/category/electronics" className="dropdown__item">Electronics</NavLink></li>
                  <li onClick={() => setIsOpen(!isOpen)}><NavLink to="/category/jewelery" className="dropdown__item">Jewelry</NavLink></li>
                  <li onClick={() => setIsOpen(!isOpen)}><NavLink to="/category/men's clothing" className="dropdown__item">Men's Clothing</NavLink></li>
                  <li onClick={() => setIsOpen(!isOpen)}> <NavLink to="/category/women's clothing" className="dropdown__item">Women's Clothing</NavLink></li>
                  
                </ul>
              </span>
            )
            }
          </span >
        </span >
        <span className="navbar__block">
          <input type="text" placeholder="Search" className="navbar__search-input" onChange={(e) => handleChange(e)} />
          <span className={!cart.totalItems > 0 ? "icon" : "icon full"}>
            <Link to="/cart">

              <CartIcon className="icon__svg" />
            </Link>
            {cart.totalItems === 1 && <span className="icon__bubble first">{cart.totalItems}</span>}
            {cart.totalItems > 1 && <span className="icon__bubble">{cart.totalItems}</span>}
          </span>
        </span>
      </span >

    </nav >

  );
}

export default Navbar;