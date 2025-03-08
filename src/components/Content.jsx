import '../css/content.css'
import { motion } from "motion/react"
import RecipeCard from './RecipeCard'

const Content = ({ activeContent, recipes }) => {
  return <main className="content">
              {!activeContent && <motion.h1 layoutId='logo'>
                <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
              </motion.h1>}
              <RecipeCard recipes={recipes} />
          </main>
}

export default Content;