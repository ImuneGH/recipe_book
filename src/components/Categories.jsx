import { useState } from 'react'
import '../css/categories.css'

const Categories = () => {
    const [active, setActive] = useState([]);
    const categories = ["Polévky", "Těstoviny", "Omáčky", "Maso", "Bezmasé", "Moučníky"];
    return <nav className="categories">
                <ul>
                    {categories.map((category) => 
                    <li key={category} className={active.includes(category) ? "active" : ""} 
                    onClick={() => {setActive(prevActive => prevActive.includes(category) ? prevActive.filter(item => item !== category) : [...prevActive, category])}}>
                    {category}
                    </li>
                    )}
                </ul>
           </nav>
}

export default Categories;