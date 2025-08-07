import "../css/content.css";
import RecipeDescription from "../components/RecipeDescription";
import { motion } from "motion/react";
import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";

const Content = ({
  activeContent,
  recipes,
  activeCategories,
  searchResult,
  randomRecipe,
  setActiveCategories,
  setActiveContent,
  setRecipeDetailActive,
  recipeDetailActive,
  setSearchResult,
  setRandomRecipe,
  setConfirmActive,
  setActualRecipeID,
  setConfirmMessage,
  setDataToEdit,
  handleEditFormActive,
  setSearchValue,
}) => {
  const [clickedRecipeCard, setClickedRecipeCard] = useState([]);
  const [formatedIngredients, setFormatedIngredients] = useState([]);
  const filteredCategory = activeCategories.length && recipes.filter((recipe) => activeCategories.includes(recipe.category));
  const filteredSearch = searchResult !== "" && recipes.filter((recipe) => recipe.recipeName.includes(searchResult));
  const recipesDisplayed = filteredCategory.length ? filteredCategory : filteredSearch.length ? filteredSearch : randomRecipe ? [randomRecipe] : [];
  const isEmpty = recipesDisplayed.length === 0 && activeContent && !recipeDetailActive;

  useEffect(() => {
    if (clickedRecipeCard.length > 0) {
      setFormatedIngredients(clickedRecipeCard[0].ingredients.split(", "));
    }
  }, [clickedRecipeCard]);

  const parentAnimation = {
    start: {},
    end: { transition: { staggerChildren: 0.1 } },
  };

  const cardAnimation = {
    start: { opacity: 0, rotateY: -180 },
    end: { opacity: 1, rotateY: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, rotateY: 180 },
  };

  const hoverAnimation = {
    scale: 1.03,
    y: -3,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 11,
    },
  };

  return (
    <main className="content">
      {!activeContent && (
        <motion.h1 layoutId="logo" style={{ width: "430px", height: "220px" }}>
          <img className="logo" src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
        </motion.h1>
      )}
      {recipeDetailActive && (
        <RecipeDescription
          clickedRecipeCard={clickedRecipeCard}
          formatedIngredients={formatedIngredients}
          setConfirmActive={setConfirmActive}
          setActualRecipeID={setActualRecipeID}
          setConfirmMessage={setConfirmMessage}
          setDataToEdit={setDataToEdit}
          handleEditFormActive={handleEditFormActive}
        />
      )}
      {recipesDisplayed && recipesDisplayed.length > 0 && (
        <motion.div className="animationContainer" variants={parentAnimation} initial="start" animate="end">
          {recipesDisplayed &&
            recipesDisplayed.map((recipeDisplayed) => (
              <RecipeCard
                hoverAnimation={hoverAnimation}
                cardAnimation={cardAnimation}
                key={recipeDisplayed.ID}
                recipeDisplayed={recipeDisplayed}
                setActiveCategories={setActiveCategories}
                setActiveContent={setActiveContent}
                setRecipeDetailActive={setRecipeDetailActive}
                setSearchResult={setSearchResult}
                setRandomRecipe={setRandomRecipe}
                setClickedRecipeCard={setClickedRecipeCard}
                clickedRecipeCard={clickedRecipeCard}
                recipes={recipes}
                setSearchValue={setSearchValue}
              />
            ))}
        </motion.div>
      )}
      {isEmpty && <p>Obsah je prázdný</p>}
    </main>
  );
};

export default Content;
