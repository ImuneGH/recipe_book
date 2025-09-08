import { useEffect } from "react";
import "../css/recipeDescription.css";

const RecipeDescription = ({ clickedRecipeCard, formatedIngredients, setConfirmActive, setActualRecipeID, setConfirmMessage, setDataToEdit, handleEditFormActive, handlePreviousState }) => {
  const recipeName = clickedRecipeCard.recipeName;
  useEffect(() => {
    setDataToEdit(clickedRecipeCard);
    setActualRecipeID(clickedRecipeCard.ID);
  }, []);

  console.log(clickedRecipeCard);

  return (
    <div className="recipeDescription">
      <div className="leftContent">
        <div className="backButton">
          <button onClick={handlePreviousState}>⬅️ Zpět</button>
        </div>
        <div className="foodPhoto">
          <img src={clickedRecipeCard.imgPath} alt="fotka jídla" />
        </div>
        <div className="ingredients">
          <h3>Ingredience:</h3>
          <ul className="ingredientsList">
            {formatedIngredients.map((formatedIngredient) => (
              <li key={formatedIngredient} className="ingredientItem">
                {formatedIngredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rightContent">
        <div className="actionButtons">
          <button onClick={handleEditFormActive} className="edit">
            📝 edit
          </button>
          <button
            onClick={() => {
              setConfirmActive(true);
              setConfirmMessage(`Určitě chcete smazat recept ${recipeName}?`);
            }}
            className="delete"
          >
            🗑 delete
          </button>
        </div>
        <div className="metaData">
          <h2>{clickedRecipeCard.recipeName}</h2>
          <ul className="recipeMetaData">
            <li className="category">{clickedRecipeCard.category}</li>
            <li className="cookTime">{clickedRecipeCard.cookTime}</li>
            <li className="author">{clickedRecipeCard.author}</li>
          </ul>
        </div>
        <div className="recipeInstructions">
          <h3>Postup:</h3>
          <p>{clickedRecipeCard.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDescription;
