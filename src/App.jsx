import './css/app.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import NewRecipeForm from './components/NewRecipeForm'
import FormError from './components/FormError'
import { motion } from "motion/react"
import { useEffect, useState, useRef } from 'react'


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
  const errorRef = useRef(null);

  const fetchRecipes = () => {
    fetch("http://localHost:5000/recipes")
      .then(response => response.json())
      .then(data => {
          setRecipes(data);
      })
      .catch(error => console.error(`error when recieving data: ${error}`));
  }

  const handleActiveForm = () => {
    newRecipeFormActive ? setNewRecipeFormActive(false) : setNewRecipeFormActive(true);
  }

  const closeActiveForm = (e) => {
    if(e.key === "Escape") {
       setNewRecipeFormActive(false);
    }
  }

  const closeErrorMessage = (e) => {
    if(e.key === "Enter") {
      setErrorActive(false);
    }
  }

  const randomRecipeSearch = () => {
    let randomNumber = Math.floor(Math.random() * recipes.length);
    setRandomRecipe(recipes[randomNumber]);
    searchResult !== "" && setSearchResult("");
    activeCategories.length !== 0 && setActiveCategories([]);
  }

  const searchQuery = () => {
    if(activeCategories.length !== 0) {
      setActiveCategories([]);
    }
    if(randomRecipe !== "") {
      setRandomRecipe("");
    }
    setSearchResult(searchValue);
  }

  const handleActiveContent = () => {
    if(activeCategories.length !== 0 || searchResult !== "" || randomRecipe !== "") {
      setActiveContent(true);
    }
    else  {
      setActiveContent(false);
    }
  }

  useEffect(() => {
    if(errorActive && errorRef.current) {
      errorRef.current.focus();
    }
    
    document.addEventListener("keydown", closeErrorMessage);

    return () => {
      document.removeEventListener("keydown", closeErrorMessage);
    }
  }, [errorActive]);

  useEffect(() => {
    document.addEventListener("keydown", closeActiveForm);

    return () => {
      document.removeEventListener("keydown", closeActiveForm);   // cleanup function
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    handleActiveContent();
  }, [activeCategories, searchQuery, randomRecipeSearch]);

  useEffect(() => {
    if(activeCategories.length !== 0) {
      searchResult !== "" && setSearchResult("");
      randomRecipe !== "" && setRandomRecipe("");
    }
  }, [activeCategories])

  return (
    <motion.div className='app' layout>
      {errorActive && <FormError errorMessage={errorMessage} setErrorActive={setErrorActive} errorRef={errorRef} />}
      {newRecipeFormActive && <NewRecipeForm setNewRecipeFormActive={setNewRecipeFormActive} setErrorActive={setErrorActive} setErrorMessage={setErrorMessage} />}
      <Header activeContent={activeContent} activeCategories={activeCategories} setActiveCategories={setActiveCategories} setRecipes={setRecipes} setSearchValue={setSearchValue} searchQuery={searchQuery} randomRecipeSearch={randomRecipeSearch} handleActiveForm={handleActiveForm}/>
      <Content activeContent={activeContent} recipes={recipes} activeCategories={activeCategories} searchResult={searchResult} randomRecipe={randomRecipe} />
      <Footer />
    </motion.div>
  )
}

export default App;