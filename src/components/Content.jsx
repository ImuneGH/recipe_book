import '../css/content.css'
import { motion } from "motion/react"

const Content = () => {
    return <main className="content">
                <motion.h1 layoutId='logo' whileHover={{scale: 0.8}} whileTap={{scale: 0.5}}>
                  {active === null && <img className='logo' src="/img/flavor_log_logo.png" alt="Logo webu Flavor Log" />}
                </motion.h1>
           </main>
}

export default Content;