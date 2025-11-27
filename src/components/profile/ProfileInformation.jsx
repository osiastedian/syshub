import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUser } from '../../context/user-context';
import { getUserInfo, getUserVotingAddress, destroyVotingAddress } from '../../utils/request';
import CTAButton from '../global/CTAButton';
import './ProfileInformation.scss';

/**
 * ProfileInformation Component
 *
 * Displays user email (readonly) and voting addresses list.
 *
 * @component
 * @subcategory Profile
 *
 * @param {function} onAddVotingAddress - Callback to open add voting address form
 * @param {function} onEditVotingAddress - Callback to open edit voting address form
 *
 * @example
 * <ProfileInformation onAddVotingAddress={handleAdd} onEditVotingAddress={handleEdit} />
 */
function ProfileInformation({ onAddVotingAddress, onEditVotingAddress }) {
  const { t } = useTranslation();
  const { user, firebase } = useUser();

  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(true); // Default to true to avoid showing banner during load
  const [votingAddresses, setVotingAddresses] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [copiedAddress, setCopiedAddress] = useState('');
  const [sendingVerification, setSendingVerification] = useState(false);
  const [expandedAddresses, setExpandedAddresses] = useState({});
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState({});
  const isMounted = useRef(false);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);

  // Helper function to reload voting addresses (used after delete)
  const reloadVotingAddresses = async () => {
    try {
      const { data, status } = await getUserVotingAddress({ cancelToken: cancelSource.token });

      if (isMounted.current) {
        if (status === 200 && data) {
          setVotingAddresses(data.nodes || []);
        } else if (status === 204) {
          setVotingAddresses([]);
        }
      }
    } catch (error) {
      if (isMounted.current) {
        if (error.message !== 'The request has been canceled') {
          console.error('Error reloading voting addresses:', error);
        }
      }
    }
  };

  // Load both user info and voting addresses on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingData(true);
        isMounted.current = true;

        if (!user || !user.data || !user.data.uid) {
          setLoadingData(false);
          return;
        }

        // Load user info
        try {
          const response = await getUserInfo(user.data.uid);
          if (isMounted.current && response.data && response.data.user) {
            setEmail(response.data.user.email || user.data.email || '');
            setEmailVerified(response.data.user.emailVerified !== false);
          }
        } catch (error) {
          if (isMounted.current) {
            console.error('Error loading user info:', error);
          }
        }

        // Load voting addresses
        try {
          const { data, status } = await getUserVotingAddress({ cancelToken: cancelSource.token });

          if (isMounted.current) {
            if (status === 200 && data) {
              setVotingAddresses(data.nodes || []);
            } else if (status === 204) {
              setVotingAddresses([]);
            }
          }
        } catch (error) {
          if (isMounted.current) {
            if (error.message !== 'The request has been canceled') {
              console.error('Error loading voting addresses:', error);
            }
          }
        }
      } finally {
        if (isMounted.current) {
          setLoadingData(false);
        }
      }
    };

    loadData();

    // Cleanup on unmount
    return () => {
      isMounted.current = false;
      cancelSource.cancel('The request has been canceled');
    };
  }, [user, cancelSource]);

  // Copy voting address to clipboard
  const handleCopyAddress = (address) => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(''), 2000);
    }
  };

  // Toggle address expansion to show/hide details
  const handleToggleExpanded = (id) => {
    setExpandedAddresses(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle private key visibility
  const handleTogglePrivateKeyVisibility = (id) => {
    setVisiblePrivateKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle remove voting address
  const handleRemoveVotingAddress = async (addressId, addressName) => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: t('profile.information.confirm') || 'Are you sure?',
        text: `${t('profile.data.address.deleteConfirm') || 'Are you sure you want to delete'} "${addressName}"?`,
        showCancelButton: true,
        confirmButtonText: t('profile.information.delete') || 'Delete',
        confirmButtonColor: '#E74C3C',
        cancelButtonText: t('profile.information.cancel') || 'Cancel',
      });

      if (!result.isConfirmed) return;

      // Show loading
      Swal.fire({
        title: t('profile.data.address.deleting') || 'Deleting voting address',
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      // Call API to delete
      await destroyVotingAddress(addressId);

      // Show success message
      await Swal.fire({
        icon: 'success',
        title: t('profile.data.address.deletedSuccess') || 'Voting address deleted successfully',
        showConfirmButton: false,
        timer: 1800,
      });

      // Reload voting addresses
      await reloadVotingAddresses();
    } catch (error) {
      console.error('Error deleting voting address:', error);
      Swal.fire({
        icon: 'error',
        title: t('common.error') || 'Error',
        text: error.response?.data?.message || error.message || t('profile.data.address.deleteError') || 'Failed to delete voting address',
      });
    }
  };

  // Send email verification
  const handleSendVerificationEmail = async () => {
    try {
      setSendingVerification(true);

      // Check if Firebase Auth user exists
      if (!firebase.auth.currentUser) {
        throw new Error('No authenticated user found. Please log out and log back in.');
      }

      await firebase.generateLinkVerification();
      alert(`Verification email sent to ${email}`);

      // Optional: You might want to refresh the user info after sending
      // to check if emailVerified status has changed
    } catch (error) {
      console.error('Error sending verification email:', error);

      // Show specific error message
      const errorMessage = error.message || 'Failed to send verification email. Please try again.';
      alert(errorMessage);
    } finally {
      setSendingVerification(false);
    }
  };

  if (loadingData) {
    return (
      <div className="profile-information">
        <div className="profile-information__header">
          <h2 className="profile-information__title">{t('profile.information.loading')}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-information">
      <div className="profile-information__header">
        <h2 className="profile-information__title">{t('profile.information.title')}</h2>
        <p className="profile-information__description">{t('profile.information.description')}</p>
      </div>

      <div className="profile-information__form">
        {/* Email Field (Readonly) */}
        <div className="profile-information__form-group">
          <label htmlFor="email" className="profile-information__label">
            {t('profile.information.emailLabel')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            className="profile-information__input"
            placeholder={t('profile.information.emailPlaceholder')}
            readOnly
            disabled
          />
          <p className="profile-information__helper-text">{t('profile.information.emailHelper')}</p>

          {/* Email Verification Warning */}
          {!emailVerified && (
            <div className="profile-information__verification-warning">
              <span className="profile-information__verification-text">
                Email is not verified.
              </span>
              <button
                type="button"
                className="profile-information__verification-button"
                onClick={handleSendVerificationEmail}
                disabled={sendingVerification}
              >
                {sendingVerification ? 'Sending...' : 'Verify now'}
              </button>
            </div>
          )}
        </div>

        {/* Voting Address Section */}
        <div className="profile-information__voting-address">
          <div className="profile-information__voting-header">
            <h3 className="profile-information__voting-title">
              {t('profile.data.address.heading') || 'My voting address'}
            </h3>
            <CTAButton
              background="gold"
              iconColor="black"
              iconBackground="white"
              onClick={onAddVotingAddress}
            >
              {t('profile.data.address.addAddress') || 'Add voting address'}
            </CTAButton>
          </div>

          {/* Voting Address List */}
          {votingAddresses.length === 0 ? (
            <p className="profile-information__no-address">
              {t('profile.data.address.noAddress') || "You don't have a voting address, please add one."}
            </p>
          ) : (
            <div className="profile-information__address-list">
              {votingAddresses.map((addressItem, index) => {
                const addressId = addressItem._id || addressItem.uid || index;
                const isExpanded = expandedAddresses[addressId];
                const isPrivateKeyVisible = visiblePrivateKeys[addressId];

                return (
                  <div key={addressId} className={`profile-information__address-item ${isExpanded ? 'expanded' : ''}`}>
                    {/* Toggle Button (Top Right) */}
                    <button
                      type="button"
                      onClick={() => handleToggleExpanded(addressId)}
                      className="profile-information__toggle-button"
                      title={isExpanded ? 'Hide details' : 'Show details'}
                      aria-label={isExpanded ? 'Hide details' : 'Show details'}
                    />

                    {/* Main Address Header */}
                    <div className="profile-information__address-header">
                      <div className="profile-information__address-info">
                        <span className="profile-information__address-label">{addressItem.name || `Address ${index + 1}`}</span>
                        <span className="profile-information__address-text" title={addressItem.address}>{addressItem.address}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="profile-information__address-actions">
                      <button
                        type="button"
                        onClick={() => onEditVotingAddress(addressItem)}
                        className="profile-information__edit-button"
                        title={t('profile.information.edit') || 'Edit'}
                        aria-label={t('profile.information.edit') || 'Edit'}
                      >
                        {t('profile.information.edit') || 'Edit'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyAddress(addressItem.address)}
                        className="profile-information__copy-button"
                        title={copiedAddress === addressItem.address ? t('profile.information.copied') : t('profile.information.copy')}
                        aria-label={t('profile.information.copy') || 'Copy'}
                      >
                        {copiedAddress === addressItem.address ? t('profile.information.copied') : t('profile.information.copy')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveVotingAddress(addressId, addressItem.name || `Address ${index + 1}`)}
                        className="profile-information__remove-button"
                        title={t('profile.information.delete') || 'Remove'}
                        aria-label={t('profile.information.delete') || 'Remove'}
                      >
                        {t('profile.information.delete') || 'Remove'}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="profile-information__address-details">
                        {/* TxId Field */}
                        <div className="profile-information__detail-group">
                          <label className="profile-information__detail-label">
                            {t('profile.data.address.txId') || 'Tx ID'}
                          </label>
                          <div className="profile-information__detail-input-wrapper">
                            <input
                              type="text"
                              value={addressItem.txId || ''}
                              readOnly
                              className="profile-information__detail-input"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (addressItem.txId) {
                                  navigator.clipboard.writeText(addressItem.txId);
                                  setCopiedAddress(addressItem.txId);
                                  setTimeout(() => setCopiedAddress(''), 2000);
                                }
                              }}
                              className="profile-information__detail-copy-btn"
                            >
                              {copiedAddress === addressItem.txId ? '✓' : '📋'}
                            </button>
                          </div>
                        </div>

                        {/* Private Key Field */}
                        <div className="profile-information__detail-group">
                          <label className="profile-information__detail-label">
                            {t('profile.data.address.wifPrivateKey') || t('profile.data.address.descriptorWallet') || 'Private Key'}
                          </label>
                          <div className="profile-information__detail-input-wrapper">
                            <input
                              type={isPrivateKeyVisible ? 'text' : 'password'}
                              value={addressItem.privateKey || ''}
                              readOnly
                              className="profile-information__detail-input"
                            />
                            <button
                              type="button"
                              onClick={() => handleTogglePrivateKeyVisibility(addressId)}
                              className="profile-information__detail-toggle-btn"
                              title={isPrivateKeyVisible ? 'Hide private key' : 'Show private key'}
                            >
                              {isPrivateKeyVisible ? '🙈' : '👁'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (addressItem.privateKey) {
                                  navigator.clipboard.writeText(addressItem.privateKey);
                                  setCopiedAddress(addressItem.privateKey);
                                  setTimeout(() => setCopiedAddress(''), 2000);
                                }
                              }}
                              className="profile-information__detail-copy-btn"
                            >
                              {copiedAddress === addressItem.privateKey ? '✓' : '📋'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ProfileInformation.propTypes = {
  onAddVotingAddress: PropTypes.func.isRequired,
  onEditVotingAddress: PropTypes.func.isRequired,
};

export default ProfileInformation;
