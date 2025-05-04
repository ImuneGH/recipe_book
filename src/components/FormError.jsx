import "../css/formError.css"

const Error = ({ errorMessage }) => {
    return <div className="errorWindow">
             <h4>error</h4>
             <div className="errorMessage">
                <p>errorMessage</p>
                <button>Rozumím</button>
             </div>
           </div>;
}

export default Error;