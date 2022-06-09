import React, { createContext, useContext, useState, useEffect } from "react";

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //LOGIC TO ADD ITEMS TO CART
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice + quantity * product.defaultProductVariant.price
    );

    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedItems = cartItems.map((cartProduct) => {
        if (cartProduct._id == product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.title} added to the cart`);
  };

  //LOGIC TO UPDATE ITEMS IN CART
  let foundProduct;
  let index;

  const toggleCartItemQuantity = (id, value) => {
    //find the found product and its index
    foundProduct = cartItems.find((item) => item._id == id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      //update items in cart

      newCartItems.splice(index, 0, {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      });

      setCartItems(newCartItems);

      //update the price
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice + foundProduct.defaultProductVariant.price
      );

      //update the quantities
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value == "dec") {
      if (foundProduct.quantity > 1) {
        //update items in cart

        newCartItems.splice(index, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });

        setCartItems(newCartItems);

        //update the price
        setTotalPrice(
          (prevTotalPrice) =>
            prevTotalPrice - foundProduct.defaultProductVariant.price
        );

        //update the quantities
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const onRemove = (id) => {
    //find the found product and its index
    foundProduct = cartItems.find((item) => item._id == id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice -
        foundProduct.defaultProductVariant.price * foundProduct.quantity
    );

    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );

    setCartItems(newCartItems);
  };

  //INCREASE QUANTITY OF SINGLE ITEM
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //DECREASE QUANTITY OF SINGLE ITEM
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//allows state to be used like a hook
export const useStateContext = () => useContext(Context);
