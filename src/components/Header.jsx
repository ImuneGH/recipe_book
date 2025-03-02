import '../css/header.css'
import SearchBar from './SearchBar'
import NewRecipeButton from './NewRecipeButton'
import Categories from './Categories'
import { motion } from "motion/react"
import { useState } from 'react'

const Header = ({ activeContent, setActiveContent, recipes, setRecipes }) => {
    return <header className="header">
              <div className="logoHolder">
                { activeContent.length > 0 && <motion.h1 layoutId='logo'>
                  <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
                </motion.h1>}
              </div>
              <div className="searchCatWrap">
                <SearchBar recipes={recipes} setRecipes={setRecipes} activeContent={activeContent} setActiveContent={setActiveContent} />
                <Categories activeContent={activeContent} setActiveContent={setActiveContent} />
              </div>
              <div className="mainButtonWrap">
                <NewRecipeButton />
              </div>
           </header>
  }

export default Header;