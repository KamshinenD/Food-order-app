import React, {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import styles from "./headerCartBtn.module.css"
import CartContext from '../../store/cart-context';

const HeaderCartBtn = (props) => {
  const ctx = useContext(CartContext);
  
  const numberOfCartItems = ctx.items.reduce((currNum, item)=> {
    return currNum + item.quantity;
  }, 0)
  // const numberOfCartItems = ctx.items.length
  const [btnIsHighlighted, setBtnIsHighlighted]= useState(false);
  
  const btnClasses =` ${styles.button} ${btnIsHighlighted &&  styles.bump}`;
  
  const {items} = ctx;
  
    useEffect(()=>{
      if (items.length === 0){
        return;
      }
      setBtnIsHighlighted(true)
      
      const timer= setTimeout(()=> {
        setBtnIsHighlighted(false)
      }, 300)
      
      return ()=>{
        clearTimeout(timer);
      }
    }, [items])

  return (
    <button className={btnClasses} onClick={props.onshowModal}>
       <span className={styles.icon}>
        <CartIcon/>
       </span>
       <span>Your Cart</span>
       <span className={styles.badge}>
        {numberOfCartItems}
       </span>
    </button>
  )
}

export default HeaderCartBtn;