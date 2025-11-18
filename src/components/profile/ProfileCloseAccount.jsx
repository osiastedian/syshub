import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './ProfileCloseAccount.scss';

/**
 * ProfileCloseAccount Component
 *
 * Displays warning about account deletion and provides button to close account.
 * Triggers confirmation modal (created in integration task).
 *
 * @component
 * @subcategory Profile
 *
 * @param {Object} props - Component props
 * @param {function} props.onDeleteAccount - Callback when delete button is clicked
 *
 * @example
 * <ProfileCloseAccount onDeleteAccount={() => setShowConfirmModal(true)} />
 */
function ProfileCloseAccount({ onDeleteAccount }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle delete account button click
  const handleDeleteClick = () => {
    setErrorMessage('');

    // Trigger modal (modal will be created in integration task)
    if (onDeleteAccount) {
      onDeleteAccount();
    }
  };

  // Render warning icon
  const renderWarningIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L2 20h20L12 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="12"
        y1="9"
        x2="12"
        y2="13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );

  // Render trash icon
  const renderTrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 6H5H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  return (
    <div className="profile-close-account">
      <div className="profile-close-account__header">
        <h2 className="profile-close-account__title">{t('profile.closeAccount.title')}</h2>
        <p className="profile-close-account__description">{t('profile.closeAccount.description')}</p>
      </div>

      {/* Warning Box */}
      <div className="profile-close-account__warning-box">
        <div className="profile-close-account__warning-header">
          <div className="profile-close-account__warning-icon">{renderWarningIcon()}</div>
          <h3 className="profile-close-account__warning-title">{t('profile.closeAccount.warningTitle')}</h3>
        </div>

        <p className="profile-close-account__warning-text">{t('profile.closeAccount.warningText')}</p>

        <ul className="profile-close-account__warning-list">
          <li>{t('profile.closeAccount.consequences.data')}</li>
          <li>{t('profile.closeAccount.consequences.access')}</li>
          <li>{t('profile.closeAccount.consequences.votes')}</li>
          <li>{t('profile.closeAccount.consequences.masternodes')}</li>
          <li>{t('profile.closeAccount.consequences.irreversible')}</li>
        </ul>

        <p className="profile-close-account__warning-note">{t('profile.closeAccount.warningNote')}</p>
      </div>

      {/* Confirmation Section */}
      <div className="profile-close-account__confirmation">
        <h3 className="profile-close-account__confirmation-title">{t('profile.closeAccount.confirmationTitle')}</h3>
        <p className="profile-close-account__confirmation-text">{t('profile.closeAccount.confirmationText')}</p>

        {/* Error Message */}
        {errorMessage && <p className="profile-close-account__error-text">{errorMessage}</p>}

        <div className="profile-close-account__actions">
          <button
            onClick={handleDeleteClick}
            className="profile-close-account__button profile-close-account__button--danger"
            disabled={loading}
            type="button"
          >
            {loading ? (
              <>
                <span className="profile-close-account__loading" />
                {t('profile.closeAccount.deleting')}
              </>
            ) : (
              <>
                <span className="profile-close-account__button-icon">{renderTrashIcon()}</span>
                {t('profile.closeAccount.delete')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

ProfileCloseAccount.propTypes = {
  onDeleteAccount: PropTypes.func,
};

ProfileCloseAccount.defaultProps = {
  onDeleteAccount: null,
};

export default ProfileCloseAccount;
