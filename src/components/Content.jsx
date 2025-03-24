import '../css/content.css'
import { motion } from "motion/react"
import RecipeCard from './RecipeCard'

const Content = ({ activeContent, recipes, activeCategories, searchResult }) => {
  return <main className="content">
              {!activeContent && <motion.h1 layoutId='logo'>
                <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
              </motion.h1>}
              {activeCategories.length === 0 ? null : recipes.filter(recipe => activeCategories.includes(recipe.category)).map(filteredRecipe => <RecipeCard key={filteredRecipe.ID} filteredRecipe={filteredRecipe} />)}
              {searchResult !== "" ? recipes.filter(recipe => recipe.recipeName.includes(searchResult)).map(filteredRecipe => <RecipeCard key={filteredRecipe.ID} filteredRecipe={filteredRecipe} />) : null}
          </main>
}

export default Content;