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
  const handleActiveContent = () => {
    if(activeCategories.length !== 0) {
      setActiveContent(true);
    }
    else  {
      setActiveContent(false);
    }
  }
  useEffect(() => {
    handleActiveContent();
  }, [activeCategories]);
  return (
    <motion.div className='app' layout>
      <Header activeContent={activeContent} activeCategories={activeCategories} setActiveCategories={setActiveCategories} recipes={recipes} setRecipes={setRecipes} setActiveContent={setActiveContent} handleActiveContent={handleActiveContent} />
      <Content activeCategories={activeCategories} setActiveCategories={setActiveCategories} recipes={recipes} setRecipes={setRecipes} setActiveContent={setActiveContent} activeContent={activeContent} handleActiveContent={handleActiveContent} />
      <Footer />
    </motion.div>
    
  )
}

export default App;