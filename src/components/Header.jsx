import '../css/header.css'
import SearchBar from './SearchBar'
import NewRecipeButton from './NewRecipeButton'

const Header = () => {
    return <header className="header">
             <div className="container">
                <div className="filler"></div>
                <h1>
                  <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
                </h1>
                <NewRecipeButton />
             </div>
             <SearchBar />
           </header>
  }

export default Header;