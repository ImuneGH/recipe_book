import { useState } from "react";
import "../css/newRecipeForm.css"

const NewRecipeForm = ({ setNewRecipeFormActive }) => {
    const [formData, setFormData] = useState({
        createdAt: "",
        recipeName: "",
        ingredients: "",
        instructions: "",
        category: "",
        cookTime: "",
        author: "",
        imgPath: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, 
            [e.target.name]: e.target.value});
            // console.log(formData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const actualDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        setFormData({...formData, createdAt: actualDate});
        console.log("Recept uložen:", formData);

        fetch("http://localhost:5000/recipes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          })
            .then(response => response.json())
            .then(data => {
              console.log("Recept uložen:", data);
              // případně vynulování formuláře nebo přesměrování
            })
            .catch(error => {
              console.error("Chyba při odesílání:", error);
            });
    }

    return <form className="newRecipeForm">
        <a href="#" onClick={() => setNewRecipeFormActive(false)} className="close"></a>
        <h3><label htmlFor="recipeName">Název receptu:</label></h3>
        <input placeholder="např.: Špagety Carbonara" id="recipeName" type="text" name="recipeName" autoFocus value={formData.recipeName} onChange={handleChange} />
        <h3><label htmlFor="ingredients">Ingredience:</label></h3>
        <input placeholder="Mrkev, Celer, Pažitka..." id="ingredients" type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />
        <h3><label htmlFor="instructions">Postup:</label></h3>
        <textarea placeholder="např.: Uvařit špagety, smíchat se žloutkem..." id="instructions" type="text" name="instructions" value={formData.instructions} onChange={handleChange} />
        <h3><label htmlFor="category">Kategorie:</label></h3>
        <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="Zvol kategorii">--Zvol kategorii--</option>
            <option value="Polévky">Polévky</option>
            <option value="Těstoviny">Těstoviny</option>
            <option value="Omáčky">Omáčky</option>
            <option value="Maso">Maso</option>
            <option value="Bezmasé">Bezmasé</option>
            <option value="Moučníky">Moučníky</option>
        </select>
        <h3><label htmlFor="cookTime">Délka vaření:</label></h3>
        <input placeholder="min" id="cookTime" type="number" name="cookTime" value={formData.cookTime} onChange={handleChange} />
        <h3><label htmlFor="author">Autor:</label></h3>
        <input placeholder="Jméno autora, či přezdívka" id="author" type="text" name="author" value={formData.author} onChange={handleChange} />
        <h3><label htmlFor="img">Fotka jídla:</label></h3>
        <input id="img" type="file" accept="image/jpeg, image/png" name="imgPath" value={formData.imgPath} onChange={handleChange} />
        <button onClick={handleSubmit} className="submit">Přidej recept</button>
    </form>
}

export default NewRecipeForm;