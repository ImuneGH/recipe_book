import "../css/confirmWindow.css";

const ConfirmWindow = ({ popUpRef, confirmMessage, setConfirmActive }) => {
  return (
    <div ref={popUpRef} tabIndex={-1} className="errorWindow">
      <h4>error</h4>
      <div className="errorMessage">
        <p>{confirmMessage}</p>
        <button onClick={() => setConfirmActive(false)}>Zrušit</button>
        <button onClick={() => setConfirmActive(false)}>Smazat</button>
      </div>
    </div>
  );
};

export default ConfirmWindow;
