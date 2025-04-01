import './css/app.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import NewRecipeForm from './components/NewRecipeForm'
import { motion } from "motion/react"
import { useEffect, useState } from 'react'


function App() {
  const [activeCategories, setActiveCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [activeContent, setActiveContent] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [randomRecipe, setRandomRecipe] = useState("");
  const [newRecipeFormActive, setNewRecipeFormActive] = useState(false);

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
      {newRecipeFormActive && <NewRecipeForm setNewRecipeFormActive={setNewRecipeFormActive} />}
      <Header activeContent={activeContent} activeCategories={activeCategories} setActiveCategories={setActiveCategories} setRecipes={setRecipes} setSearchValue={setSearchValue} searchQuery={searchQuery} randomRecipeSearch={randomRecipeSearch} handleActiveForm={handleActiveForm}/>
      <Content activeContent={activeContent} recipes={recipes} activeCategories={activeCategories} searchResult={searchResult} randomRecipe={randomRecipe} />
      <Footer />
    </motion.div>
  )
}

export default App;