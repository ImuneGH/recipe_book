import { useState } from 'react'
import './style.css'
import Header from './components/Header'
import Content from './components/Content'
import Aside from './components/Aside'
import Footer from './components/Footer'

function App() {
  return (
    <div className='app'>
      <Header />
      <div className="mainContent">
        <Aside />
        <Content />
      </div>
      <Footer />
    </div>
  )
}

export default App;