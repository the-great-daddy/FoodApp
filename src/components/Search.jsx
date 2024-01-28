import { useEffect, useState } from "react";
import styles from "./Search.module.css";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");
  const URL = "https://api.spoonacular.com/recipes/complexSearch";
  const API_KEY = "fcb8de9cc89149ba8fbe78496cf7c5c7";

  //   syntax of a useEffect hook
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      setFoodData(data.results);
      console.log(data.results);
    }
    fetchFood();
  }, [query]);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        value={query}
        onChange={(Event) => setQuery(Event.target.value)}
        type="text"
      />
    </div>
  );
}
