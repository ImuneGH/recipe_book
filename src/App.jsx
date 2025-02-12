import './css/app.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import { motion } from "motion/react"

function App() {
  return (
    <div className='app'>
      <Header />
      <Content />
      <Footer />
    </div>
    
  )
}

export default App;