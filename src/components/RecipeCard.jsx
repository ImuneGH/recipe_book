import '../css/recipeCard.css'

const RecipeCard = ({ filteredRecipe, foundRecipe }) => {
    return <div className="recipeCard">
                <img src={filteredRecipe.img} alt="" />
                <div className="recipeInfo">
                    <p title='Kategorie'>{filteredRecipe.category}</p>
                    <p title='Doba přípravy'>⏳ {filteredRecipe.cookTime}</p>
                </div>
                <h2 className="recipeName">{filteredRecipe.recipeName}</h2>
           </div>;
}

export default RecipeCard;