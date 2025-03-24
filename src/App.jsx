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
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const fetchRecipes = () => {
    fetch("http://localHost:5000/recipes")
      .then(response => response.json())
      .then(data => {
          setRecipes(data);
      })
      .catch(error => console.error(`error when recieving data: ${error}`));
  }

  const searchQuery = () => {
    if(activeCategories.length !== 0) {
      setActiveCategories([]);
    }
    setSearchResult(searchValue);
  }

  const handleActiveContent = () => {
    if(activeCategories.length !== 0 || searchResult !== "") {
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
    activeCategories.length !== 0 ? setSearchResult("") : null;
  }, [activeCategories, searchQuery]);

  return (
    <motion.div className='app' layout>
      <Header activeContent={activeContent} activeCategories={activeCategories} setActiveCategories={setActiveCategories} setRecipes={setRecipes} setSearchValue={setSearchValue} searchQuery={searchQuery} />
      <Content activeContent={activeContent} recipes={recipes} activeCategories={activeCategories} searchResult={searchResult} />
      <Footer />
    </motion.div>
  )
}

export default App;