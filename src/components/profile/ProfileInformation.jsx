import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user-context';
import { getUserInfo, updateUser } from '../../utils/request';
import './ProfileInformation.scss';

/**
 * ProfileInformation Component
 *
 * Displays and allows editing of user email and voting address.
 * Includes form validation and success/error handling.
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

  const [formData, setFormData] = useState({
    email: '',
    votingAddress: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    votingAddress: '',
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Load user information on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoadingData(true);
        const response = await getUserInfo(user.data.uid);
        if (response.data && response.data.user) {
          setFormData({
            email: response.data.user.email || user.data.email || '',
            votingAddress: response.data.user.votingAddress || '',
          });
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

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate voting address (basic Syscoin address validation)
  const validateVotingAddress = (address) => {
    if (!address) return true; // Optional field
    // Basic validation: starts with 's' or 'S', length between 26-35 characters
    const addressRegex = /^[sS][a-zA-Z0-9]{25,34}$/;
    return addressRegex.test(address);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = t('profile.information.errors.emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('profile.information.errors.emailInvalid');
    }

    if (formData.votingAddress && !validateVotingAddress(formData.votingAddress)) {
      newErrors.votingAddress = t('profile.information.errors.votingAddressInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setSuccessMessage('');

      await updateUser(user.data.uid, {
        email: formData.email,
        votingAddress: formData.votingAddress,
      });

      setSuccessMessage(t('profile.information.success'));
    } catch (error) {
      console.error('Error updating user info:', error);
      setErrors({
        ...errors,
        submit: t('profile.information.errors.updateFailed'),
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      email: user.data.email || '',
      votingAddress: '',
    });
    setErrors({});
    setSuccessMessage('');
  };

  // Copy voting address to clipboard
  const handleCopyAddress = () => {
    if (formData.votingAddress) {
      navigator.clipboard.writeText(formData.votingAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
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

      <form className="profile-information__form" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="profile-information__form-group">
          <label htmlFor="email" className="profile-information__label profile-information__label--required">
            {t('profile.information.emailLabel')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`profile-information__input ${errors.email ? 'profile-information__input--error' : ''}`}
            placeholder={t('profile.information.emailPlaceholder')}
            disabled={loading}
          />
          {errors.email && <p className="profile-information__error-text">{errors.email}</p>}
          <p className="profile-information__helper-text">{t('profile.information.emailHelper')}</p>
        </div>

        {/* Voting Address Field */}
        <div className="profile-information__form-group">
          <label htmlFor="votingAddress" className="profile-information__label">
            {t('profile.information.votingAddressLabel')}
          </label>
          <input
            type="text"
            id="votingAddress"
            name="votingAddress"
            value={formData.votingAddress}
            onChange={handleInputChange}
            className={`profile-information__input ${
              errors.votingAddress ? 'profile-information__input--error' : ''
            }`}
            placeholder={t('profile.information.votingAddressPlaceholder')}
            disabled={loading}
          />
          {errors.votingAddress && <p className="profile-information__error-text">{errors.votingAddress}</p>}
          <p className="profile-information__helper-text">{t('profile.information.votingAddressHelper')}</p>

          {formData.votingAddress && (
            <div className="profile-information__address-display">
              <span className="profile-information__address-text">{formData.votingAddress}</span>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="profile-information__copy-button"
              >
                {copiedAddress ? t('profile.information.copied') : t('profile.information.copy')}
              </button>
            </div>
          )}
        </div>

        {/* Success Message */}
        {successMessage && <p className="profile-information__success-text">{successMessage}</p>}

        {/* Submit Error */}
        {errors.submit && <p className="profile-information__error-text">{errors.submit}</p>}

        {/* Actions */}
        <div className="profile-information__actions">
          <button type="submit" className="profile-information__button profile-information__button--primary" disabled={loading}>
            {loading ? (
              <>
                <span className="profile-information__loading" />
                {t('profile.information.saving')}
              </>
            ) : (
              t('profile.information.save')
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="profile-information__button profile-information__button--secondary"
            disabled={loading}
          >
            {t('profile.information.reset')}
          </button>
        </div>
      </form>
    </div>
  );
}

ProfileInformation.propTypes = {};

export default ProfileInformation;
