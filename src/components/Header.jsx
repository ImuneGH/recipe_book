import '../css/header.css'
import SearchBar from './SearchBar'
import NewRecipeButton from './NewRecipeButton'
import Categories from './Categories'
import { motion } from "motion/react"

const Header = ({ activeCategories, setActiveCategories, recipes, setRecipes, activeContent, setActiveContent, handleActiveContent }) => {
    return <header className="header">
              <div className="logoHolder">
                { activeContent && <motion.h1 layoutId='logo'>
                  <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
                </motion.h1>}
              </div>
              <div className="searchCatWrap">
                <SearchBar activeContent={activeContent} recipes={recipes} setRecipes={setRecipes} activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
                <Categories activeContent={activeContent} activeCategories={activeCategories} setActiveCategories={setActiveCategories} setActiveContent={setActiveContent} handleActiveContent={handleActiveContent} />
              </div>
              <div className="mainButtonWrap">
                <NewRecipeButton />
              </div>
           </header>
  }

export default Header;