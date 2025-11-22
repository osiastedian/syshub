import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TwoFactorDisableModal.scss';

/**
 * TwoFactorDisableModal Component
 *
 * Single-form modal for disabling Two-Factor Authentication
 * Shows all fields at once: warning, password, and verification code
 *
 * @component
 * @subcategory Profile
 */
function TwoFactorDisableModal({ show, onClose, onConfirm, onSuccess }) {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Countdown timer after success
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      // Trigger logout callback
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [success, countdown, onSuccess]);

  const handleClose = () => {
    if (success) return; // Prevent closing during success state

    setPassword('');
    setCode('');
    setError('');
    setLoading(false);
    setSuccess(false);
    setCountdown(3);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError('Please enter your password');
      return;
    }

    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await onConfirm({ password, code });
      // Show success state
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Bootstrap Modal Backdrop */}
      <div className="modal-backdrop fade show" onClick={success ? undefined : handleClose}></div>

      {/* Bootstrap Modal */}
      <div className="modal fade show d-block two-factor-disable-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark text-white">
            {success ? (
              // Success State
              <>
                <div className="modal-body text-center py-5">
                  {/* Success Icon */}
                  <div className="success-icon mb-3">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2"/>
                      <path d="M8 12L11 15L16 9" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <h4 className="mb-3">Your Secret Was Removed</h4>
                  <p className="text-white-50 mb-4">Google Authenticator has been successfully disabled on your account.</p>

                  <div className="alert alert-warning d-inline-flex align-items-center" role="alert">
                    <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>Logging out in <strong>{countdown}</strong> second{countdown !== 1 ? 's' : ''}...</span>
                  </div>

                  <p className="text-white-50 small mt-3">You will need to log in again to continue.</p>
                </div>
              </>
            ) : (
              // Form State
              <>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title">Disable Two-Factor Authentication</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={handleClose}
                    disabled={loading}
                  ></button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    {/* Warning Alert */}
                    <div className="alert alert-warning d-flex align-items-center" role="alert">
                      <svg className="me-2 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div>
                        <strong>Your Google Authenticator secret will be removed</strong>
                        <p className="mb-0 mt-1 small">You will also disable Google Authenticator 2FA</p>
                      </div>
                    </div>

                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    <p className="text-white-50 mb-4">Enter your password and current authenticator code to confirm.</p>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Your Password</label>
                      <input
                        type="password"
                        className="form-control bg-dark text-white border-secondary"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        autoFocus
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="code" className="form-label">Verification Code</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        id="code"
                        placeholder="Enter 6-digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        maxLength="6"
                        disabled={loading}
                      />
                      <div className="form-text text-white-50">
                        Open your Google Authenticator app and enter the 6-digit code
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer border-secondary">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClose}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-danger"
                      disabled={loading || !code || code.length !== 6 || !password}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Disabling...
                        </>
                      ) : (
                        'Disable 2FA'
                      )}
                    </button>
                  </div>
                </form>
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
  onSuccess: PropTypes.func,
};

export default TwoFactorDisableModal;
