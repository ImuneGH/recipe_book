import '../css/categories.css'

const Categories = ({ activeCategories, setActiveCategories }) => {
    const categories = ["Polévky", "Těstoviny", "Omáčky", "Maso", "Bezmasé", "Moučníky"];
    return <nav className="categories">
                <ul>
                    {categories.map((category) => 
                    <li key={category} 
                    className={activeCategories.includes(category) ? "active" : ""} 
                    onClick={() => {setActiveCategories(prevActive => prevActive.includes(category) ? prevActive.filter(item => item !== category) : [...prevActive, category]);
                    }}>
                    {category}
                    </li>
                    )}
                </ul>
           </nav>
}

export default Categories;