import '../css/header.css'
import SearchBar from './SearchBar'
import NewRecipeButton from './NewRecipeButton'
import Categories from './Categories'

const Header = () => {
    return <header className="header">
              <div className="logoHolder"></div>
              <div className="searchCatWrap">
                <SearchBar />
                <Categories />
              </div>
              <div className="mainButtonWrap">
                <NewRecipeButton />
              </div>
           </header>
  }

export default Header;