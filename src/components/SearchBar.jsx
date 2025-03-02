import { useState } from 'react'
import '../css/searchBar.css'
import './SearchBar.jsx'

const SearchBar = ({ setRecipes }) => {
  const [inputValue, setInputValue] = useState("");
  const fetchRecipes = () => {
    fetch("http://localHost:5000/recipes")
      .then(response => response.json())
      .then(data => {
          console.log(data);
          setRecipes(data);
      })
      .catch(error => console.error(`error when recieving data: ${error}`));
  }

    return <div className="searchBar">
             <input type="text" placeholder="Napiš recept nebo ingredienci" />
             <button onClick={fetchRecipes}>🔎 Hledat</button>
             <button>Zkus štěstí</button>
           </div>
  }

export default SearchBar;