import "../css/recipeDescription.css"

const RecipeDescription = ({ clickedRecipeCard, formatedIngredients }) => {
    return <div className="recipeDescription">
        <div className="leftContent">
            <div className="foodPhoto">
                <img src="/img/livance.JPEG" alt="fotka jídla" />
            </div>
            <div className="ingredients">
                <h3>Ingredience:</h3>
                <ul className="ingredientsList">
                    {formatedIngredients.map(formatedIngredient => <li key={formatedIngredient} className="ingredientItem">{formatedIngredient}</li>)}
                </ul>
            </div>
        </div>

        <div className="rightContent">
            <div className="actionButtons">
                <button className="edit">📝 edit</button>
                <button className="delete">🗑 delete</button>
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
    </div>;
}

export default RecipeDescription;