import { useState } from "react";
import { APP_STATES } from "../utils/appStates";
import { ERROR_CODES, getErrorMessage } from "../utils/errorCodes";

function SignInModal({ onClose, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formStatus, setFormStatus] = useState(APP_STATES.IDLE);
  const [errorCode, setErrorCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorCode(null);
    setErrorMessage("");
    setFormStatus(APP_STATES.LOADING);

    await new Promise((r) => setTimeout(r, 300));

    if (!email.trim() || !password.trim()) {
      setFormStatus(APP_STATES.ERROR);
      setErrorCode(ERROR_CODES.ERR_VALIDATION_EMPTY);
      setErrorMessage(getErrorMessage(ERROR_CODES.ERR_VALIDATION_EMPTY));
      return;
    }

    if (!email.includes("@")) {
      setFormStatus(APP_STATES.ERROR);
      setErrorCode(ERROR_CODES.ERR_VALIDATION_EMAIL);
      setErrorMessage(getErrorMessage(ERROR_CODES.ERR_VALIDATION_EMAIL));
      return;
    }

    if (password.length < 4) {
      setFormStatus(APP_STATES.ERROR);
      setErrorCode(ERROR_CODES.ERR_VALIDATION_PASSWORD);
      setErrorMessage(getErrorMessage(ERROR_CODES.ERR_VALIDATION_PASSWORD));
      return;
    }

    setFormStatus(APP_STATES.SUCCESS);
    const name = email.split("@")[0] || "User";
    onSignIn(name);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal signin-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Sign In to Netflix</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={formStatus === APP_STATES.LOADING}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={formStatus === APP_STATES.LOADING}
          />
          {formStatus === APP_STATES.ERROR && errorMessage && (
            <p className="form-error" role="alert">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="modal-primary-btn"
            disabled={formStatus === APP_STATES.LOADING}
          >
            {formStatus === APP_STATES.LOADING ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInModal;
