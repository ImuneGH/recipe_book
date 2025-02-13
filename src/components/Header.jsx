import '../css/header.css'
import SearchBar from './SearchBar'
import NewRecipeButton from './NewRecipeButton'
import Categories from './Categories'
import { motion } from "motion/react"
import { useState } from 'react'

const Header = ({ activeCategories, setActiveCategories }) => {
    return <header className="header">
              {activeCategories !== null && <motion.div layoutId='logo' className="logoHolder"></motion.div>}
              <div className="searchCatWrap">
                <SearchBar />
                <Categories activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
              </div>
              <div className="mainButtonWrap">
                <NewRecipeButton />
              </div>
           </header>
  }

export default Header;