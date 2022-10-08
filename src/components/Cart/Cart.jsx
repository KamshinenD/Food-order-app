import React, { useContext, useState } from "react";
// import Modal from '../UI/Modal';
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import confirmImg from "../../assets/confirm.png";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [buyerName, setBuyerName] = useState("");

  const getName = (enteredName) => {
    setBuyerName(enteredName);
  };

  const cartCtx = useContext(CartContext);

  const totalPrice = `$ ${cartCtx.totalPrice.toFixed(2)}`;

  const cartHasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  const handleOrderBtn = (e) => {
    e.preventDefault();
    setShowCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://food-order-app-94e85-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          name={item.name}
          quantity={item.quantity}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  return (
    <>
      {!isSubmitting && (
        <div>
          {!showCheckout && (
            <div> 
              {cartHasItems && [cartItems]}
              {!cartHasItems && (<p>Cart has no items, Kindly add items to cart</p>)}
              
              <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalPrice}</span>
              </div>
            </div>
          )}
          {showCheckout && !didSubmit && (
            <Checkout
              setShowCheckout={setShowCheckout}
              submitOrderHandler={submitOrderHandler}
              getName={getName}
            />
          )}
          {!showCheckout && (
            <div className={styles.actions}>
              <button className={styles["button--alt"]} onClick={props.onClick}>
                Close
              </button>
              {cartHasItems && (
                <button className={styles.button} onClick={handleOrderBtn}>
                  Order
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {isSubmitting && <p> Submitting Order...</p>}
      
      {didSubmit && (
        <div>
          <div className={styles.confirm}>
            <img className={styles.img} src={confirmImg} alt='Confirmed' />
          </div>
          <p className={styles["confirm-text"]}>
            Dear {buyerName}, Your order has been submitted Succesfully. You will
            be contacted by our team as soon as possible
          </p>
          <div className={styles.actions}>
            <button className={styles.button} onClick={props.onClick}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
