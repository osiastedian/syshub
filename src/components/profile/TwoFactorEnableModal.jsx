import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAuthQrCode, verifyAuthCode } from '../../utils/twoFaAuthentication';
import { useUser } from '../../context/user-context';
import './TwoFactorEnableModal.scss';

/**
 * TwoFactorEnableModal Component
 *
 * Modal for enabling Two-Factor Authentication
 * Shows QR code, secret key, and verification input
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

  // Generate QR code when modal opens
  useEffect(() => {
    if (show && user?.data?.email && !qrData) {
      const { secret, gAuthSecret, qrCodeURL } = getAuthQrCode(user.data.email);
      setQrData({ secret, gAuthSecret, qrCodeURL });
    }
  }, [show, user?.data?.email, qrData]);

  const handleClose = () => {
    setQrData(null);
    setCode('');
    setPassword('');
    setError('');
    setLoading(false);
    setCopied(false);
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

      // Success
      if (onSuccess) {
        await onSuccess();
      }
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to enable 2FA');
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Bootstrap Modal Backdrop */}
      <div className="modal-backdrop fade show" onClick={handleClose}></div>

      {/* Bootstrap Modal */}
      <div className="modal fade show d-block two-factor-enable-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title">Enable Two-Factor Authentication</h5>
              <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="row">
                  {/* Left Column: QR Code */}
                  <div className="col-md-6">
                    <h6 className="mb-3">Step 1: Scan QR Code</h6>
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
                          >
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-warning small mb-0">
                          <strong>Important:</strong> Save this secret key in a safe place
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Instructions & Verification */}
                  <div className="col-md-6">
                    <h6 className="mb-3">Step 2: Download App</h6>
                    <p className="text-white-50 small">Download Google Authenticator:</p>
                    <div className="d-flex gap-2 mb-4">
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

                    <h6 className="mb-3">Step 3: Verify Setup</h6>

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
