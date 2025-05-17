import "../css/recipeDescription.css"

const RecipeDescription = () => {
    return <div className="recipeDescription">
        <div className="leftContent">
            <div className="foodPhoto">
                <img src="/img/livance.JPEG" alt="fotka jídla" />
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

        <div className="rightContent">
            <div className="actionButtons">
                <button className="edit">📝 edit</button>
                <button className="delete">🗑 delete</button>
            </div>
            <div className="metaData">
                <h2>Název receptu</h2>
                <ul className="recipeMetaData">
                    <li className="category">kategorie</li>
                    <li className="cookTime">doba vaření</li>
                    <li className="author">autor</li>
                </ul>
            </div>
            <div className="recipeInstructions">
                <h3>Postup:</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt placeat obcaecati ab, doloremque animi temporibus non, hic delectus   adipisci ducimus ipsum fuga possimus iure autem magnam voluptatibus vitae exercitationem nesciunt.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam aliquid laudantium adipisci illum quasi omnis fugit dolores dolorem, iste quas impedit neque nostrum iusto nihil. In obcaecati expedita animi magni.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat cum voluptatem aliquid veritatis voluptas ratione porro velit impedit laboriosam? Sequi optio dolores repellendus laudantium labore maiores id unde itaque aliquid.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla maiores quasi, suscipit consequuntur expedita voluptatum ipsa nisi odio hic corporis dignissimos illum, velit eligendi reiciendis, ab veniam eius fuga recusandae?
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime quidem consequuntur officiis tenetur vel necessitatibus nostrum distinctio exercitationem repellat ad magni at ducimus, odit, deserunt culpa inventore quia est!</p>
            </div>
        </div>
    </div>;
}

export default RecipeDescription;