import '../css/searchBar.css'
import './SearchBar.jsx'

const SearchBar = ({ setSearchValue, searchQuery, randomRecipeSearch }) => {
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }

    return <div className="searchBar">
             <input onKeyDown={e => e.key === "Enter" && searchQuery()} onChange={handleSearchChange} type="text" placeholder="Napiš recept nebo ingredienci" />
             <button onClick={searchQuery}>🔎 Hledat</button>
             <button onClick={randomRecipeSearch}>Zkus štěstí</button>
           </div>
  }

export default SearchBar;