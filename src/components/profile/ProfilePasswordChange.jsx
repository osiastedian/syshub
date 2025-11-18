import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user-context';
import './ProfilePasswordChange.scss';

/**
 * ProfilePasswordChange Component
 *
 * Password change form with strength indicator and validation.
 * Includes show/hide password toggles and real-time validation.
 *
 * @component
 * @subcategory Profile
 *
 * @example
 * <ProfilePasswordChange />
 */
function ProfilePasswordChange() {
  const { t } = useTranslation();
  const { changePassword } = useUser();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) return null;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'fair';
    return 'strong';
  };

  const passwordStrength = calculatePasswordStrength(formData.newPassword);

  // Check password requirements
  const passwordRequirements = {
    length: formData.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(formData.newPassword),
    lowercase: /[a-z]/.test(formData.newPassword),
    number: /[0-9]/.test(formData.newPassword),
    special: /[^A-Za-z0-9]/.test(formData.newPassword),
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

    // Clear success message
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = t('profile.passwordChange.errors.currentRequired');
    }

    if (!formData.newPassword) {
      newErrors.newPassword = t('profile.passwordChange.errors.newRequired');
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = t('profile.passwordChange.errors.tooShort');
    } else if (!Object.values(passwordRequirements).every(Boolean)) {
      newErrors.newPassword = t('profile.passwordChange.errors.requirementsNotMet');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('profile.passwordChange.errors.confirmRequired');
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = t('profile.passwordChange.errors.passwordsDoNotMatch');
    }

    if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = t('profile.passwordChange.errors.sameAsOld');
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

      // Update password using changePassword from user context
      await changePassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setSuccessMessage(t('profile.passwordChange.success'));

      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error changing password:', error);

      let errorMessage = t('profile.passwordChange.errors.updateFailed');

      if (error.code === 'auth/wrong-password') {
        errorMessage = t('profile.passwordChange.errors.wrongPassword');
        setErrors({ currentPassword: errorMessage });
      } else {
        setErrors({ submit: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  // Render eye icon
  const renderEyeIcon = (isVisible) => {
    if (isVisible) {
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.6819 3.96914 7.65661 6.06 6.06M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div className="profile-password-change">
      <div className="profile-password-change__header">
        <h2 className="profile-password-change__title">{t('profile.passwordChange.title')}</h2>
        <p className="profile-password-change__description">{t('profile.passwordChange.description')}</p>
      </div>

      <form className="profile-password-change__form" onSubmit={handleSubmit}>
        {/* Current Password */}
        <div className="profile-password-change__form-group">
          <label htmlFor="currentPassword" className="profile-password-change__label profile-password-change__label--required">
            {t('profile.passwordChange.currentPasswordLabel')}
          </label>
          <div className="profile-password-change__input-wrapper">
            <input
              type={showPassword.current ? 'text' : 'password'}
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className={`profile-password-change__input ${errors.currentPassword ? 'profile-password-change__input--error' : ''}`}
              placeholder={t('profile.passwordChange.currentPasswordPlaceholder')}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="profile-password-change__toggle-visibility"
              aria-label={showPassword.current ? 'Hide password' : 'Show password'}
            >
              {renderEyeIcon(showPassword.current)}
            </button>
          </div>
          {errors.currentPassword && <p className="profile-password-change__error-text">{errors.currentPassword}</p>}
        </div>

        {/* New Password */}
        <div className="profile-password-change__form-group">
          <label htmlFor="newPassword" className="profile-password-change__label profile-password-change__label--required">
            {t('profile.passwordChange.newPasswordLabel')}
          </label>
          <div className="profile-password-change__input-wrapper">
            <input
              type={showPassword.new ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`profile-password-change__input ${errors.newPassword ? 'profile-password-change__input--error' : ''}`}
              placeholder={t('profile.passwordChange.newPasswordPlaceholder')}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="profile-password-change__toggle-visibility"
              aria-label={showPassword.new ? 'Hide password' : 'Show password'}
            >
              {renderEyeIcon(showPassword.new)}
            </button>
          </div>
          {errors.newPassword && <p className="profile-password-change__error-text">{errors.newPassword}</p>}

          {/* Password Strength Indicator */}
          {formData.newPassword && (
            <div className="profile-password-change__strength-indicator">
              <div className="profile-password-change__strength-bar">
                <div className={`profile-password-change__strength-fill profile-password-change__strength-fill--${passwordStrength}`} />
              </div>
              <p className={`profile-password-change__strength-text profile-password-change__strength-text--${passwordStrength}`}>
                {t(`profile.passwordChange.strength.${passwordStrength}`)}
              </p>
            </div>
          )}

          {/* Password Requirements */}
          <div className="profile-password-change__requirements">
            <p className="profile-password-change__requirements-title">{t('profile.passwordChange.requirementsTitle')}</p>
            <ul className="profile-password-change__requirements-list">
              <li className={`profile-password-change__requirement-item ${passwordRequirements.length ? 'profile-password-change__requirement-item--met' : ''}`}>
                {t('profile.passwordChange.requirements.length')}
              </li>
              <li className={`profile-password-change__requirement-item ${passwordRequirements.uppercase ? 'profile-password-change__requirement-item--met' : ''}`}>
                {t('profile.passwordChange.requirements.uppercase')}
              </li>
              <li className={`profile-password-change__requirement-item ${passwordRequirements.lowercase ? 'profile-password-change__requirement-item--met' : ''}`}>
                {t('profile.passwordChange.requirements.lowercase')}
              </li>
              <li className={`profile-password-change__requirement-item ${passwordRequirements.number ? 'profile-password-change__requirement-item--met' : ''}`}>
                {t('profile.passwordChange.requirements.number')}
              </li>
              <li className={`profile-password-change__requirement-item ${passwordRequirements.special ? 'profile-password-change__requirement-item--met' : ''}`}>
                {t('profile.passwordChange.requirements.special')}
              </li>
            </ul>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="profile-password-change__form-group">
          <label htmlFor="confirmPassword" className="profile-password-change__label profile-password-change__label--required">
            {t('profile.passwordChange.confirmPasswordLabel')}
          </label>
          <div className="profile-password-change__input-wrapper">
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`profile-password-change__input ${errors.confirmPassword ? 'profile-password-change__input--error' : ''}`}
              placeholder={t('profile.passwordChange.confirmPasswordPlaceholder')}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="profile-password-change__toggle-visibility"
              aria-label={showPassword.confirm ? 'Hide password' : 'Show password'}
            >
              {renderEyeIcon(showPassword.confirm)}
            </button>
          </div>
          {errors.confirmPassword && <p className="profile-password-change__error-text">{errors.confirmPassword}</p>}
        </div>

        {/* Success Message */}
        {successMessage && <p className="profile-password-change__success-text">{successMessage}</p>}

        {/* Submit Error */}
        {errors.submit && <p className="profile-password-change__error-text">{errors.submit}</p>}

        {/* Actions */}
        <div className="profile-password-change__actions">
          <button
            type="submit"
            className="profile-password-change__button profile-password-change__button--primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="profile-password-change__loading" />
                {t('profile.passwordChange.changing')}
              </>
            ) : (
              t('profile.passwordChange.change')
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

ProfilePasswordChange.propTypes = {};

export default ProfilePasswordChange;
