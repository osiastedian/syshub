import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/user-context';
import { get2faInfoUser } from '../../utils/request';
import './ProfileSidebar.scss';

/**
 * ProfileSidebar Component
 *
 * Responsive sidebar navigation for Profile page.
 * Desktop: Full sidebar with icons and labels
 * Mobile: Floating sidebar with icons only
 *
 * @component
 * @subcategory Profile
 *
 * @param {Object} props - Component props
 * @param {string} props.activeSection - Currently active section identifier
 * @param {function} props.onSectionChange - Callback when section changes
 *
 * @example
 * <ProfileSidebar
 *   activeSection="information"
 *   onSectionChange={(section) => setActiveSection(section)}
 * />
 */
function ProfileSidebar({ activeSection, onSectionChange }) {
  const { t } = useTranslation();
  const { user } = useUser();

  // Check if user has 2FA enabled
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Fetch 2FA status from backend
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
      } catch (error) {
        console.error('Error loading 2FA status:', error);
        setTwoFactorEnabled(false);
      }
    };

    if (user?.data?.uid) {
      load2FAStatus();
    }
  }, [user?.data?.uid]);

  const sections = [
    {
      id: 'information',
      labelKey: 'profile.sidebar.information',
      icon: 'user',
    },
    {
      id: 'password',
      labelKey: 'profile.sidebar.password',
      icon: 'lock',
    },
    {
      id: 'twoFactor',
      labelKey: 'profile.sidebar.twoFactor',
      icon: 'shield',
    },
    {
      id: 'closeAccount',
      labelKey: 'profile.sidebar.closeAccount',
      icon: 'trash',
    },
  ];

  const handleSectionClick = (sectionId) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  const handleKeyPress = (e, sectionId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSectionClick(sectionId);
    }
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'user':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        );
      case 'lock':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="3"
              y="11"
              width="18"
              height="11"
              rx="2"
              ry="2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        );
      case 'shield':
        return (
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
      case 'trash':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 6H5H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="profile-sidebar">
      <h2 className="profile-sidebar__title">{t('profile.sidebar.title')}</h2>

      <nav className="profile-sidebar__nav" role="navigation" aria-label="Profile navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`profile-sidebar__item ${
              activeSection === section.id ? 'profile-sidebar__item--active' : ''
            }`}
            onClick={() => handleSectionClick(section.id)}
            onKeyPress={(e) => handleKeyPress(e, section.id)}
            type="button"
            role="button"
            aria-current={activeSection === section.id ? 'page' : undefined}
            aria-label={t(section.labelKey)}
          >
            <div className="profile-sidebar__icon-circle">
              <div className="profile-sidebar__icon">{renderIcon(section.icon)}</div>
            </div>
            <span className="profile-sidebar__label">{t(section.labelKey)}</span>
            {section.id === 'twoFactor' && (
              <span
                className={`profile-sidebar__status-pill ${
                  twoFactorEnabled
                    ? 'profile-sidebar__status-pill--enabled'
                    : 'profile-sidebar__status-pill--disabled'
                }`}
              >
                {twoFactorEnabled ? 'ON' : 'OFF'}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}

ProfileSidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired,
};

export default ProfileSidebar;
