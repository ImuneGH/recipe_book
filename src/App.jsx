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
  const [errorActive, setErrorActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmActive, setConfirmActive] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [recipeDetailActive, setRecipeDetailActive] = useState(false);
  const popUpRef = useRef(null);

  const fetchRecipes = () => {
    fetch("http://localHost:5000/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => console.error(`error when recieving data: ${error}`));
  };

  const handleActiveForm = () => {
    newRecipeFormActive ? setNewRecipeFormActive(false) : setNewRecipeFormActive(true);
  };

  const closeActiveForm = (e) => {
    if (e.key === "Escape") {
      setNewRecipeFormActive(false);
    }
  };

  const deleteRecipe = () => {
    console.log(confirmActive);
    setConfirmActive(false);
  };

  const closeErrorMessage = (e) => {
    if (e.key === "Enter") {
      setErrorActive(false);
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
    if (errorActive && popUpRef.current) {
      popUpRef.current.focus();
    }

    document.addEventListener("keydown", closeErrorMessage);

    return () => {
      document.removeEventListener("keydown", closeErrorMessage);
    };
  }, [errorActive]);

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
      {errorActive && <FormError errorMessage={errorMessage} setErrorActive={setErrorActive} popUpRef={popUpRef} />}
      {confirmActive && <ConfirmWindow popUpRef={popUpRef} confirmMessage={confirmMessage} setConfirmActive={setConfirmActive} deleteRecipe={deleteRecipe} />}
      {newRecipeFormActive && <NewRecipeForm setNewRecipeFormActive={setNewRecipeFormActive} setErrorActive={setErrorActive} setErrorMessage={setErrorMessage} errorActive={errorActive} />}
      <Header
        activeContent={activeContent}
        activeCategories={activeCategories}
        setActiveCategories={setActiveCategories}
        setRecipes={setRecipes}
        setSearchValue={setSearchValue}
        searchQuery={searchQuery}
        randomRecipeSearch={randomRecipeSearch}
        handleActiveForm={handleActiveForm}
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
      />
      <Footer />
    </motion.div>
  );
}

export default App;
