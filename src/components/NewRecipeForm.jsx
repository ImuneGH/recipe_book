import { useState } from "react";
import "../css/newRecipeForm.css"

const NewRecipeForm = ({ setNewRecipeFormActive, setErrorActive, setErrorMessage, errorActive }) => {
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
  }

  const requirementsCheck = () => {
    if(!formData.recipeName || !formData.ingredients || !formData.instructions || !formData.category || !formData.cookTime) {
      setErrorActive(true);
      setErrorMessage("Vyplňte prosím všechna povinná pole");
      return false;
    }
    else {
      setErrorActive(false);
      return true;
    }
  }

  const redBorder = (field) => {
    if(errorActive && formData[field] === "") {
      return "emptyInput";
    }
    else {
      return "";
    }
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      const actualDate = new Date().toISOString().slice(0, 19).replace("T", " ");
      setFormData({...formData, createdAt: actualDate});

      requirementsCheck();

      if(!requirementsCheck()) {
        return;
      }

      fetch("http://localhost:5000/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
          .then(async response => {
            if(!response.ok) {
              const errorMessage = await response.json();
              throw new Error(`Server vrátil chybu: ${errorMessage.error}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Recept uložen:", data);
            // případně vynulování formuláře nebo přesměrování
          })
          .catch(error => {
            console.error("Chyba při odesílání:", error.message);
          });
  }

  return <form className="newRecipeForm">
      <a href="#" onClick={() => setNewRecipeFormActive(false)} className="close"></a>
      <h3><label htmlFor="recipeName"><span className="redColor">*</span>Název receptu:</label></h3>
      <input className={redBorder("recipeName")} placeholder="např.: Špagety Carbonara" id="recipeName" type="text" name="recipeName" autoFocus value={formData.recipeName} onChange={handleChange} />
      <h3><label htmlFor="ingredients"><span className="redColor">*</span>Ingredience:</label></h3>
      <input className={redBorder("ingredients")} placeholder="Mrkev, Celer, Pažitka..." id="ingredients" type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />
      <h3><label htmlFor="instructions"><span className="redColor">*</span>Postup:</label></h3>
      <textarea className={redBorder("instructions")} placeholder="např.: Uvařit špagety, smíchat se žloutkem..." id="instructions" type="text" name="instructions" value={formData.instructions} onChange={handleChange} />
      <h3><label htmlFor="category"><span className="redColor">*</span>Kategorie:</label></h3>
      <select className={redBorder("category")} id="category" name="category" value={formData.category} onChange={handleChange}>
          <option value="Zvol kategorii">--Zvol kategorii--</option>
          <option value="Polévky">Polévky</option>
          <option value="Těstoviny">Těstoviny</option>
          <option value="Omáčky">Omáčky</option>
          <option value="Maso">Maso</option>
          <option value="Bezmasé">Bezmasé</option>
          <option value="Moučníky">Moučníky</option>
      </select>
      <h3><label htmlFor="cookTime"><span className="redColor">*</span>Délka vaření (min):</label></h3>
      <input className={redBorder("cookTime")} placeholder="60" id="cookTime" type="number" name="cookTime" value={formData.cookTime} onChange={handleChange} />
      <h3><label htmlFor="author">Autor:</label></h3>
      <input placeholder="Jméno autora, či přezdívka" id="author" type="text" name="author" value={formData.author} onChange={handleChange} />
      <h3><label htmlFor="img">Fotka jídla:</label></h3>
      <input id="img" type="file" accept="image/jpeg, image/png" name="imgPath" value={formData.imgPath} onChange={handleChange} />
      <button onClick={handleSubmit} className="submit">Přidej recept</button>
      <small className="smallDescription">* takto označené položky jsou povinné</small>
  </form>
}

export default NewRecipeForm;