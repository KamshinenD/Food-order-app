import CartContext from "./cart-context";
import { useReducer } from "react";

// Initial state to be passed into the useReducer
const defaultCartState = {
  items: [],
  totalPrice: 0,
};

// Defining the actions in the reducer
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // const updatedItems = state.items.concat(action.item);

    //existingCartItemIndexfinds if the Id of the item already exists.
    //if it does, it will return the index of that item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const UpdatedTotalPrice =
      state.totalPrice + action.item.price * action.item.quantity;
    return {
      items: updatedItems,
      totalPrice: UpdatedTotalPrice,
    };
  }

if (action.type === "REMOVE_ITEM"){  
const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex]
    const UpdatedTotalPrice = state.totalPrice -existingItem.price;
    let updatedItems;
    if(existingItem.quantity === 1){
        updatedItems =state.items.filter(item => item.id !== action.id)
    } else{
        const updatedItem = { ...existingItem, quantity: existingItem.quantity -1 }
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] =updatedItem;
      }
      return{
        items: updatedItems,
        totalPrice: UpdatedTotalPrice,
      }
    }  
  return defaultCartState;
};

// The main provider component
const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHanlder = (id) => {
    dispatchCartState({ type: "REMOVE_ITEM", id: id });
  };

  // Defining a helper to house all our states and actions
  const cartContextHandler = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHanlder,
  };

  return (
    <CartContext.Provider value={cartContextHandler}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
