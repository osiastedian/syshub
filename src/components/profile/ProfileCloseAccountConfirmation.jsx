import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './ProfileCloseAccountConfirmation.scss';

/**
 * Close Account Confirmation Modal
 * Final warning before account deletion with email/password confirmation
 *
 * @component
 * @subcategory Profile
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility state
 * @param {Function} props.onConfirm - Called when user confirms deletion with email/password
 * @param {Function} props.onCancel - Called when user cancels
 * @param {boolean} props.isLoading - Loading state during deletion
 *
 * @example
 * <ProfileCloseAccountConfirmation
 *   isOpen={showModal}
 *   onConfirm={({ email, password }) => handleDelete(email, password)}
 *   onCancel={() => setShowModal(false)}
 *   isLoading={deleting}
 * />
 */
function ProfileCloseAccountConfirmation({ isOpen, onConfirm, onCancel, isLoading }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && !isLoading) {
      onConfirm({ email, password });
    }
  };

  const isFormValid = email && password;

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
};

ProfileCloseAccountConfirmation.defaultProps = {
  isLoading: false,
};

export default ProfileCloseAccountConfirmation;
