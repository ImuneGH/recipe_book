import './css/app.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import { motion } from "motion/react"
import { useState } from 'react'

function App() {
  const [activeContent, setActiveContent] = useState([]);
  const [recipes, setRecipes] = useState([]);
  return (
    <motion.div className='app' layout>
      <Header activeContent={activeContent} setActiveContent={setActiveContent} recipes={recipes} setRecipes={setRecipes} />
      <Content activeContent={activeContent} setActiveContent={setActiveContent} recipes={recipes} setRecipes={setRecipes} />
      <Footer />
    </motion.div>
    
  )
}

export default App;