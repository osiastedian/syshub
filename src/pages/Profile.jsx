import React, { useState } from 'react';
import { MetaTags } from 'react-meta-tags';
import { withTranslation } from 'react-i18next';
import { EmailAuthProvider } from 'firebase/auth';
import { useUser } from '../context/user-context';
import { get2faInfoUser, verifyGauthCode } from '../utils/request';

import Background from '../components/global/Background';
import BackgroundInner from '../components/global/BackgroundInner';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileInformation from '../components/profile/ProfileInformation';
import ProfilePasswordChange from '../components/profile/ProfilePasswordChange';
import ProfileTwoFactor from '../components/profile/ProfileTwoFactor';
import ProfileCloseAccount from '../components/profile/ProfileCloseAccount';
import TwoFactorModal from '../components/profile/TwoFactorModal';
import ProfileCloseAccountConfirmation from '../components/profile/ProfileCloseAccountConfirmation';
import DeleteAccountSuccessModal from '../components/profile/DeleteAccountSuccessModal';

import '../components/profile/_profile.scss';

/**
 * Profile page - User settings and account management
 *
 * Integrates all profile components:
 * - ProfileSidebar: Navigation between sections
 * - ProfileInformation: Email and voting address
 * - ProfilePasswordChange: Password update
 * - ProfileTwoFactor: 2FA management
 * - ProfileCloseAccount: Account deletion
 * - TwoFactorModal: 2FA code verification
 * - ProfileCloseAccountConfirmation: Email + password reauthentication
 *
 * @component
 * @category Pages
 * @param {Object} t - Translation function from withTranslation
 */
function Profile({ t }) {
  const { user, destroyUser, logoutUser, firebase } = useUser();

  // Section navigation state
  const [activeSection, setActiveSection] = useState('information');

  // 2FA modal state
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorModalData, setTwoFactorModalData] = useState(null);

  // Close account modal state
  const [showCloseAccountConfirmModal, setShowCloseAccountConfirmModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [has2FA, setHas2FA] = useState(false);

  // Handle section change from sidebar
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Handle opening 2FA modal
  const handleOpen2FAModal = (data) => {
    setTwoFactorModalData(data);
    setShowTwoFactorModal(true);
  };

  // Handle closing 2FA modal
  const handleClose2FAModal = () => {
    setShowTwoFactorModal(false);
    setTwoFactorModalData(null);
  };

  // Handle 2FA code verification
  const handleVerify2FACode = async (code) => {
    try {
      // Note: This is a placeholder. The actual verification logic
      // should be implemented in the user context or ProfileTwoFactor component
      // For now, we'll just resolve to allow the component to work
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Handle delete account button click (opens confirmation modal)
  const handleDeleteAccountClick = async () => {
    try {
      // Check if user has 2FA enabled
      const user2faInfo = await get2faInfoUser(user.data.uid);
      const has2FAEnabled = user2faInfo.twoFa === true && user2faInfo.gAuth === true;
      setHas2FA(has2FAEnabled);
      setShowCloseAccountConfirmModal(true);
    } catch (error) {
      console.error('Error checking 2FA status:', error);
      // Still show modal even if check fails
      setHas2FA(false);
      setShowCloseAccountConfirmModal(true);
    }
  };

  // Handle close account confirmation modal cancel
  const handleCloseAccountCancel = () => {
    setShowCloseAccountConfirmModal(false);
  };

  // Handle account deletion after email/password confirmation (and 2FA if enabled)
  const handleConfirmDeleteAccount = async ({ email, password, twoFactorCode }) => {
    try {
      setDeletingAccount(true);

      // If 2FA is enabled, verify the code first
      if (has2FA && twoFactorCode) {
        const response = await verifyGauthCode(twoFactorCode);
        if (!response.data || !response.data.ok) {
          alert('Invalid 2FA code. Please try again.');
          setDeletingAccount(false);
          return;
        }
      }

      // Reauthenticate user with Firebase before deletion (required for Firebase Auth deletion)
      const credential = EmailAuthProvider.credential(email, password);
      await firebase.auth.currentUser.reauthenticateWithCredential(credential);

      // Delete user from backend database first
      await destroyUser(user.data.uid);

      // Delete Firebase Auth user
      await firebase.auth.currentUser.delete();

      // Close confirmation modal and show success modal
      setShowCloseAccountConfirmModal(false);
      setShowDeleteSuccessModal(true);
    } catch (error) {
      console.error('Error during account deletion process:', error);

      // Provide more specific error messages
      let errorMessage = t('profile.closeAccount.error') || 'Failed to delete account. Please try again.';

      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'For security reasons, please log out and log back in before deleting your account.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
      setDeletingAccount(false);
      setShowCloseAccountConfirmModal(false);
    }
  };

  // Handle successful account deletion with logout (called after countdown in success modal)
  const handleDeleteSuccess = async () => {
    try {
      // Logout user after successful deletion
      // This matches the old behavior from UserDelete.jsx
      await logoutUser();
    } catch (error) {
      console.error('Error logging out after account deletion:', error);
      // Force reload to ensure logout
      window.location.href = '/';
    }
  };

  // Render active section content
  const renderContent = () => {
    switch (activeSection) {
      case 'information':
        return <ProfileInformation />;
      case 'password':
        return <ProfilePasswordChange />;
      case 'twoFactor':
        return <ProfileTwoFactor onOpenModal={handleOpen2FAModal} />;
      case 'closeAccount':
        return <ProfileCloseAccount onDeleteAccount={handleDeleteAccountClick} />;
      default:
        return <ProfileInformation />;
    }
  };

  return (
    <Background>
      <BackgroundInner />
      <main className="section profile-page">
        <MetaTags>
          <title>{t('profile.meta.title')}</title>
          <meta name="keywords" content={t('profile.meta.keywords')} />
        </MetaTags>

        <div className="shell-large">
          <div className="profile-page__container">
            {/* Sidebar Navigation */}
            <ProfileSidebar activeSection={activeSection} onSectionChange={handleSectionChange} />

            {/* Main Content Area */}
            <div className="profile-page__content">{renderContent()}</div>
          </div>
        </div>

        {/* 2FA Verification Modal */}
        <TwoFactorModal
          isOpen={showTwoFactorModal}
          onClose={handleClose2FAModal}
          onVerify={handleVerify2FACode}
          type={twoFactorModalData?.type || 'verify'}
        />

        {/* Close Account Confirmation Modal (with optional 2FA code field) */}
        <ProfileCloseAccountConfirmation
          isOpen={showCloseAccountConfirmModal}
          onConfirm={handleConfirmDeleteAccount}
          onCancel={handleCloseAccountCancel}
          isLoading={deletingAccount}
          has2FA={has2FA}
        />

        {/* Delete Account Success Modal */}
        <DeleteAccountSuccessModal
          show={showDeleteSuccessModal}
          onSuccess={handleDeleteSuccess}
        />
      </main>
    </Background>
  );
}

export default withTranslation()(Profile);
