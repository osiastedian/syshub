import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './ProfileCloseAccountConfirmation.scss';

/**
 * Close Account Confirmation Modal
 * Final warning before account deletion with email/password confirmation
 * Includes 2FA code input when user has 2FA enabled
 *
 * @component
 * @subcategory Profile
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility state
 * @param {Function} props.onConfirm - Called when user confirms deletion with email/password (and 2FA code if enabled)
 * @param {Function} props.onCancel - Called when user cancels
 * @param {boolean} props.isLoading - Loading state during deletion
 * @param {boolean} props.has2FA - Whether user has 2FA enabled (shows 2FA code field)
 *
 * @example
 * <ProfileCloseAccountConfirmation
 *   isOpen={showModal}
 *   onConfirm={({ email, password, twoFactorCode }) => handleDelete(email, password, twoFactorCode)}
 *   onCancel={() => setShowModal(false)}
 *   isLoading={deleting}
 *   has2FA={true}
 * />
 */
function ProfileCloseAccountConfirmation({ isOpen, onConfirm, onCancel, isLoading, has2FA }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Handle ESC key
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          onCancel();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    } else {
      // Reset form when closed
      setEmail('');
      setPassword('');
      setTwoFactorCode('');
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = has2FA ? (email && password && twoFactorCode) : (email && password);
    if (isValid && !isLoading) {
      onConfirm({ email, password, twoFactorCode: has2FA ? twoFactorCode : undefined });
    }
  };

  const isFormValid = has2FA ? (email && password && twoFactorCode && twoFactorCode.length === 6) : (email && password);

  // Render error icon
  const renderErrorIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="12"
        y1="8"
        x2="12"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );

  return (
    <div
      className="profile-close-account-confirmation__overlay"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="close-account-title"
    >
      <div
        className="profile-close-account-confirmation__modal"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Icon & Title */}
          <div className="profile-close-account-confirmation__header">
            <div className="profile-close-account-confirmation__icon">
              {renderErrorIcon()}
            </div>
            <h2
              id="close-account-title"
              className="profile-close-account-confirmation__title"
            >
              {t('profile.closeAccountConfirmation.title')}
            </h2>
          </div>

          {/* Warning Messages & Input Fields */}
          <div className="profile-close-account-confirmation__content">
            <p className="profile-close-account-confirmation__message profile-close-account-confirmation__message--strong">
              {t('profile.closeAccountConfirmation.warningStrong')}
            </p>
            <p className="profile-close-account-confirmation__message">
              {t('profile.closeAccountConfirmation.warningBody')}
            </p>

            {/* Email Input */}
            <div className="profile-close-account-confirmation__input-group">
              <label
                htmlFor="delete-account-email"
                className="profile-close-account-confirmation__label"
              >
                {t('profile.closeAccountConfirmation.emailLabel')}
              </label>
              <input
                id="delete-account-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('profile.closeAccountConfirmation.emailPlaceholder')}
                className="profile-close-account-confirmation__input"
                disabled={isLoading}
                required
              />
            </div>

            {/* Password Input */}
            <div className="profile-close-account-confirmation__input-group">
              <label
                htmlFor="delete-account-password"
                className="profile-close-account-confirmation__label"
              >
                {t('profile.closeAccountConfirmation.passwordLabel')}
              </label>
              <input
                id="delete-account-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('profile.closeAccountConfirmation.passwordPlaceholder')}
                className="profile-close-account-confirmation__input"
                disabled={isLoading}
                required
              />
            </div>

            {/* 2FA Code Input (shown only when user has 2FA enabled) */}
            {has2FA && (
              <div className="profile-close-account-confirmation__input-group">
                <label
                  htmlFor="delete-account-2fa-code"
                  className="profile-close-account-confirmation__label"
                >
                  Google Authenticator Code
                </label>
                <input
                  id="delete-account-2fa-code"
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setTwoFactorCode(value);
                  }}
                  placeholder="000000"
                  className="profile-close-account-confirmation__input profile-close-account-confirmation__input--2fa"
                  style={{
                    fontSize: '20px',
                    letterSpacing: '6px',
                    fontWeight: '500',
                    textAlign: 'center'
                  }}
                  maxLength="6"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  disabled={isLoading}
                  required
                />
                <div className="profile-close-account-confirmation__helper-text">
                  Enter the 6-digit code from your authenticator app
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="profile-close-account-confirmation__actions">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="profile-close-account-confirmation__button profile-close-account-confirmation__button--cancel"
              type="button"
            >
              {t('profile.closeAccountConfirmation.cancel')}
            </button>
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="profile-close-account-confirmation__button profile-close-account-confirmation__button--danger"
              aria-label={t('profile.closeAccountConfirmation.confirmLabel')}
            >
              {isLoading ? t('profile.closeAccountConfirmation.deleting') : t('profile.closeAccountConfirmation.confirm')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ProfileCloseAccountConfirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  has2FA: PropTypes.bool,
};

ProfileCloseAccountConfirmation.defaultProps = {
  isLoading: false,
  has2FA: false,
};

export default ProfileCloseAccountConfirmation;
