import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './DeleteAccountSuccessModal.scss';

/**
 * DeleteAccountSuccessModal Component
 *
 * Success modal shown after account deletion with countdown before logout.
 * Matches the design pattern from 2FA enable/disable flows.
 *
 * @component
 * @subcategory Profile
 *
 * @param {Object} props - Component props
 * @param {boolean} props.show - Whether the modal is visible
 * @param {function} props.onSuccess - Callback triggered after countdown completes (for logout)
 *
 * @example
 * <DeleteAccountSuccessModal
 *   show={showModal}
 *   onSuccess={handleLogout}
 * />
 */
function DeleteAccountSuccessModal({ show, onSuccess }) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(3);

  // Reset countdown when modal opens
  useEffect(() => {
    if (show) {
      setCountdown(3);
    }
  }, [show]);

  // Countdown timer
  useEffect(() => {
    if (show && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (show && countdown === 0) {
      if (onSuccess) onSuccess(); // Trigger logout
    }
  }, [show, countdown, onSuccess]);

  if (!show) return null;

  // Render success checkmark icon
  const renderSuccessIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="none" />
      <path d="M8 12L11 15L16 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="delete-account-success-modal">
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark text-white border-secondary">
            <div className="modal-body p-4">
              <div className="text-center mb-4 success-icon">
                {renderSuccessIcon()}
              </div>
              <h4 className="text-center text-white mb-3">Your Account Has Been Deleted</h4>
              <p className="text-center text-white-50 mb-4">
                All your data has been permanently removed from our system.
              </p>
              <div className="alert alert-warning text-center mb-0" role="alert">
                Logging out in <strong>{countdown}</strong> second{countdown !== 1 ? 's' : ''}...
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}

DeleteAccountSuccessModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default DeleteAccountSuccessModal;
