import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './TwoFactorSuccessModal.scss';

/**
 * TwoFactorSuccessModal Component
 *
 * Success modal shown after 2FA is disabled
 * Auto-closes after 2 seconds and triggers logout
 *
 * @component
 * @subcategory Profile
 */
function TwoFactorSuccessModal({ show, onClose }) {
  useEffect(() => {
    if (show) {
      // Auto-close after 2 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      {/* Bootstrap Modal Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Bootstrap Modal */}
      <div className="modal fade show d-block two-factor-success-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div className="modal-content bg-dark text-white">
            <div className="modal-body text-center py-5">
              {/* Success Icon */}
              <div className="success-icon mb-3">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2"/>
                  <path d="M8 12L11 15L16 9" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h5 className="modal-title mb-2">Your secret was removed</h5>
              <p className="text-white-50 mb-0">Google authenticator is disabled</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

TwoFactorSuccessModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TwoFactorSuccessModal;
