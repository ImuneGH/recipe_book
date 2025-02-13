import './css/app.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import { motion } from "motion/react"
import { useState } from 'react'

function App() {
  const [activeCategories, setActiveCategories] = useState([]);
  return (
    <div className='app'>
      <Header activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
      <Content activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
      <Footer />
    </div>
    
  )
}

export default App;