import './css/app.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import { motion } from "motion/react"
import { useState } from 'react'

function App() {
  const [activeCategories, setActiveCategories] = useState([]);
  return (
    <motion.div className='app' layout>
      <Header activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
      <Content activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
      <Footer />
    </motion.div>
    
  )
}

export default App;