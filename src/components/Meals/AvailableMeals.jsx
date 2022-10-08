import React, {useEffect, useState} from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./mealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];


const AvailableMeals = () => {
  const [meals, setMeals] =useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpEror, setHttpError]= useState(null)

  useEffect(()=>{ 
    const fetchMeals = async ()=>{
      setIsLoading(true)
     const response = await fetch('https://food-order-app-94e85-default-rtdb.firebaseio.com/meals.json');
     
     if(!response.ok){
      throw new Error("Something went wrong")
     }
     
     const responseData = await response.json();
  
     const loadedMeals =[];
     for (const key in responseData ){
        loadedMeals.push({
          id:key,
          name: responseData[key].Name,
          description: responseData[key].description,
          price: responseData[key].price
        })
     }
     setMeals(loadedMeals);
     setIsLoading(false);
    }
    
     fetchMeals().catch(error =>{
       setIsLoading(false)
       setHttpError(error.message)
     });
  }, []);

  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={classes.meals}>
      {isLoading? 
        (<h1 className={classes.loading}>Loading...</h1>) :
      httpEror? (<h1 className={classes.errorMessage}>{httpEror}</h1>):
        (<Card>
          <ul meal={mealList.meal}>{mealList}</ul>
        </Card>
        )}
    </section>
  );
};

export default AvailableMeals;
