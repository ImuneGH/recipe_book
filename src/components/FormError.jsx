import "../css/formError.css"

const FormError = ({ errorMessage, setErrorActive, errorRef }) => {
    return <div ref={errorRef} tabIndex={-1} className="errorWindow">
             <h4>error</h4>
             <div className="errorMessage">
                <p>{errorMessage}</p>
                <button onClick={() => setErrorActive(false)}>Rozumím</button>
             </div>
           </div>;
}

export default FormError;