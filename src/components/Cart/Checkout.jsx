import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => (value.trim().length === 0);
const isFiveCharacters = (value)=> value.trim().length === 5;
const isEmail = (value)=> value.includes('@' && '.com');

const Checkout = (props) => {

  const [formInputsValidity, setFormInputsValidity]= useState({
      name: true,
      street: true,
      city: true,
      postalCode:  true,
      email: true
})
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const emailInputRef = useRef();

  const handleCancelCheckout = (e) => {
    e.preventDefault();
    props.setShowCheckout(false);
  };

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveCharacters(enteredPostalCode);
    const enteredEmailIsValid = isEmail(enteredEmail);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
      email: enteredEmailIsValid
    })
    
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid &&
      enteredEmailIsValid;

      if (!formIsValid){
        return;
      } 
      props.submitOrderHandler({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity,
        email: enteredEmail
      });
      props.getName(enteredName);
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <h2>Please fill your details below</h2>
      <div className= {` ${classes.control} ${formInputsValidity.name? '': classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Name cannot be empty</p>}
      </div>
      <div className={` ${classes.control} ${formInputsValidity.street? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Street address cannot be empty</p>}
      </div>
      <div className={` ${classes.control} ${formInputsValidity.postalCode ? '': classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please input a valid postal code (5 characters long)</p>}
      </div>
      <div className= {` ${classes.control} ${formInputsValidity.city? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p> Please input name of city</p>}
      </div>
      <div className= {` ${classes.control} ${formInputsValidity.email? '' : classes.invalid}`}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailInputRef} />
        {!formInputsValidity.email && <p> Please input a valid email address</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={handleCancelCheckout}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
