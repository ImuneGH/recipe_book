import '../css/searchBar.css'
import './SearchBar.jsx'

const SearchBar = ({ setSearchValue, searchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }

    return <div className="searchBar">
             <input onChange={handleSearchChange} type="text" placeholder="Napiš recept nebo ingredienci" />
             <button onClick={searchQuery}>🔎 Hledat</button>
             <button>Zkus štěstí</button>
           </div>
  }

export default SearchBar;