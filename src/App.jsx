import { useState } from 'react'
import './style.css'

function App() {
  // komponent Header
  function Header() {
    return <div className="header pokus"><p>Nadpis AHOJ</p></div>
  }
  // hlavní aplikace, do které vkládám komponent header
  return (
    <>
      <Header />
      <div className="pokus"><p>Ahoj</p></div>
      <div className="pokus"><p>Ahoj ahoj</p></div>
    </>
  )
}

export default App
