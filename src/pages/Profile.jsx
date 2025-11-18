import React, { useState } from 'react';
import { MetaTags } from 'react-meta-tags';
import { withTranslation } from 'react-i18next';
import { useUser } from '../context/user-context';

import Background from '../components/global/Background';
import BackgroundInner from '../components/global/BackgroundInner';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileInformation from '../components/profile/ProfileInformation';
import ProfilePasswordChange from '../components/profile/ProfilePasswordChange';
import ProfileTwoFactor from '../components/profile/ProfileTwoFactor';
import ProfileCloseAccount from '../components/profile/ProfileCloseAccount';
import TwoFactorModal from '../components/profile/TwoFactorModal';
import ProfileCloseAccountConfirmation from '../components/profile/ProfileCloseAccountConfirmation';

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
  const { user, destroyUser, firebase } = useUser();

  // Section navigation state
  const [activeSection, setActiveSection] = useState('information');

  // 2FA modal state
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorModalData, setTwoFactorModalData] = useState(null);

  // Close account modal state
  const [showCloseAccountConfirmModal, setShowCloseAccountConfirmModal] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

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
  const handleDeleteAccountClick = () => {
    setShowCloseAccountConfirmModal(true);
  };

  // Handle close account confirmation modal cancel
  const handleCloseAccountCancel = () => {
    setShowCloseAccountConfirmModal(false);
  };

  // Handle account deletion after email/password confirmation
  const handleConfirmDeleteAccount = async ({ email, password }) => {
    try {
      setDeletingAccount(true);

      // Reauthenticate user with email and password
      const credential = firebase.emailAuthProvider.credential(email, password);
      await firebase.auth.currentUser.reauthenticateWithCredential(credential);

      // Delete user from database and Firebase Auth
      await destroyUser(user.data.uid);

      // User will be logged out automatically
      // Redirect to home or login page
    } catch (error) {
      console.error('Error deleting account:', error);
      alert(t('profile.closeAccount.error') || 'Failed to delete account. Please try again.');
    } finally {
      setDeletingAccount(false);
      setShowCloseAccountConfirmModal(false);
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

        {/* Close Account Confirmation Modal */}
        <ProfileCloseAccountConfirmation
          isOpen={showCloseAccountConfirmModal}
          onConfirm={handleConfirmDeleteAccount}
          onCancel={handleCloseAccountCancel}
          isLoading={deletingAccount}
        />
      </main>
    </Background>
  );
}

export default withTranslation()(Profile);
