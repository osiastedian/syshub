import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAuthQrCode, verifyAuthCode } from '../../utils/twoFaAuthentication';
import { useUser } from '../../context/user-context';
import './TwoFactorEnableModal.scss';

/**
 * TwoFactorEnableModal Component
 *
 * Modal for enabling Two-Factor Authentication
 * Shows QR code, secret key, and verification input all at once
 *
 * @component
 * @subcategory Profile
 */
function TwoFactorEnableModal({ show, onClose, onSuccess }) {
  const { user, updateCurrentActionsUser } = useUser();
  const [qrData, setQrData] = useState(null);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Generate QR code when modal opens
  useEffect(() => {
    if (show && user?.data?.email && !qrData) {
      const { secret, gAuthSecret, qrCodeURL } = getAuthQrCode(user.data.email);
      setQrData({ secret, gAuthSecret, qrCodeURL });
    }
  }, [show, user?.data?.email, qrData]);

  // Countdown timer after success
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      // Trigger logout
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [success, countdown, onSuccess]);

  const handleClose = () => {
    if (success) return; // Prevent closing during success state

    setQrData(null);
    setCode('');
    setPassword('');
    setError('');
    setLoading(false);
    setCopied(false);
    setSuccess(false);
    setCountdown(3);
    onClose();
  };

  const handleCopySecret = () => {
    if (qrData?.gAuthSecret) {
      navigator.clipboard.writeText(qrData.gAuthSecret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
      // Verify code locally first
      const isValid = verifyAuthCode(qrData.secret, code);
      if (!isValid) {
        setError('Invalid code. Please check your authenticator app and try again.');
        setLoading(false);
        return;
      }

      // Update backend to enable 2FA
      const changeUserData = {
        pwd: password,
        gAuth: true,
        gAuthSecret: qrData.secret,
        twoFa: true,
        sms: false,
      };

      await updateCurrentActionsUser(changeUserData);

      // Show success state
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to enable 2FA');
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Bootstrap Modal Backdrop */}
      <div className="modal-backdrop fade show" onClick={success ? undefined : handleClose}></div>

      {/* Bootstrap Modal */}
      <div className="modal fade show d-block two-factor-enable-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
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

                  <h4 className="mb-3">Google Authenticator is Activated</h4>
                  <p className="text-white-50 mb-4">Two-Factor Authentication has been successfully enabled on your account.</p>

                  <div className="alert alert-warning d-inline-flex align-items-center" role="alert">
                    <svg className="me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>Logging out in <strong>{countdown}</strong> second{countdown !== 1 ? 's' : ''}...</span>
                  </div>

                  <p className="text-white-50 small mt-3">You will need to use your authenticator app the next time you log in.</p>
                </div>
              </>
            ) : (
              // Form State
              <>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title">Enable Two-Factor Authentication</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={handleClose}
                    disabled={loading}
                  ></button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    <div className="row">
                      {/* Left Column: QR Code & Instructions */}
                      <div className="col-md-6">
                        <h6 className="mb-3">Scan QR Code</h6>
                        {qrData ? (
                          <div className="qr-code-container text-center mb-3">
                            <img
                              src={qrData.qrCodeURL}
                              alt="2FA QR Code"
                              className="img-fluid bg-white p-3 rounded"
                              style={{ maxWidth: '250px' }}
                            />
                          </div>
                        ) : (
                          <div className="text-center py-5">
                            <div className="spinner-border text-warning" role="status">
                              <span className="visually-hidden">Generating...</span>
                            </div>
                          </div>
                        )}

                        {/* Secret Key */}
                        {qrData && (
                          <div className="secret-key-container">
                            <p className="text-white-50 small mb-2">Or enter this key manually:</p>
                            <div className="input-group mb-2">
                              <input
                                type="text"
                                className="form-control form-control-sm bg-dark text-white border-secondary font-monospace"
                                value={qrData.gAuthSecret}
                                readOnly
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={handleCopySecret}
                                disabled={loading}
                              >
                                {copied ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                            <p className="text-warning small mb-0">
                              <strong>Important:</strong> Save this secret key in a safe place
                            </p>
                          </div>
                        )}

                        <div className="mt-3">
                          <p className="text-white-50 small mb-2">Download Google Authenticator:</p>
                          <div className="d-flex gap-2">
                            <a
                              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="/assets/images/png_icon_google.png"
                                alt="Google Play"
                                style={{ width: '100px' }}
                              />
                            </a>
                            <a
                              href="https://itunes.apple.com/es/app/google-authenticator/id388497605"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src="/assets/images/png_icon_apple.png"
                                alt="App Store"
                                style={{ width: '90px' }}
                              />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Verification Form */}
                      <div className="col-md-6">
                        <h6 className="mb-3">Complete Setup</h6>
                        <p className="text-white-50 small mb-3">
                          After scanning the QR code with Google Authenticator, enter your password and the verification code below.
                        </p>

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
                            Enter the 6-digit code from your authenticator app
                          </div>
                        </div>
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
                      className="btn btn-warning"
                      disabled={loading || !code || code.length !== 6 || !password}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Enabling...
                        </>
                      ) : (
                        'Enable 2FA'
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

TwoFactorEnableModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default TwoFactorEnableModal;
