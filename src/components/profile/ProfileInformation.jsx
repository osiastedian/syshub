import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useUser } from '../../context/user-context';
import { getUserInfo, getUserVotingAddress, destroyVotingAddress, updateVotingAddress } from '../../utils/request';
import CTAButton from '../global/CTAButton';
import VotingAddressItem from './VotingAddressItem';
import './ProfileInformation.scss';

/**
 * ProfileInformation Component
 *
 * Displays user email (readonly) and voting addresses list with inline editing.
 *
 * @component
 * @subcategory Profile
 *
 * @param {function} onAddVotingAddress - Callback to open add voting address form
 *
 * @example
 * <ProfileInformation onAddVotingAddress={handleAdd} />
 */
function ProfileInformation({ onAddVotingAddress }) {
  const { t } = useTranslation();
  const { user, firebase } = useUser();

  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(true); // Default to true to avoid showing banner during load
  const [votingAddresses, setVotingAddresses] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [sendingVerification, setSendingVerification] = useState(false);
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

  // Helper function to map API error responses to user-friendly messages
  const getErrorMessage = (error) => {
    // Check if it's a network error
    if (!error.response) {
      return t('profile.data.address.errors.network_error') || 'Unable to connect to server. Please check your connection and try again.';
    }

    const status = error.response.status;
    const apiMessage = error.response?.data?.message;

    // Map status codes to specific error messages
    switch (status) {
      case 400:
        // Bad request - likely validation error
        if (apiMessage && apiMessage.toLowerCase().includes('invalid')) {
          return t('profile.data.address.errors.invalid_data') || 'Invalid data. Please check the voting address details and try again.';
        }
        return apiMessage || t('profile.data.address.errors.invalid_data') || 'Invalid data. Please check your input and try again.';

      case 406:
        // Not acceptable - validation failed
        return t('profile.data.address.errors.validation_failed') || 'Invalid voting address data. Please verify all fields are correct.';

      case 409:
        // Conflict - duplicate address
        return t('profile.data.address.errors.address_exists') || 'This voting address already exists. Please use a different address.';

      case 422:
        // Unprocessable entity - validation error
        return t('profile.data.address.errors.invalid_format') || 'Invalid address format. Please check your voting address and transaction ID.';

      case 500:
      case 502:
      case 503:
        // Server errors
        return t('profile.data.address.errors.server_error') || 'Server error. Please try again later.';

      default:
        // Use API message if available, otherwise use generic error
        return apiMessage || t('profile.data.address.updateError') || 'Failed to update voting address. Please try again.';
    }
  };

  // Handle edit voting address
  const handleEditVotingAddress = async (addressId, data) => {
    try {
      Swal.fire({
        title: t('profile.data.address.updating') || 'Updating voting address',
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      await updateVotingAddress(addressId, data);

      await Swal.fire({
        icon: 'success',
        title: t('profile.data.address.updatedSuccess') || 'Voting address updated successfully',
        showConfirmButton: false,
        timer: 800,
      });

      await reloadVotingAddresses();
    } catch (error) {
      console.error('Error updating voting address:', error);
      const errorMessage = getErrorMessage(error);

      Swal.fire({
        icon: 'error',
        title: t('profile.data.address.errors.update_failed_title') || 'Update Failed',
        text: errorMessage,
      });
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
      const errorMessage = getErrorMessage(error);

      Swal.fire({
        icon: 'error',
        title: t('profile.data.address.errors.delete_failed_title') || 'Delete Failed',
        text: errorMessage,
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
              {votingAddresses.map((addressItem, index) => (
                <VotingAddressItem
                  key={addressItem._id || addressItem.uid || index}
                  address={addressItem}
                  index={index}
                  onEdit={handleEditVotingAddress}
                  onRemove={(id) => handleRemoveVotingAddress(id, addressItem.name || `Address ${index + 1}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ProfileInformation.propTypes = {
  onAddVotingAddress: PropTypes.func.isRequired,
};

export default ProfileInformation;
