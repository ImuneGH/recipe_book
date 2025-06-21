import "../css/newRecipeButton.css";

const NewRecipeButton = ({ handleNewFormActive }) => {
  return (
    <button onClick={handleNewFormActive}>
      Přidej nový
      <br /> recept!
    </button>
  );
};

export default NewRecipeButton;
