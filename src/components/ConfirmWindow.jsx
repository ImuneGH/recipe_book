import { FocusTrap } from "focus-trap-react";
import "../css/confirmWindow.css";

const ConfirmWindow = ({ confirmRef, confirmMessage, setConfirmActive, deleteRecipe, handleNotificationWindow }) => {
  return (
    <FocusTrap focusTrapOptions={{ escapeDeactivates: false }}>
      <div ref={confirmRef} tabIndex={-1} className="confirmWindow">
        <h4>Určitě smazat?</h4>
        <div className="confirmMessage">
          <p>{confirmMessage}</p>
          <div className="buttons">
            <button onClick={() => setConfirmActive(false)}>Zrušit</button>
            <button
              onClick={() => {
                deleteRecipe();
              }}
            >
              Smazat
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default ConfirmWindow;
