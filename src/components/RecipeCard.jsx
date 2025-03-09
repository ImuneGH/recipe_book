import '../css/recipeCard.css'

const RecipeCard = ({ recipes }) => {
    return <div className="recipeCard">
                <img src="" alt="" />
                <div className="recipeInfo">
                    <p title='Kategorie'>Těstoviny</p>
                    <p title='Doba přípravy'>⏳ 60 min</p>
                </div>
                <h2 className="recipeName">Špagety</h2>
           </div>;
}

export default RecipeCard;