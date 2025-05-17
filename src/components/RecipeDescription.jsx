import "../css/recipeDescription.css"

const RecipeDescription = () => {
    return <div className="recipeDescription">
        <div className="leftContent">
            <div className="foodPhoto">
                <img src="#" alt="fotka jídla" />
            </div>
            <div className="ingredients">
                <h3>Ingredience:</h3>
                <ul className="ingredientsList">
                    <li className="ingredientItem">Item 1</li>
                    <li className="ingredientItem">Item 2</li>
                    <li className="ingredientItem">Item 3</li>
                </ul>
            </div>
        </div>

        <div className="rightContent"></div>
    </div>;
}

export default RecipeDescription;