import '../css/header.css'
import SearchBar from './SearchBar'

const Header = () => {
    return <header className="header">
             <h1>
               <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
             </h1>
             <SearchBar />
           </header>
  }

export default Header;