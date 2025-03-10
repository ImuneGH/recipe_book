import '../css/recipeCard.css'

const RecipeCard = ({ filteredRecipe }) => {
    return <div className="recipeCard">
                <img src="" alt="" />
                <div className="recipeInfo">
                    <p title='Kategorie'>{filteredRecipe.category}</p>
                    <p title='Doba přípravy'>⏳ {filteredRecipe.cookTime}</p>
                </div>
                <h2 className="recipeName">{filteredRecipe.recipeName}</h2>
           </div>;
}

export default RecipeCard;