import { useState } from 'react'
import '../css/searchBar.css'
import './SearchBar.jsx'

const SearchBar = ({ setRecipes }) => {
  const [inputValue, setInputValue] = useState("");
    return <div className="searchBar">
             <input type="text" placeholder="Napiš recept nebo ingredienci" />
             <button>🔎 Hledat</button>
             <button>Zkus štěstí</button>
           </div>
  }

export default SearchBar;