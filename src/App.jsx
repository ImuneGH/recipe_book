import { useState } from 'react'
import './css/app.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'

function App() {
  return (
    <div className='app'>
      <Header />
      <div className="mainContent">
        <Content />
      </div>
      <Footer />
    </div>
    
  )
}

export default App;