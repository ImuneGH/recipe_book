import "../css/recipeCard.css";
import { motion } from "motion/react";

const RecipeCard = ({
  recipeDisplayed,
  setActiveCategories,
  setActiveContent,
  setRecipeDetailActive,
  setSearchResult,
  setRandomRecipe,
  setClickedRecipeCard,
  recipes,
  setSearchValue,
  cardAnimation,
  hoverAnimation,
}) => {
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

  return (
    <motion.div title={recipeDisplayed.recipeName} onClick={showRecipeDetail} className="recipeCard" variants={cardAnimation} whileHover={hoverAnimation}>
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
