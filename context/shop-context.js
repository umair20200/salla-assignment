import { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../constant";

export const ShopContext = createContext(null);



export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

 

  const addToCart = (item) => {
    setCartItems((prev) => prev.concat(item));
  };

  const removeFromCart = (itemId) => {
  
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};