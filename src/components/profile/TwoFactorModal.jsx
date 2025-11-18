import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './TwoFactorModal.scss';

/**
 * TwoFactorModal Component
 *
 * Modal for verifying 2FA code during setup or authentication.
 * Displays input for 6-digit code with validation.
 *
 * @component
 * @subcategory Profile
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {function} props.onClose - Callback when modal closes
 * @param {function} props.onVerify - Callback when code is verified
 * @param {string} props.type - Type of verification ('enable' or 'verify')
 *
 * @example
 * <TwoFactorModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   onVerify={(code) => verify2FACode(code)}
 *   type="enable"
 * />
 */
function TwoFactorModal({ isOpen, onClose, onVerify, type }) {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('two-factor-modal-open');
    } else {
      document.body.classList.remove('two-factor-modal-open');
    }

    return () => {
      document.body.classList.remove('two-factor-modal-open');
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // Handle code input change
  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 6) {
      setCode(value);
      setError('');
      setSuccess(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code) {
      setError(t('profile.twoFactorModal.errors.codeRequired'));
      return;
    }

    if (code.length !== 6) {
      setError(t('profile.twoFactorModal.errors.codeInvalid'));
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Verify code through callback
      if (onVerify) {
        await onVerify(code);
        setSuccess(true);

        // Close modal after brief delay
        setTimeout(() => {
          handleClose();
        }, 1500);
      }
    } catch (err) {
      console.error('Error verifying 2FA code:', err);
      setError(t('profile.twoFactorModal.errors.verificationFailed'));
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setCode('');
    setError('');
    setSuccess(false);
    setLoading(false);
    if (onClose) {
      onClose();
    }
  };

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Render close icon
  const renderCloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="18"
        y1="6"
        x2="6"
        y2="18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="two-factor-modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="two-factor-modal-title">
      <div className="two-factor-modal" ref={modalRef}>
        <button
          className="two-factor-modal__close"
          onClick={handleClose}
          type="button"
          aria-label="Close modal"
        >
          {renderCloseIcon()}
        </button>

        <div className="two-factor-modal__header">
          <h2 id="two-factor-modal-title" className="two-factor-modal__title">
            {type === 'enable'
              ? t('profile.twoFactorModal.enableTitle')
              : t('profile.twoFactorModal.verifyTitle')}
          </h2>
          <p className="two-factor-modal__description">
            {type === 'enable'
              ? t('profile.twoFactorModal.enableDescription')
              : t('profile.twoFactorModal.verifyDescription')}
          </p>
        </div>

        <form className="two-factor-modal__form" onSubmit={handleSubmit}>
          <div className="two-factor-modal__form-group">
            <label htmlFor="two-factor-code" className="two-factor-modal__label">
              {t('profile.twoFactorModal.codeLabel')}
            </label>
            <input
              ref={inputRef}
              type="text"
              id="two-factor-code"
              value={code}
              onChange={handleCodeChange}
              className={`two-factor-modal__input ${error ? 'two-factor-modal__input--error' : ''} ${
                success ? 'two-factor-modal__input--success' : ''
              }`}
              placeholder="000000"
              disabled={loading || success}
              maxLength={6}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
            />
            <p className="two-factor-modal__helper-text">{t('profile.twoFactorModal.codeHelper')}</p>

            {error && <p className="two-factor-modal__error-text">{error}</p>}
            {success && <p className="two-factor-modal__success-text">{t('profile.twoFactorModal.success')}</p>}
          </div>

          <div className="two-factor-modal__actions">
            <button
              type="submit"
              className="two-factor-modal__button two-factor-modal__button--primary"
              disabled={loading || success || code.length !== 6}
            >
              {loading ? (
                <>
                  <span className="two-factor-modal__loading" />
                  {t('profile.twoFactorModal.verifying')}
                </>
              ) : success ? (
                t('profile.twoFactorModal.verified')
              ) : (
                t('profile.twoFactorModal.verify')
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="two-factor-modal__button two-factor-modal__button--secondary"
              disabled={loading || success}
            >
              {t('profile.twoFactorModal.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

TwoFactorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['enable', 'verify']),
};

TwoFactorModal.defaultProps = {
  type: 'verify',
};

export default TwoFactorModal;
