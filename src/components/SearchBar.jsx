import { useState } from 'react'
import '../css/searchBar.css'
import './SearchBar.jsx'

const SearchBar = ({ setRecipes, searchValue, setSearchValue, searchHandle }) => {
    return <div className="searchBar">
             <input type="text" placeholder="Napiš recept nebo ingredienci" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
             <button onClick={searchHandle}>🔎 Hledat</button>
             <button>Zkus štěstí</button>
           </div>
  }

export default SearchBar;