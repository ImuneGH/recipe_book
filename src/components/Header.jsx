import '../css/header.css'
import SearchBar from './SearchBar'
import NewRecipeButton from './NewRecipeButton'
import Categories from './Categories'
import { motion } from "motion/react"

const Header = ({ activeCategories, setActiveCategories, recipes, setRecipes }) => {
    return <header className="header">
              <div className="logoHolder">
                { activeCategories.length > 0 && <motion.h1 layoutId='logo'>
                  <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
                </motion.h1>}
              </div>
              <div className="searchCatWrap">
                <SearchBar recipes={recipes} setRecipes={setRecipes} activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
                <Categories activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
              </div>
              <div className="mainButtonWrap">
                <NewRecipeButton />
              </div>
           </header>
  }

export default Header;