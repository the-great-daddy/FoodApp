import { useEffect, useState } from "react";
import styles from "./FoodDetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "fcb8de9cc89149ba8fbe78496cf7c5c7";
  useEffect(() => {
    async function fetchedFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchedFood();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⏳ {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            <strong>👨‍👩‍👧‍👦 Serves {food.servings} people </strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕 Vegetarian" : "🍗 Non-vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "✅ Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          <span>
            <strong>
              💲{(food.pricePerServing / 100).toFixed(1)} Per Servings
            </strong>
          </span>
        </div>
        <h1>Ingredients</h1>
        <ItemList food={food} isLoading={isLoading} />
        <h1>Instructions</h1>
        <div className={styles.recipeInstructions}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
