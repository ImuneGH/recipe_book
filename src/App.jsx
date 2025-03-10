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
  const fetchRecipes = () => {
    fetch("http://localHost:5000/recipes")
      .then(response => response.json())
      .then(data => {
          setRecipes(data);
      })
      .catch(error => console.error(`error when recieving data: ${error}`));
  }

  const handleActiveContent = () => {
    if(activeCategories.length !== 0) {
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
    if(recipes.length === 0) {
      return ;
    }
    else {
      console.log(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    handleActiveContent();
  }, [activeCategories]);

  return (
    <motion.div className='app' layout>
      <Header activeContent={activeContent} activeCategories={activeCategories} setActiveCategories={setActiveCategories} setRecipes={setRecipes} />
      <Content activeContent={activeContent} recipes={recipes} activeCategories={activeCategories} />
      <Footer />
    </motion.div>
  )
}

export default App;