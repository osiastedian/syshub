import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/user-context';
import { getUserInfo } from '../../utils/request';
import './ProfileInformation.scss';

/**
 * ProfileInformation Component
 *
 * Displays user email (readonly) and voting addresses list.
 *
 * @component
 * @subcategory Profile
 *
 * @example
 * <ProfileInformation />
 */
function ProfileInformation() {
  const { t } = useTranslation();
  const { user } = useUser();

  const [email, setEmail] = useState('');
  const [votingAddresses, setVotingAddresses] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [copiedAddress, setCopiedAddress] = useState('');

  // Load user information on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoadingData(true);
        const response = await getUserInfo(user.data.uid);
        if (response.data && response.data.user) {
          setEmail(response.data.user.email || user.data.email || '');
          // Assuming voting addresses come as an array
          // Adjust based on actual API response structure
          setVotingAddresses(response.data.user.votingAddresses || []);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    if (user && user.data && user.data.uid) {
      loadUserData();
    }
  }, [user]);

  // Copy voting address to clipboard
  const handleCopyAddress = (address) => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(''), 2000);
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
        </div>

        {/* Voting Address Section */}
        <div className="profile-information__voting-address">
          <div className="profile-information__voting-header">
            <h3 className="profile-information__voting-title">
              {t('profile.data.address.heading') || 'My voting address'}
            </h3>
            <Link to="/profile/add-voting-address" className="profile-information__add-button">
              <span className="profile-information__add-icon">+</span>
              {t('profile.data.address.addAddress') || 'Add voting address'}
            </Link>
          </div>

          {/* Voting Address List */}
          {votingAddresses.length === 0 ? (
            <p className="profile-information__no-address">
              {t('profile.data.address.noAddress') || "You don't have a voting address, please add one."}
            </p>
          ) : (
            <div className="profile-information__address-list">
              {votingAddresses.map((addressItem, index) => (
                <div key={index} className="profile-information__address-item">
                  <div className="profile-information__address-info">
                    <span className="profile-information__address-label">{addressItem.name || `Address ${index + 1}`}</span>
                    <span className="profile-information__address-text">{addressItem.address}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyAddress(addressItem.address)}
                    className="profile-information__copy-button"
                  >
                    {copiedAddress === addressItem.address ? t('profile.information.copied') : t('profile.information.copy')}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ProfileInformation.propTypes = {};

export default ProfileInformation;
