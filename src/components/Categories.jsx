import { useState } from 'react'
import '../css/categories.css'

const Categories = ({ activeContent, setActiveContent }) => {
    // const [active, setActive] = useState([]);
    const categories = ["Polévky", "Těstoviny", "Omáčky", "Maso", "Bezmasé", "Moučníky"];
    return <nav className="categories">
                <ul>
                    {categories.map((category) => 
                    <li key={category} 
                    className={activeContent.includes(category) ? "active" : ""} 
                    onClick={() => {setActiveContent(prevActive => prevActive.includes(category) ? prevActive.filter(item => item !== category) : [...prevActive, category])}}>
                    {category}
                    </li>
                    )}
                </ul>
           </nav>
}

export default Categories;