import "../css/notificationWindow.css";
import { FocusTrap } from "focus-trap-react";

const NotificationWindow = ({ setNotificationActive, notificationRef, notificationMessage }) => {
  return (
    <FocusTrap>
      <div ref={notificationRef} tabIndex={-1} className="notificationWindow">
        <h4>Určitě smazat?</h4>
        <div className="notificationMessage">
          <p>{notificationMessage}</p>
          <div className="okButton">
            <button onClick={() => setNotificationActive(false)}>Ok</button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default NotificationWindow;
