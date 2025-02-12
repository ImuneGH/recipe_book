import '../css/header.css'
import SearchBar from './SearchBar'
import NewRecipeButton from './NewRecipeButton'
import Categories from './Categories'
import { motion } from "motion/react"

const Header = () => {
    return <header className="header">
              {active !== null && <motion.div layoutId='logo' className="logoHolder"></motion.div>}
              <div className="searchCatWrap">
                <SearchBar />
                <Categories />
              </div>
              <div className="mainButtonWrap">
                <NewRecipeButton />
              </div>
           </header>
  }

export default Header;