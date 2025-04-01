import '../css/header.css'
import SearchBar from './SearchBar'
import NewRecipeButton from './NewRecipeButton'
import Categories from './Categories'
import { motion } from "motion/react"

const Header = ({ activeCategories, setActiveCategories, setRecipes, activeContent, setSearchValue, searchQuery, randomRecipeSearch, handleActiveForm }) => {
    return <header className="header">
              <div className="logoHolder">
                { activeContent && <motion.h1 layoutId='logo'>
                  <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
                </motion.h1>}
              </div>
              <div className="searchCatWrap">
                <SearchBar setRecipes={setRecipes} setSearchValue={setSearchValue} searchQuery={searchQuery} randomRecipeSearch={randomRecipeSearch} />
                <Categories activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
              </div>
              <div className="mainButtonWrap">
                <NewRecipeButton handleActiveForm={handleActiveForm} />
              </div>
           </header>
  }

export default Header;