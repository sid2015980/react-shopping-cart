import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

//context
import { CartContext } from "../src/context/CartContext";
import { ProductContext } from "../src/context/ProductContext";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart([...cart, item]);
  };

  const removeItem = (item) => {
    const filtered = cart.filter((selection) => selection.id !== item.id);
    setCart(filtered);
  };

  useEffect(() => {
    const checkCart = JSON.parse(localStorage.getItem("cart"));
    if (checkCart) {
      setCart(checkCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <CartContext.Provider value={{ cart, removeItem }}>
        <ProductContext.Provider value={{ products, addItem }}>
          <Navigation cart={cart} />

          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart cart={cart} />
          </Route>
        </ProductContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
