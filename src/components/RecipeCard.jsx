import "../css/recipeCard.css";

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

  return (
    <div onClick={showRecipeDetail} className="recipeCard">
      <img src={"backend/" + recipeDisplayed.imgPath} alt="" />
      <div className="recipeInfo">
        <p title="Kategorie">{recipeDisplayed.category}</p>
        <p title="Doba přípravy">⏳ {recipeDisplayed.cookTime}</p>
      </div>
      <h2 className="recipeName">{recipeDisplayed.recipeName}</h2>
    </div>
  );
};

export default RecipeCard;
