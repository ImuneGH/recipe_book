import '../css/content.css'

const Content = () => {
    return <main className="content">
                <div className="searchBar">
                    <input type="text" placeholder="Napiš recept nebo ingredienci" />
                    <button>🔎 Hledat</button>
                </div>
           </main>
}

export default Content;