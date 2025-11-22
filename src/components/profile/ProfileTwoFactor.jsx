import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user-context';
import { get2faInfoUser } from '../../utils/request';
import TwoFactorEnableModal from './TwoFactorEnableModal';
import TwoFactorDisableModal from './TwoFactorDisableModal';
import './ProfileTwoFactor.scss';

/**
 * ProfileTwoFactor Component
 *
 * Manages Two-Factor Authentication settings.
 * Allows enabling/disabling 2FA and displays backup codes.
 *
 * @component
 * @subcategory Profile
 *
 * @param {Object} props - Component props
 * @param {function} props.onOpenModal - Callback to open 2FA verification modal
 *
 * @example
 * <ProfileTwoFactor onOpenModal={() => setShowModal(true)} />
 */
function ProfileTwoFactor({ onOpenModal }) {
  const { t } = useTranslation();
  const { user, updateCurrentActionsUser, logoutUser } = useUser();

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [setupData, setSetupData] = useState(null);
  const [backupCodes, setBackupCodes] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedCodes, setCopiedCodes] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);

  // Load 2FA status on mount
  useEffect(() => {
    const load2FAStatus = async () => {
      try {
        if (!user?.data?.uid) {
          return;
        }

        // Fetch actual 2FA status from backend
        const user2faInfo = await get2faInfoUser(user.data.uid);
        const hasGAuth2FA = user2faInfo.twoFa === true && user2faInfo.gAuth === true;

        setTwoFactorEnabled(hasGAuth2FA);

        // Load backup codes if 2FA is enabled
        if (hasGAuth2FA && user2faInfo.backupCodes) {
          setBackupCodes(user2faInfo.backupCodes);
        }
      } catch (error) {
        console.error('Error loading 2FA status:', error);
        setTwoFactorEnabled(false);
      }
    };

    if (user?.data?.uid) {
      load2FAStatus();
    }
  }, [user?.data?.uid]);

  // Handle enabling 2FA
  const handleEnable2FA = () => {
    setShowEnableModal(true);
  };

  // Handle 2FA enable success (called by modal after countdown)
  const handleEnableSuccess = () => {
    // Logout is triggered by the modal's countdown
    logoutUser();
  };

  // Handle disabling 2FA
  const handleDisable2FA = () => {
    setShowDisableModal(true);
  };

  // Handle 2FA disable confirmation
  const handleDisableConfirm = async ({ password, code }) => {
    // Call backend to disable 2FA
    const currentUserDataUpdate = {
      pwd: password,
      code,
      gAuthSecret: null,
      gAuth: false,
      twoFa: false,
    };

    await updateCurrentActionsUser(currentUserDataUpdate, {
      method: "gauth-disabled",
    });

    // Success is shown within the modal, error is thrown to modal
  };

  // Handle disable success (called by modal after countdown)
  const handleDisableSuccess = () => {
    // Logout is triggered by the modal's countdown
    logoutUser();
  };

  // Copy all backup codes to clipboard
  const handleCopyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    setCopiedCodes(true);
    setTimeout(() => setCopiedCodes(false), 2000);
  };

  // Render shield icon
  const renderShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  return (
    <div className="profile-two-factor">
      <div className="profile-two-factor__header">
        <div className="profile-two-factor__title-group">
          <h2 className="profile-two-factor__title">{t('profile.twoFactor.title')}</h2>
          <p className="profile-two-factor__description">{t('profile.twoFactor.description')}</p>
        </div>
        <span
          className={`profile-two-factor__status-badge ${
            twoFactorEnabled
              ? 'profile-two-factor__status-badge--enabled'
              : 'profile-two-factor__status-badge--disabled'
          }`}
        >
          {twoFactorEnabled ? t('profile.twoFactor.enabled') : t('profile.twoFactor.disabled')}
        </span>
      </div>

      {/* Status Card */}
      <div className="profile-two-factor__status-card">
        {twoFactorEnabled ? (
          <>
            {/* Show Google Authenticated with ENABLED pill when 2FA is enabled */}
            <div className="profile-two-factor__enabled-status">
              <h3 className="profile-two-factor__enabled-title">Google Authenticator</h3>
              <span className="profile-two-factor__status-pill profile-two-factor__status-pill--enabled">
                ENABLED
              </span>
            </div>
            <p className="profile-two-factor__status-text">
              {t('profile.twoFactor.enabledDescription')}
            </p>

            {/* Success Message */}
            {successMessage && <p className="profile-two-factor__success-text">{successMessage}</p>}

            {/* Error Message */}
            {errorMessage && <p className="profile-two-factor__error-text">{errorMessage}</p>}

            <div className="profile-two-factor__actions">
              <button
                onClick={handleDisable2FA}
                className="profile-two-factor__button profile-two-factor__button--disable"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="profile-two-factor__loading" />
                    {t('profile.twoFactor.disabling')}
                  </>
                ) : (
                  t('profile.twoFactor.disable')
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="profile-two-factor__status-title">
              {t('profile.twoFactor.currentlyDisabled')}
            </h3>
            <p className="profile-two-factor__status-text">
              {t('profile.twoFactor.disabledDescription')}
            </p>

            {/* Success Message */}
            {successMessage && <p className="profile-two-factor__success-text">{successMessage}</p>}

            {/* Error Message */}
            {errorMessage && <p className="profile-two-factor__error-text">{errorMessage}</p>}

            <div className="profile-two-factor__actions">
              <button
                onClick={handleEnable2FA}
                className="profile-two-factor__button profile-two-factor__button--enable"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="profile-two-factor__loading" />
                    {t('profile.twoFactor.enabling')}
                  </>
                ) : (
                  <>
                    <span className="profile-two-factor__button-icon">{renderShieldIcon()}</span>
                    {t('profile.twoFactor.enable')}
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* QR Code Section (only shown during setup) */}
      {setupData && (
        <div className="profile-two-factor__qr-section">
          <h3 className="profile-two-factor__qr-title">{t('profile.twoFactor.scanQRCode')}</h3>
          <div className="profile-two-factor__qr-code">
            <img src={setupData.qrCode} alt="2FA QR Code" />
          </div>
          <div className="profile-two-factor__secret-key">
            <p className="profile-two-factor__secret-label">{t('profile.twoFactor.secretKey')}</p>
            <p className="profile-two-factor__secret-value">{setupData.secret}</p>
          </div>
        </div>
      )}

      {/* Backup Codes Section (only shown if 2FA is enabled) */}
      {twoFactorEnabled && backupCodes.length > 0 && (
        <div className="profile-two-factor__backup-codes">
          <div className="profile-two-factor__backup-header">
            <h3 className="profile-two-factor__backup-title">{t('profile.twoFactor.backupCodes')}</h3>
          </div>

          <p className="profile-two-factor__backup-warning">{t('profile.twoFactor.backupWarning')}</p>

          <div className="profile-two-factor__codes-grid">
            {backupCodes.map((code, index) => (
              <div key={index} className="profile-two-factor__code-item">
                {code}
              </div>
            ))}
          </div>

          <button onClick={handleCopyBackupCodes} className="profile-two-factor__copy-all-button">
            {copiedCodes ? t('profile.twoFactor.copied') : t('profile.twoFactor.copyAll')}
          </button>
        </div>
      )}

      {/* 2FA Enable Modal */}
      <TwoFactorEnableModal
        show={showEnableModal}
        onClose={() => setShowEnableModal(false)}
        onSuccess={handleEnableSuccess}
      />

      {/* 2FA Disable Modal */}
      <TwoFactorDisableModal
        show={showDisableModal}
        onClose={() => setShowDisableModal(false)}
        onConfirm={handleDisableConfirm}
        onSuccess={handleDisableSuccess}
      />
    </div>
  );
}

ProfileTwoFactor.propTypes = {
  onOpenModal: PropTypes.func,
};

ProfileTwoFactor.defaultProps = {
  onOpenModal: null,
};

export default ProfileTwoFactor;
