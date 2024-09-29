import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Err from "./Err.jsx";
const requestConfig = {};
export default function Meals() {
  const { data: loadedMeals, isLoading, error} = useHttp("http://localhost:3000/meals", requestConfig, []);
  if (isLoading){
    return <p className="center">Fetching data...</p>
  }

  if (error){
    return <Err title={"Couldn't load meals"} message={error}/>
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
