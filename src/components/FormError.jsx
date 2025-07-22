import { FocusTrap } from "focus-trap-react";
import "../css/formError.css";

const FormError = ({ errorMessage, setErrorActive, errorRef }) => {
  return (
    <FocusTrap>
      <div ref={errorRef} tabIndex={-1} className="errorWindow">
        <h4>error</h4>
        <div className="errorMessage">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorActive(false)}>Rozumím</button>
        </div>
      </div>
    </FocusTrap>
  );
};

export default FormError;
