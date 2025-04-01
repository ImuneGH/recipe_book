import '../css/newRecipeButton.css'

const NewRecipeButton = ({ handleActiveForm }) => {
    return <button onClick={handleActiveForm}>Přidej nový<br /> recept!</button>
  }

export default NewRecipeButton;