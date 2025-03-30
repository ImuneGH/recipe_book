import "../css/newRecipeForm.css"

const NewRecipeForm = () => {
    return <form className="newRecipeForm">
        <a href="#" class="close"></a>
        <h3>Název receptu:</h3>
        <input className="recipeName" type="text" />
        <h3>Ingredience:</h3>
        <input className="ingredients" type="text" />
        <h3>Postup:</h3>
        <input className="instructions" type="text" />
        <h3>Kategorie</h3>
        <input className="category" type="text" />
        <h3>Délka vaření:</h3>
        <input className="cookTime" type="text" />
        <h3>Autor:</h3>
        <input className="autor" type="text" />
        <h3>Fotka jídla:</h3>
        <input className="img" type="text" />
        <button className="submit"></button>
    </form>
}

export default NewRecipeForm;