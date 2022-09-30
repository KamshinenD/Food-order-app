// import React, { useContext, useEffect } from 'react'
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';
import { useRef, useState } from 'react';
// import CartContext from '../../../store/cart-context';


const MealItemForm = (props) => {
  const [quantityIsValid, setAmountIsValid] = useState(true);
  const quantityInputRef =useRef()
  const submitHandler=e=>{
    e.preventDefault();
    
    const enteredQuantity = quantityInputRef.current.value;
    const enteredQuantityNumber = +enteredQuantity
    
    if (enteredQuantity.trim().length === 0 || enteredQuantityNumber <1 || enteredQuantityNumber >5){
      setAmountIsValid(false)
      return;
    }
    
    props.onAddToCart(enteredQuantityNumber);
    
  }
  // const {items} = useContext(CartContext)
  
  // const [showSuccess, setShowSuccess]= useState(false)

    
    // useEffect(()=>{
    //   if(items.length === 0){
    //     return;
    //   }
    //   setShowSuccess(true)
      
    //   const timer= setTimeout(()=> {
    //     setShowSuccess(false)
    //   }, 300)
    // }, [items])
    
  
    return (
    <form className={styles.form} onSubmit={submitHandler}>
        <Input 
            ref={quantityInputRef}
            label='Amount'
            input= {{
                id: 'amount__' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: "1",
                defaultValue: '1',
                // placeholder: 'add a meal',
            }}/>
        <button> +Add</button>
        {!quantityIsValid && <p>Please enter a valid amount (1-5)</p>}
        {/* {showSuccess && <p className={styles.success}>Item added succesfully</p>} */}
    </form>
  )
}

export default MealItemForm