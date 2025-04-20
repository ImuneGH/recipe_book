import '../css/recipeCard.css'

const RecipeCard = ({ recipeDisplayed }) => {
    return <div className="recipeCard">
                <img src={recipeDisplayed.img} alt="" />
                <div className="recipeInfo">
                    <p title='Kategorie'>{recipeDisplayed.category}</p>
                    <p title='Doba přípravy'>⏳ {recipeDisplayed.cookTime}</p>
                </div>
                <h2 className="recipeName">{recipeDisplayed.recipeName}</h2>
           </div>;
}

export default RecipeCard;