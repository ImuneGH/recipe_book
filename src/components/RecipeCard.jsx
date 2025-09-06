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
  setSearchValue,
  cardAnimation,
  hoverAnimation,
  setPreviousState,
  activeCategories,
  searchResult,
  randomRecipe,
  searchValue,
}) => {
  const showRecipeDetail = (recipeToDisplay) => {
    // sets
    setPreviousState({ activeCategories, searchResult, randomRecipe, searchValue });
    setClickedRecipeCard(recipeToDisplay);
    setRecipeDetailActive(true);
    // resets
    setActiveCategories([]);
    setActiveContent(true);
    setSearchResult("");
    setRandomRecipe("");
    setSearchValue("");
  };

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.2, type: "tween" } }}
      title={recipeDisplayed.recipeName}
      onClick={() => {
        showRecipeDetail(recipeDisplayed);
      }}
      className="recipeCard"
      variants={cardAnimation}
      whileHover={hoverAnimation}
      initial="start"
      animate="end"
      exit="exit"
    >
      <img src={recipeDisplayed.imgPath} alt="" />
      <div className="recipeInfo">
        <p title="Kategorie">{recipeDisplayed.category}</p>
        <p title="Doba přípravy">⏳ {recipeDisplayed.cookTime}</p>
      </div>
      <h2 className="recipeName">{recipeDisplayed.recipeName}</h2>
    </motion.div>
  );
};

export default RecipeCard;
