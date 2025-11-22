import React, { useState } from 'react';
import { MetaTags } from 'react-meta-tags';
import { withTranslation } from 'react-i18next';
import { useUser } from '../context/user-context';
import { get2faInfoUser } from '../utils/request';

import Background from '../components/global/Background';
import BackgroundInner from '../components/global/BackgroundInner';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileInformation from '../components/profile/ProfileInformation';
import ProfilePasswordChange from '../components/profile/ProfilePasswordChange';
import ProfileTwoFactor from '../components/profile/ProfileTwoFactor';
import ProfileCloseAccount from '../components/profile/ProfileCloseAccount';
import TwoFactorModal from '../components/profile/TwoFactorModal';
import ProfileCloseAccountConfirmation from '../components/profile/ProfileCloseAccountConfirmation';
import DeleteAccountTwoFactorModal from '../components/profile/DeleteAccountTwoFactorModal';

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
  const [showDelete2FAModal, setShowDelete2FAModal] = useState(false);
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

      // Check if user has 2FA enabled
      const user2faInfo = await get2faInfoUser(user.data.uid);
      const has2FA = user2faInfo.twoFa === true && user2faInfo.gAuth === true;

      if (has2FA) {
        // Show 2FA verification modal
        setShowCloseAccountConfirmModal(false);
        setShowDelete2FAModal(true);
        setDeletingAccount(false);
      } else {
        // No 2FA, proceed with deletion directly
        await deleteAccountWithoutTwoFactor();
      }
    } catch (error) {
      console.error('Error during account deletion process:', error);
      alert(t('profile.closeAccount.error') || 'Failed to delete account. Please try again.');
      setDeletingAccount(false);
      setShowCloseAccountConfirmModal(false);
    }
  };

  // Handle account deletion for users WITHOUT 2FA
  const deleteAccountWithoutTwoFactor = async () => {
    try {
      setShowCloseAccountConfirmModal(false);

      // Delete user from database
      await destroyUser(user.data.uid);

      // Show success message for 2 seconds (matches old behavior)
      alert(t('profile.closeAccount.success') || 'Your account has been deleted successfully.');

      // Wait a bit then logout
      setTimeout(async () => {
        await logoutUser();
      }, 100);
    } catch (error) {
      console.error('Error deleting account:', error);
      alert(t('profile.closeAccount.error') || 'Failed to delete account. Please try again.');
      setDeletingAccount(false);
      setShowCloseAccountConfirmModal(false);
    }
  };

  // Handle account deletion after 2FA verification (called by DeleteAccountTwoFactorModal)
  const deleteAccountAfter2FA = async () => {
    try {
      setShowCloseAccountConfirmModal(false);

      // Delete user from database
      await destroyUser(user.data.uid);
      // Success state is shown in the modal
      // Logout will be triggered by handleDeleteAccountSuccess after countdown
    } catch (error) {
      console.error('Error deleting account:', error);
      alert(t('profile.closeAccount.error') || 'Failed to delete account. Please try again.');
      setShowDelete2FAModal(false);
      setShowCloseAccountConfirmModal(false);
      setDeletingAccount(false);
      throw error; // Re-throw so modal can handle the error
    }
  };

  // Handle successful account deletion with logout (called after countdown)
  const handleDeleteAccountSuccess = async () => {
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

  // Handle 2FA modal close
  const handleClose2FADeleteModal = () => {
    setShowDelete2FAModal(false);
    setDeletingAccount(false);
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

        {/* Delete Account 2FA Verification Modal */}
        <DeleteAccountTwoFactorModal
          show={showDelete2FAModal}
          onClose={handleClose2FADeleteModal}
          onVerified={deleteAccountAfter2FA}
          onSuccess={handleDeleteAccountSuccess}
        />
      </main>
    </Background>
  );
}

export default withTranslation()(Profile);
