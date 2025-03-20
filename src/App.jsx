import './css/app.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import { motion } from "motion/react"
import { useEffect, useState } from 'react'

function App() {
  const [activeCategories, setActiveCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [activeContent, setActiveContent] = useState(false);
  const [filteredSearchValue, setFilteredSearchValue] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const fetchRecipes = () => {
    fetch("http://localHost:5000/recipes")
      .then(response => response.json())
      .then(data => {
          setRecipes(data);
      })
      .catch(error => console.error(`error when recieving data: ${error}`));
  }

  const searchHandle = () => {
    const result = () => recipes.filter(recipe => recipe.recipeName.includes(searchValue));
    activeCategories.length !== 0 ? setActiveCategories([]) : null;
    setFilteredSearchValue(result);
    console.log(filteredSearchValue);
  }

  const handleActiveContent = () => {
    if(activeCategories.length !== 0 || filteredSearchValue.length !== 0) {
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
  }, [activeCategories, filteredSearchValue]);

  useEffect(() => {
    if(activeCategories.length !== 0) {
      setFilteredSearchValue([]);
    }
  }, [activeCategories])

  return (
    <motion.div className='app' layout>
      <Header activeContent={activeContent} activeCategories={activeCategories} setActiveCategories={setActiveCategories} setRecipes={setRecipes} searchValue={searchValue} setSearchValue={setSearchValue} searchHandle={searchHandle} />
      <Content activeContent={activeContent} recipes={recipes} activeCategories={activeCategories} filteredSearchValue={filteredSearchValue} setFilteredSearchValue={setFilteredSearchValue} />
      <Footer />
    </motion.div>
  )
}

export default App;