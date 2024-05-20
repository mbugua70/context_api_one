import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
import Cart from "../components/Cart";

export const CartContext = createContext({
  // this item will be available through the context.
  items: [],
  addToCartItem: () => {},
  updateToCartItem: () => {},
});

// reducer function
// it takes in two arguement state, and action
const shopCartReducerFun = (state, action) => {
  let updatedItems;
  switch (action.type) {
    case "ADD_ITEM":
      updatedItems = [...state.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload
        );
        updatedItems.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
      break;

    case "UPDATE_ITEM":
      updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
      break;
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  // use of useReducer function
  // it return an array with two property first being the state and the second being a dispatch function
  // useReducer hooks takes in two arguement , the first one being the reducer function and second one being the intial value
  const [shopCartStateItem, shopCartDispatch] = useReducer(shopCartReducerFun, {
    items: [],
  });
  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });

  function handleAddItemToCart(id) {
    // setShoppingCart((prevShoppingCart) => {});
    shopCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    // setShoppingCart((prevShoppingCart) => {
    //   const updatedItems = [...prevShoppingCart.items];
    //   const updatedItemIndex = updatedItems.findIndex(
    //     (item) => item.id === productId
    //   );

    //   const updatedItem = {
    //     ...updatedItems[updatedItemIndex],
    //   };

    //   updatedItem.quantity += amount;

    //   if (updatedItem.quantity <= 0) {
    //     updatedItems.splice(updatedItemIndex, 1);
    //   } else {
    //     updatedItems[updatedItemIndex] = updatedItem;
    //   }

    //   return {
    //     items: updatedItems,
    //   };
    // });

    shopCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
  }

  const cartItems = {
    items: shopCartStateItem.items,
    addToCartItem: handleAddItemToCart,
    updateToCartItem: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={cartItems}>{children}</CartContext.Provider>
  );
};
