import "../css/header.css";
import SearchBar from "./SearchBar";
import NewRecipeButton from "./NewRecipeButton";
import Categories from "./Categories";
import { motion } from "motion/react";

const Header = ({ activeCategories, setActiveCategories, setRecipes, activeContent, setSearchValue, searchQuery, randomRecipeSearch, handleNewFormActive, searchValue }) => {
  return (
    <header className="header">
      <div className="logoHolder">
        {activeContent && (
          <motion.h1 layoutId="logo" style={{ width: "322.5px", height: "165px" }}>
            <img className="logo" src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
          </motion.h1>
        )}
      </div>
      <div className="searchCatWrap">
        <SearchBar setRecipes={setRecipes} setSearchValue={setSearchValue} searchQuery={searchQuery} randomRecipeSearch={randomRecipeSearch} searchValue={searchValue} />
        <Categories activeCategories={activeCategories} setActiveCategories={setActiveCategories} />
      </div>
      <div className="mainButtonWrap">
        <NewRecipeButton handleNewFormActive={handleNewFormActive} />
      </div>
    </header>
  );
};

export default Header;
