import "../css/newRecipeForm.css"

const NewRecipeForm = ({ setNewRecipeFormActive }) => {
    return <form className="newRecipeForm">
        <a href="#" onClick={() => setNewRecipeFormActive(false)} className="close"></a>
        <h3><label htmlFor="recipeName">Název receptu:</label></h3>
        <input placeholder="např.: Špagety Carbonara" id="recipeName" type="text" />
        <h3><label htmlFor="ingredients">Ingredience:</label></h3>
        <input placeholder="Mrkev, Celer, Pažitka..." id="ingredients" type="text" />
        <h3><label htmlFor="instructions">Postup:</label></h3>
        <textarea placeholder="např.: Uvařit špagety, smíchat se žloutkem..." id="instructions" type="text" />
        <h3><label htmlFor="category">Kategorie:</label></h3>
        <select id="category">
            <option value="Zvol kategorii">--Zvol kategorii--</option>
            <option value="Polévky">Polévky</option>
            <option value="Těstoviny">Těstoviny</option>
            <option value="Omáčky">Omáčky</option>
            <option value="Maso">Maso</option>
            <option value="Bezmasé">Bezmasé</option>
            <option value="Moučníky">Moučníky</option>
        </select>
        <h3><label htmlFor="cookTime">Délka vaření:</label></h3>
        <input placeholder="min" id="cookTime" type="number" />
        <h3><label htmlFor="autor">Autor:</label></h3>
        <input placeholder="Jméno autora, či přezdívka" id="autor" type="text" />
        <h3><label htmlFor="img">Fotka jídla:</label></h3>
        <input id="img" type="file" accept="image/jpeg, image/png" />
        <button className="submit">Přidej recept</button>
    </form>
}

export default NewRecipeForm;