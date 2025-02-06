import '../css/searchBar.css'
import './SearchBar.jsx'

const SearchBar = () => {
    return <div className="searchBar">
             <input type="text" placeholder="Napiš recept nebo ingredienci" />
             <button>🔎 Hledat</button>
           </div>
  }

export default SearchBar;