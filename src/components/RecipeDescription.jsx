import { useEffect } from "react";
import "../css/recipeDescription.css";

const RecipeDescription = ({ clickedRecipeCard, formatedIngredients, setConfirmActive, setActualRecipeID, setConfirmMessage, setDataToEdit, handleEditFormActive }) => {
  const recipeName = clickedRecipeCard[0].recipeName;
  useEffect(() => {
    setDataToEdit(clickedRecipeCard[0]);
  }, []);

  return (
    <div className="recipeDescription">
      <div className="leftContent">
        <div className="foodPhoto">
          <img src={"backend/" + clickedRecipeCard[0].imgPath} alt="fotka jídla" />
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
              setActualRecipeID(clickedRecipeCard[0].ID);
              setConfirmMessage(`Určitě chcete smazat recept ${recipeName}?`);
            }}
            className="delete"
          >
            🗑 delete
          </button>
        </div>
        <div className="metaData">
          <h2>{clickedRecipeCard[0].recipeName}</h2>
          <ul className="recipeMetaData">
            <li className="category">{clickedRecipeCard[0].category}</li>
            <li className="cookTime">{clickedRecipeCard[0].cookTime}</li>
            <li className="author">{clickedRecipeCard[0].author}</li>
          </ul>
        </div>
        <div className="recipeInstructions">
          <h3>Postup:</h3>
          <p>{clickedRecipeCard[0].instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDescription;
