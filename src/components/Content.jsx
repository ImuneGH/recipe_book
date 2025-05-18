import '../css/content.css'
import RecipeDescription from '../components/RecipeDescription'
import { motion } from "motion/react"
import RecipeCard from './RecipeCard'

const Content = ({ activeContent, recipes, activeCategories, searchResult, randomRecipe, setActiveCategories, setActiveContent, setRecipeDetailActive, recipeDetailActive, setSearchResult, setRandomRecipe }) => {
  const filteredCategory = activeCategories.length && recipes.filter(recipe => activeCategories.includes(recipe.category));
  const filteredSearch = searchResult !== "" && recipes.filter(recipe => recipe.recipeName.includes(searchResult));
  const recipesDisplayed = filteredCategory.length ? filteredCategory : filteredSearch.length ? filteredSearch : randomRecipe ? [randomRecipe] : [];
  const isEmpty = recipesDisplayed.length === 0 && activeContent && !recipeDetailActive;

  return <main className="content">
              {!activeContent && <motion.h1 layoutId='logo'>
                <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
              </motion.h1>}
              { recipeDetailActive && <RecipeDescription />}
              {recipesDisplayed ? recipesDisplayed.map(recipeDisplayed => <RecipeCard key={recipeDisplayed.ID} recipeDisplayed={recipeDisplayed} setActiveCategories={setActiveCategories} setActiveContent={setActiveContent} setRecipeDetailActive={setRecipeDetailActive} setSearchResult={setSearchResult} setRandomRecipe={setRandomRecipe} />) : null}
              {isEmpty && <p>Obsah je prázdný</p>}
          </main>
}

export default Content;