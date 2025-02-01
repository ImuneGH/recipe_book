import { useState } from 'react'
import './style.css'

function App() {
  // komponent Header
  function Header() {
    return <div className="header pokus"><h1><img src="./img/flavor_log_logo.png" alt="Logo webu Flavor Log" /></h1></div>
  }
  // hlavní aplikace, do které vkládám komponent header
  return (
    <>
      <Header />
      <div className="pokus"><h2>Ahoj</h2></div>
      <div className="pokus"><p>Ahoj ahoj</p></div>
    </>
  )
}

export default App
