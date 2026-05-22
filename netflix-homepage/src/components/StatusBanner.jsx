import { APP_STATES } from "../utils/appStates";

// Shows loading spinner or error/success message with error code
function StatusBanner({ appStatus, message, errorCode }) {
  if (appStatus === APP_STATES.LOADING) {
    return (
      <div className="status-banner status-loading" role="status">
        Loading movies...
      </div>
    );
  }

  if (appStatus === APP_STATES.ERROR && message) {
    return (
      <div className="status-banner status-error" role="alert">
        {message}
        {errorCode && <span className="status-code"> [{errorCode}]</span>}
      </div>
    );
  }

  return null;
}

export default StatusBanner;
