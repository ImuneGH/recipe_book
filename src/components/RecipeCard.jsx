import "../css/recipeCard.css";
import { motion } from "motion/react";

const RecipeCard = ({ recipeDisplayed, setActiveCategories, setActiveContent, setRecipeDetailActive, setSearchResult, setRandomRecipe, setClickedRecipeCard, recipes, setSearchValue }) => {
  const showRecipeDetail = (e) => {
    // resets
    setActiveCategories([]);
    setActiveContent(true);
    setSearchResult("");
    setSearchValue("");
    setRandomRecipe("");
    // sets
    const recipeToDisplayName = e.target.parentElement.children[2].textContent;
    setClickedRecipeCard(recipes.filter((recipeToDisplay) => recipeToDisplay.recipeName.includes(recipeToDisplayName)));
    setRecipeDetailActive(true);
  };

  const card = {
    start: { opacity: 0, rotateY: -180, x: -100 },
    end: { opacity: 1, rotateY: 0, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div title={recipeDisplayed.recipeName} onClick={showRecipeDetail} className="recipeCard" variants={card} initial="start" animate="end">
      <img src={"backend/" + recipeDisplayed.imgPath} alt="" />
      <div className="recipeInfo">
        <p title="Kategorie">{recipeDisplayed.category}</p>
        <p title="Doba přípravy">⏳ {recipeDisplayed.cookTime}</p>
      </div>
      <h2 className="recipeName">{recipeDisplayed.recipeName}</h2>
    </motion.div>
  );
};

export default RecipeCard;
