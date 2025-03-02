import '../css/content.css'
import { motion } from "motion/react"
import { useState } from 'react'

const Content = ({ activeContent, recipes }) => {
  return <main className="content">
              {activeContent.length === 0 && <motion.h1 layoutId='logo'>
                <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />
              </motion.h1>}
          </main>
}

export default Content;