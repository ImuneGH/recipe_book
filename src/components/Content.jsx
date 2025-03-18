import '../css/content.css'
import { motion } from "motion/react"
import RecipeCard from './RecipeCard'
import { map } from 'motion/react-client'

const Content = ({ activeContent, recipes, activeCategories, setFilteredSearchValue, filteredSearchValue }) => {
  return <main className="content">
              {!activeContent && <motion.h1 layoutId='logo'>
                <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
              </motion.h1>}
              {filteredSearchValue === "" ? null : filteredSearchValue.map(filteredRecipe => <RecipeCard key={filteredRecipe.ID} filteredRecipe={filteredRecipe} />)}
              {activeCategories.length === 0 ? null : recipes.filter(recipe => activeCategories.includes(recipe.category)).map(filteredRecipe => <RecipeCard key={filteredRecipe.ID} filteredRecipe={filteredRecipe} />)}
          </main>
}

export default Content;