import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TwoFactorDisableModal.scss';

/**
 * TwoFactorDisableModal Component
 *
 * Multi-step modal for disabling Two-Factor Authentication
 * Step 1: Confirmation
 * Step 2: Password verification
 * Step 3: Google Authenticator code verification
 *
 * @component
 * @subcategory Profile
 */
function TwoFactorDisableModal({ show, onClose, onConfirm }) {
  const [step, setStep] = useState(1); // 1: confirm, 2: password, 3: code, 4: loading
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    // Reset state
    setStep(1);
    setPassword('');
    setCode('');
    setError('');
    setLoading(false);
    onClose();
  };

  const handleConfirm = () => {
    setStep(2);
    setError('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter your password');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      setError('Please enter your Google Authenticator code');
      return;
    }

    setError('');
    setLoading(true);
    setStep(4);

    try {
      await onConfirm({ password, code });
      // Success handled by parent (shows success message and logs out)
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'An error occurred');
      setStep(3); // Go back to code step
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Bootstrap Modal Backdrop */}
      <div className="modal-backdrop fade show" onClick={handleClose}></div>

      {/* Bootstrap Modal */}
      <div className="modal fade show d-block two-factor-disable-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark text-white">
            {/* Step 1: Confirmation */}
            {step === 1 && (
              <>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title">Disable Two-Factor Authentication</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                </div>
                <div className="modal-body">
                  <div className="alert alert-warning d-flex align-items-center" role="alert">
                    <svg className="me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <strong>Your Google Authenticator secret will be removed</strong>
                      <p className="mb-0 mt-1">You will also disable Google Authenticator 2FA</p>
                    </div>
                  </div>
                  <p className="text-white-50 mb-0">This action requires verification with your password and current 2FA code.</p>
                </div>
                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleConfirm}>
                    Yes, remove it
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Password */}
            {step === 2 && (
              <>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title">Enter Your Password</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                </div>
                <form onSubmit={handlePasswordSubmit}>
                  <div className="modal-body">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control bg-dark text-white border-secondary"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="modal-footer border-secondary">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning">
                      Continue
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Step 3: Google Authenticator Code */}
            {step === 3 && (
              <>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title">Enter Google Authenticator Code</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                </div>
                <form onSubmit={handleCodeSubmit}>
                  <div className="modal-body">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="code" className="form-label">Verification Code</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        id="code"
                        placeholder="Enter 6-digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        maxLength="6"
                        pattern="[0-9]*"
                        autoFocus
                      />
                      <div className="form-text text-white-50">
                        Open your Google Authenticator app and enter the 6-digit code
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-secondary">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning">
                      Disable 2FA
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Step 4: Loading */}
            {step === 4 && (
              <>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title">Disabling 2FA</h5>
                </div>
                <div className="modal-body text-center py-5">
                  <div className="spinner-border text-warning mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mb-0">Removing please wait...</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

TwoFactorDisableModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default TwoFactorDisableModal;
