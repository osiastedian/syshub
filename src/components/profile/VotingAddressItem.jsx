import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

/**
 * VotingAddressItem Component
 *
 * Displays a single voting address with inline editing and management capabilities.
 * Supports view and edit modes with toggle functionality.
 *
 * @component
 * @subcategory Profile
 *
 * @param {Object} address - The voting address object
 * @param {number} index - Index of the address in the list
 * @param {function} onEdit - Callback when saving edited address
 * @param {function} onRemove - Callback when removing address
 *
 * @example
 * <VotingAddressItem
 *   address={addressData}
 *   index={0}
 *   onEdit={(id, data) => handleEdit(id, data)}
 *   onRemove={(id) => handleRemove(id)}
 * />
 */
function VotingAddressItem({ address, index, onEdit, onRemove }) {
  const { t } = useTranslation();

  // Local state
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  // Form state for editing
  const [formData, setFormData] = useState({
    name: address.name || '',
    address: address.address || '',
    txId: address.txId || '',
    privateKey: address.privateKey || '',
  });

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    address: '',
    txId: '',
    privateKey: '',
  });

  const addressId = address._id || address.uid || index;

  // Validation helper functions
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value || value.trim() === '') {
          return t('profile.data.address.errors.required_field') || 'This field is required';
        }
        return '';

      case 'address':
        if (!value || value.trim() === '') {
          return t('profile.data.address.errors.required_field') || 'This field is required';
        }
        // Basic address format validation (starts with 't' or 'sys')
        if (!value.match(/^(t|sys)[a-zA-Z0-9]{20,}$/)) {
          return t('profile.data.address.errors.invalid_address') || 'Please enter a valid voting address (starts with t or sys)';
        }
        return '';

      case 'txId':
        if (!value || value.trim() === '') {
          return t('profile.data.address.errors.required_field') || 'This field is required';
        }
        // TxId must end with -0 or -1
        if (!value.match(/-(0|1)$/)) {
          return t('profile.data.address.errors.invalid_txid') || 'Tx ID must end with -0 or -1';
        }
        return '';

      case 'privateKey':
        if (!value || value.trim() === '') {
          return t('profile.data.address.errors.required_field') || 'This field is required';
        }
        // Skip validation for encrypted keys (they start with "U2FsdGVkX1")
        if (value.startsWith('U2FsdGVkX1')) {
          return '';
        }
        // Basic validation - should be a reasonable length
        if (value.length < 20) {
          return t('profile.data.address.errors.invalid_privatekey') || 'Private key appears to be invalid';
        }
        return '';

      default:
        return '';
    }
  };

  // Validate all fields
  const validateForm = () => {
    const errors = {
      name: validateField('name', formData.name),
      address: validateField('address', formData.address),
      txId: validateField('txId', formData.txId),
      privateKey: validateField('privateKey', formData.privateKey),
    };

    setValidationErrors(errors);

    // Return true if no errors
    return !Object.values(errors).some((error) => error !== '');
  };

  // Toggle expanded/collapsed state
  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggle private key visibility
  const handleTogglePrivateKeyVisibility = () => {
    setIsPrivateKeyVisible(!isPrivateKeyVisible);
  };

  // Copy text to clipboard
  const handleCopy = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000);
    }
  };

  // Handle edit mode toggle
  const handleEdit = () => {
    setIsEditing(true);
    setIsExpanded(true);
    // Reset form data to current address values
    setFormData({
      name: address.name || '',
      address: address.address || '',
      txId: address.txId || '',
      privateKey: address.privateKey || '',
    });
    // Clear validation errors
    setValidationErrors({
      name: '',
      address: '',
      txId: '',
      privateKey: '',
    });
  };

  // Handle cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
    setFormData({
      name: address.name || '',
      address: address.address || '',
      txId: address.txId || '',
      privateKey: address.privateKey || '',
    });
    // Clear validation errors
    setValidationErrors({
      name: '',
      address: '',
      txId: '',
      privateKey: '',
    });
  };

  // Handle save edited address
  const handleSave = () => {
    // Validate form before saving
    if (!validateForm()) {
      return; // Don't save if validation fails
    }

    // Call parent onEdit handler (don't await - parent handles async operations)
    onEdit(addressId, formData);
    // Exit edit mode immediately for responsive UI
    setIsEditing(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle field blur - validate the field
  const handleFieldBlur = (fieldName) => {
    const error = validateField(fieldName, formData[fieldName]);
    setValidationErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  // Handle remove address
  const handleRemove = () => {
    onRemove(addressId);
  };

  return (
    <div className={`profile-information__address-item ${isExpanded ? 'expanded' : ''}`}>
      {/* Toggle Button (Top Right) */}
      <button
        type="button"
        onClick={handleToggleExpanded}
        className="profile-information__toggle-button"
        title={isExpanded ? 'Hide details' : 'Show details'}
        aria-label={isExpanded ? 'Hide details' : 'Show details'}
      />

      {/* Main Address Header */}
      <div className="profile-information__address-header">
        <div className="profile-information__address-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('name')}
                className={`profile-information__address-label-input ${validationErrors.name ? 'error' : ''}`}
                placeholder={t('profile.data.address.label') || 'Label'}
              />
              {validationErrors.name && (
                <span className="profile-information__field-error">{validationErrors.name}</span>
              )}
            </>
          ) : (
            <span className="profile-information__address-label">
              {address.name || `Address ${index + 1}`}
            </span>
          )}
          {isEditing ? (
            <>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('address')}
                className={`profile-information__address-text-input ${validationErrors.address ? 'error' : ''}`}
                placeholder={t('profile.data.address.votingAddress') || 'Voting address'}
              />
              {validationErrors.address && (
                <span className="profile-information__field-error">{validationErrors.address}</span>
              )}
            </>
          ) : (
            <span className="profile-information__address-text" title={address.address}>
              {address.address}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="profile-information__address-actions">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="profile-information__copy-button"
              title={t('profile.data.address.save') || 'Save'}
              aria-label={t('profile.data.address.save') || 'Save'}
              disabled={Object.values(validationErrors).some((error) => error !== '')}
            >
              {t('profile.data.address.save') || 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="profile-information__edit-button"
              title={t('profile.data.address.cancel') || 'Cancel'}
              aria-label={t('profile.data.address.cancel') || 'Cancel'}
            >
              {t('profile.data.address.cancel') || 'Cancel'}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleEdit}
              className="profile-information__edit-button"
              title={t('profile.information.edit') || 'Edit'}
              aria-label={t('profile.information.edit') || 'Edit'}
            >
              {t('profile.information.edit') || 'Edit'}
            </button>
            <button
              type="button"
              onClick={() => handleCopy(address.address)}
              className="profile-information__copy-button"
              title={copiedText === address.address ? t('profile.information.copied') : t('profile.information.copy')}
              aria-label={t('profile.information.copy') || 'Copy'}
            >
              {copiedText === address.address ? t('profile.information.copied') : t('profile.information.copy')}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="profile-information__remove-button"
              title={t('profile.information.delete') || 'Remove'}
              aria-label={t('profile.information.delete') || 'Remove'}
            >
              {t('profile.information.delete') || 'Remove'}
            </button>
          </>
        )}
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
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="txId"
                    value={formData.txId}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('txId')}
                    className={`profile-information__detail-input ${validationErrors.txId ? 'error' : ''}`}
                    placeholder={t('profile.data.address.txId') || 'Tx ID'}
                  />
                  {validationErrors.txId && (
                    <span className="profile-information__field-error">{validationErrors.txId}</span>
                  )}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={address.txId || ''}
                    readOnly
                    className="profile-information__detail-input"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy(address.txId)}
                    className="profile-information__detail-copy-btn"
                  >
                    {copiedText === address.txId ? '✓' : '📋'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Private Key Field */}
          <div className="profile-information__detail-group">
            <label className="profile-information__detail-label">
              {t('profile.data.address.wifPrivateKey') || t('profile.data.address.descriptorWallet') || 'Private Key'}
            </label>
            <div className="profile-information__detail-input-wrapper">
              {isEditing ? (
                <>
                  <input
                    type={isPrivateKeyVisible ? 'text' : 'password'}
                    name="privateKey"
                    value={formData.privateKey}
                    onChange={handleInputChange}
                    onBlur={() => handleFieldBlur('privateKey')}
                    className={`profile-information__detail-input ${validationErrors.privateKey ? 'error' : ''}`}
                    placeholder={t('profile.data.address.wifPrivateKey') || 'Private Key'}
                  />
                  {validationErrors.privateKey && (
                    <span className="profile-information__field-error">{validationErrors.privateKey}</span>
                  )}
                </>
              ) : (
                <input
                  type={isPrivateKeyVisible ? 'text' : 'password'}
                  value={address.privateKey || ''}
                  readOnly
                  className="profile-information__detail-input"
                />
              )}
              <button
                type="button"
                onClick={handleTogglePrivateKeyVisibility}
                className="profile-information__detail-toggle-btn"
                title={isPrivateKeyVisible ? (t('profile.data.address.hide') || 'Hide') : (t('profile.data.address.show') || 'Show')}
              >
                {isPrivateKeyVisible ? '🙈' : '👁'}
              </button>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => handleCopy(address.privateKey)}
                  className="profile-information__detail-copy-btn"
                >
                  {copiedText === address.privateKey ? '✓' : '📋'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

VotingAddressItem.propTypes = {
  address: PropTypes.shape({
    _id: PropTypes.string,
    uid: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    txId: PropTypes.string,
    privateKey: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default VotingAddressItem;
