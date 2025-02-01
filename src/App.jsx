import { useState } from 'react'
import './style.css'
import Header from './components/Header'
import Content from './components/Content'
import Aside from './components/Aside'
import Footer from './components/Footer'

function App() {
  // hlavní aplikace, do které vkládám komponent header
  return (
    <div className='app'>
      <Header />
      <Aside />
      <Content />
      <Footer />
    </div>
  )
}

export default App;