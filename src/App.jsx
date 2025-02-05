import { useState } from 'react'
import './css/app.css'
import Header from './components/Header'
import Content from './components/Content'
import Aside from './components/Aside'
import AsideRight from './components/AsideRight'
import Footer from './components/Footer'

function App() {
  return (
    <div className='app'>
      <Header />
      <div className="mainContent">
        <Aside />
        <Content />
        <AsideRight />
      </div>
      <Footer />
    </div>
  )
}

export default App;