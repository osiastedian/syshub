import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { verifyGauthCode } from '../../utils/request';
import './DeleteAccountTwoFactorModal.scss';

/**
 * DeleteAccountTwoFactorModal Component
 *
 * 2FA verification modal shown before account deletion when user has 2FA enabled.
 * Requires Google Authenticator code verification for security.
 *
 * @component
 * @subcategory Profile
 *
 * @param {Object} props - Component props
 * @param {boolean} props.show - Whether the modal is visible
 * @param {function} props.onClose - Callback when modal is closed
 * @param {function} props.onVerified - Callback when 2FA code is successfully verified
 *
 * @example
 * <DeleteAccountTwoFactorModal
 *   show={showModal}
 *   onClose={() => setShowModal(false)}
 *   onVerified={handleDeleteAccount}
 * />
 */
function DeleteAccountTwoFactorModal({ show, onClose, onVerified }) {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (show) {
      setCode('');
      setError('');
      setLoading(false);
    }
  }, [show]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Verify the 2FA code
      const response = await verifyGauthCode(code);

      if (response.data && response.data.ok) {
        // Code verified successfully
        setLoading(false);
        onVerified();
      } else {
        setError('Invalid verification code. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify code. Please try again.');
      setLoading(false);
    }
  };

  // Handle code input change (only allow numbers, max 6 digits)
  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    setError(''); // Clear error on input
  };

  if (!show) return null;

  // Render shield icon
  const renderShieldIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"
        stroke="#FBB03B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="#FBB03B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="delete-account-2fa-modal">
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark text-white border-secondary">
            <div className="modal-header border-secondary">
              <h5 className="modal-title w-100 text-center">
                Two-Factor Authentication Required
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                disabled={loading}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body p-4">
              {/* Icon */}
              <div className="text-center mb-4">
                {renderShieldIcon()}
              </div>

              {/* Warning Message */}
              <div className="alert alert-warning mb-4" role="alert">
                <strong>Security Verification Required</strong>
                <p className="mb-0 mt-2">
                  Since you have two-factor authentication enabled, please enter your 6-digit code
                  from Google Authenticator to confirm account deletion.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="delete-2fa-code" className="form-label">
                    Google Authenticator Code
                  </label>
                  <input
                    id="delete-2fa-code"
                    type="text"
                    className="form-control form-control-lg bg-dark text-white border-secondary text-center"
                    style={{
                      fontSize: '24px',
                      letterSpacing: '8px',
                      fontWeight: '500'
                    }}
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="000000"
                    maxLength="6"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    autoFocus
                    disabled={loading}
                    required
                  />
                  <div className="form-text text-white-50 mt-2">
                    Enter the 6-digit code from your authenticator app
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger flex-fill"
                    disabled={loading || code.length !== 6}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Verifying...
                      </>
                    ) : (
                      'Verify & Delete Account'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}

DeleteAccountTwoFactorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onVerified: PropTypes.func.isRequired,
};

export default DeleteAccountTwoFactorModal;
