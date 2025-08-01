import "./css/app.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import NewRecipeForm from "./components/NewRecipeForm";
import FormError from "./components/FormError";
import ConfirmWindow from "./components/ConfirmWindow";
import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

function App() {
  const [activeCategories, setActiveCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [activeContent, setActiveContent] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [randomRecipe, setRandomRecipe] = useState("");
  const [newRecipeFormActive, setNewRecipeFormActive] = useState(false);
  const [editRecipeFormActive, setEditRecipeFormActive] = useState(false);
  const [dataToEdit, setDataToEdit] = useState([]);
  const [errorActive, setErrorActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmActive, setConfirmActive] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [recipeDetailActive, setRecipeDetailActive] = useState(false);
  const [actualRecipeID, setActualRecipeID] = useState(null);
  const errorRef = useRef(null);
  const confirmRef = useRef(null);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/recipes");
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Chyba serveru" + response.status);
      }
      setRecipes(data);
    } catch (err) {
      console.error("Chyba při získávání dat", err.message);
    }
  };

  const getToHomePage = () => {
    setActiveContent(false);
    setActiveCategories([]);
    setRecipeDetailActive(false);
    setNewRecipeFormActive(false);
    setEditRecipeFormActive(false);
  };

  const handleNewFormActive = () => {
    if (editRecipeFormActive) {
      formErrorHandling("Nejprve dokonči editaci receptu, nebo zavři její okno.");
      return;
    }
    newRecipeFormActive ? setNewRecipeFormActive(false) : setNewRecipeFormActive(true);
  };

  const handleEditFormActive = () => {
    if (newRecipeFormActive) {
      formErrorHandling("Nejprve dokonči tvorbu nového receptu, nebo zavři okno formuláře.");
      return;
    }
    editRecipeFormActive ? setEditRecipeFormActive(false) : setEditRecipeFormActive(true);
  };

  const formErrorHandling = (message) => {
    setErrorActive(true);
    setErrorMessage(message);
  };

  const closeActiveForm = (e) => {
    if (e.key === "Escape") {
      setNewRecipeFormActive(false);
      setEditRecipeFormActive(false);
    }
  };

  const deleteRecipe = async () => {
    setConfirmActive(false);
    try {
      const response = await fetch("http://localhost:5000/recipes/" + actualRecipeID, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error("Chyba při mazání receptu: " + errorMessage);
      } else {
        setRecipes((prev) =>
          prev.filter((recipe) => {
            console.log("recipe.ID:", recipe.ID, typeof recipe.ID);
            console.log("actualRecipeID:", actualRecipeID, typeof actualRecipeID);
            return recipe.ID !== actualRecipeID;
          })
        );
        getToHomePage();
      }
      console.log("Recept smazán.");
    } catch (err) {
      console.error("Chyba při odesílání: ", err.message);
    }
  };

  const closeErrorMessage = (e) => {
    if (e.key === "Enter") {
      setErrorActive(false);
    }
  };

  const cancelConfirmWindow = (e) => {
    if (e.key === "Escape") {
      setConfirmActive(false);
    }
    if (e.key === "Enter") {
      setConfirmActive(false);
      deleteRecipe();
    }
  };

  const randomRecipeSearch = () => {
    let randomNumber = Math.floor(Math.random() * recipes.length);
    setRandomRecipe(recipes[randomNumber]);
    searchResult !== "" && setSearchResult("");
    activeCategories.length !== 0 && setActiveCategories([]);
  };

  const searchQuery = () => {
    if (activeCategories.length !== 0) {
      setActiveCategories([]);
    }
    if (randomRecipe !== "") {
      setRandomRecipe("");
    }
    setSearchResult(searchValue);
  };

  const handleActiveContent = () => {
    if (activeCategories.length !== 0 || searchResult !== "" || randomRecipe !== "" || recipeDetailActive) {
      setActiveContent(true);
    } else {
      setActiveContent(false);
    }
  };

  useEffect(() => {
    if (errorActive && errorRef.current) {
      errorRef.current.focus();
      document.addEventListener("keydown", closeErrorMessage);
    }
    if (confirmActive && confirmRef.current) {
      confirmRef.current.focus();
      document.addEventListener("keydown", cancelConfirmWindow);
    }
    return () => {
      document.removeEventListener("keydown", closeErrorMessage);
      document.removeEventListener("keydown", cancelConfirmWindow);
    };
  }, [errorActive, confirmActive]);

  useEffect(() => {
    document.addEventListener("keydown", closeActiveForm);

    return () => {
      document.removeEventListener("keydown", closeActiveForm); // cleanup function
    };
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    handleActiveContent();
    if (activeCategories.length !== 0 || searchResult !== "" || randomRecipe !== "") {
      setRecipeDetailActive(false);
    }
  }, [activeCategories, searchQuery, randomRecipeSearch, recipeDetailActive]);

  useEffect(() => {
    if (activeCategories.length !== 0) {
      searchResult !== "" && setSearchResult("");
      randomRecipe !== "" && setRandomRecipe("");
    }
  }, [activeCategories]);

  return (
    <motion.div className="app" layout>
      {errorActive && <FormError errorMessage={errorMessage} setErrorActive={setErrorActive} errorRef={errorRef} />}
      {confirmActive && <ConfirmWindow confirmRef={confirmRef} confirmMessage={confirmMessage} setConfirmActive={setConfirmActive} deleteRecipe={deleteRecipe} />}
      {newRecipeFormActive && (
        <NewRecipeForm
          setNewRecipeFormActive={setNewRecipeFormActive}
          setErrorActive={setErrorActive}
          setErrorMessage={setErrorMessage}
          errorActive={errorActive}
          originalData={null}
          setEditRecipeFormActive={setEditRecipeFormActive}
          setOriginalData={setDataToEdit}
          editRecipeFormActive={editRecipeFormActive}
          actualRecipeID={actualRecipeID}
          getToHomePage={getToHomePage}
        />
      )}
      {editRecipeFormActive && (
        <NewRecipeForm
          setNewRecipeFormActive={setNewRecipeFormActive}
          setErrorActive={setErrorActive}
          setErrorMessage={setErrorMessage}
          errorActive={errorActive}
          originalData={dataToEdit}
          setEditRecipeFormActive={setEditRecipeFormActive}
          setOriginalData={setDataToEdit}
          editRecipeFormActive={editRecipeFormActive}
          actualRecipeID={actualRecipeID}
          getToHomePage={getToHomePage}
        />
      )}
      <Header
        activeContent={activeContent}
        activeCategories={activeCategories}
        setActiveCategories={setActiveCategories}
        setRecipes={setRecipes}
        setSearchValue={setSearchValue}
        searchQuery={searchQuery}
        randomRecipeSearch={randomRecipeSearch}
        handleNewFormActive={handleNewFormActive}
        searchValue={searchValue}
      />
      <Content
        activeContent={activeContent}
        recipes={recipes}
        activeCategories={activeCategories}
        searchResult={searchResult}
        randomRecipe={randomRecipe}
        setActiveCategories={setActiveCategories}
        setActiveContent={setActiveContent}
        setRecipeDetailActive={setRecipeDetailActive}
        recipeDetailActive={recipeDetailActive}
        setSearchResult={setSearchResult}
        setRandomRecipe={setRandomRecipe}
        setConfirmActive={setConfirmActive}
        setActualRecipeID={setActualRecipeID}
        setConfirmMessage={setConfirmMessage}
        setDataToEdit={setDataToEdit}
        handleEditFormActive={handleEditFormActive}
        setSearchValue={setSearchValue}
      />
      <Footer />
    </motion.div>
  );
}

export default App;
