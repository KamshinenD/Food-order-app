import React from 'react';
import styles from "./Header.module.css"
import mealsImage from "../../assets/meals.jpg"
import HeaderCartBtn from './HeaderCartBtn';

const Header = (props) => {

  return (
    <>
        <header className={styles.header} >
            <h1>React Meals</h1>
            <HeaderCartBtn onshowModal={props.onshowModal}/>
        </header>
        <div className={styles['main-image']}>
            <img src={mealsImage} alt="A table full of meals" />
        </div>
    </>
  )
}

export default Header