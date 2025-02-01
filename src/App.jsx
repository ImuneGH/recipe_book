import { useState } from 'react'
import './style.css'
import Header from './components/Header'
// import './components/Content'
// import './components/Aside'
// import './components/Footer'

function App() {
  // hlavní aplikace, do které vkládám komponent header
  return (
    <>
      <Header />
      <div className="pokus"><h2>Ahoj</h2></div>
      <div className="pokus"><p>Ahoj ahoj</p></div>
    </>
  )
}

export default App;